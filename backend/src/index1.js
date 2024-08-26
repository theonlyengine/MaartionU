const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./auth/routes');
const blockchainRoutes = require('./blockchain/routes');
const learningRoutes = require('./learning/routes');
const feedbackRoutes = require('./routes/feedback');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
