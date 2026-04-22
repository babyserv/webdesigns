const express = require('express');
const Project = require('../models/Project');
const { requireAuth } = require('../middleware/auth');
const { buildBrandSummary } = require('../services/brandEngine');
const { buildSitemap, generateSiteFiles } = require('../services/siteGenerator');

const router = express.Router();

router.post('/generate', async (req, res) => {
  const input = req.body;
  const requiredFields = ['businessName', 'industry', 'description', 'targetAudience', 'coreOffer', 'usp', 'personality', 'emotionalGoal', 'contentProvided', 'budgetTier'];
  const missing = requiredFields.filter((field) => !input[field]);
  if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });

  const normalizedInput = {
    ...input,
    personality: Array.isArray(input.personality) ? input.personality : [input.personality],
    competitors: Array.isArray(input.competitors) ? input.competitors : [],
    features: Array.isArray(input.features) ? input.features : []
  };

  const brandSummary = buildBrandSummary(normalizedInput);
  const sitemap = buildSitemap(normalizedInput);
  const files = generateSiteFiles(normalizedInput, brandSummary);

  res.json({ brandSummary, sitemap, generatedSite: { files } });
});

router.post('/', requireAuth, async (req, res) => {
  const project = await Project.create({ ...req.body, client: req.user._id });
  res.status(201).json(project);
});

router.get('/me', requireAuth, async (req, res) => {
  const projects = await Project.find({ client: req.user._id }).sort({ updatedAt: -1 });
  res.json({
    user: { name: req.user.name, email: req.user.email },
    projects
  });
});

router.post('/:id/notes', requireAuth, async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, client: req.user._id });
  if (!project) return res.status(404).json({ message: 'Project not found.' });

  project.notes.push({ body: req.body.note, by: req.user.email });
  await project.save();
  res.json({ message: 'Note added.' });
});

module.exports = router;
