const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending' },
  createdAt: { type: String, default: () => new Date().toISOString() },
  completedAt: { type: String, default: null }
}, { _id: false });

const CompanySchema = new mongoose.Schema({
  id: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, default: '' },
  packageCtc: { type: String, default: '' },
  driveDate: { type: String, default: '' },
  stage: { type: String, default: 'Wishlist' },
  notes: { type: String, default: '' }
}, { _id: false });

const PracticeItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: 'quiz' },
  category: { type: String, default: 'dsa' },
  score: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  date: { type: String, default: () => new Date().toISOString() }
}, { _id: false });

const CareerDataSchema = new mongoose.Schema({
  studentId: { type: String, default: 'default_student', unique: true, index: true },
  profile: {
    name: { type: String, default: '' },
    college: { type: String, default: '' },
    degree: { type: String, default: '' },
    branch: { type: String, default: '' },
    year: { type: String, default: '' },
    cgpa: { type: String, default: '' },
    targetRole: { type: String, default: '' },
    targetCompanies: { type: String, default: '' },
    timeline: { type: String, default: '' }
  },
  theme: { type: String, default: 'midnight' },
  bgStyle: { type: String, default: 'aurora' },
  tasks: [TaskSchema],
  companies: [CompanySchema],
  knownFlashcards: { type: mongoose.Schema.Types.Mixed, default: {} },
  atsChecked: { type: Boolean, default: false },
  stats: {
    longestStreak: { type: Number, default: 0 }
  },
  achievements: { type: mongoose.Schema.Types.Mixed, default: {} },
  history: { type: mongoose.Schema.Types.Mixed, default: {} },
  checkinDates: [{ type: String }],
  practiceHistory: [PracticeItemSchema],
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  minimize: false
});

module.exports = mongoose.model('CareerData', CareerDataSchema);
