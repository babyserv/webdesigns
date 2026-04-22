require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const paymentRoutes = require('./routes/payments');
const uploadRoutes = require('./routes/uploads');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(fileUpload());
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/styles', express.static(path.join(__dirname, '..', 'styles')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'scripts')));
app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`)))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
