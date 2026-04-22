const express = require('express');
const path = require('path');
const { requireAuth } = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

router.post('/:projectId', requireAuth, async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, client: req.user._id });
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  if (!req.files || !req.files.asset) return res.status(400).json({ message: 'No file uploaded.' });

  const asset = req.files.asset;
  const saveName = `${Date.now()}-${asset.name.replace(/\s+/g, '_')}`;
  const savePath = path.join(__dirname, '..', 'uploads', saveName);
  await asset.mv(savePath);

  project.assets.push({ originalName: asset.name, path: `backend/uploads/${saveName}` });
  await project.save();

  res.json({ message: 'Uploaded', file: saveName });
});

module.exports = router;
