const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

router.get('/projects', requireAuth, requireRole('admin'), async (_req, res) => {
  const projects = await Project.find().populate('client', 'email name').sort({ updatedAt: -1 });
  res.json({ projects });
});

router.patch('/projects/:id/status', requireAuth, requireRole('admin'), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

module.exports = router;
