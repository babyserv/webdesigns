const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  businessName: { type: String, required: true },
  industry: { type: String, required: true },
  description: { type: String, required: true },
  targetAudience: { type: String, required: true },
  coreOffer: { type: String, required: true },
  usp: { type: String, required: true },
  personality: [{ type: String }],
  emotionalGoal: { type: String, required: true },
  colorPreferences: { type: String, default: '' },
  competitors: [{ type: String }],
  contentProvided: { type: String, enum: ['yes', 'no'], default: 'no' },
  features: [{ type: String }],
  budgetTier: { type: String, enum: ['basic', 'standard', 'premium'], required: true },
  status: { type: String, default: 'Intake Received' },
  notes: [{
    body: String,
    by: String,
    createdAt: { type: Date, default: Date.now }
  }],
  assets: [{
    originalName: String,
    path: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  generated: {
    brandSummary: mongoose.Schema.Types.Mixed,
    sitemap: mongoose.Schema.Types.Mixed,
    siteFiles: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
