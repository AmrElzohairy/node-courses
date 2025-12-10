const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables FIRST
dotenv.config();

const app = express();
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
const connectDB = require('./helpers/mongodb.connection');
const statusMessage = require('./utils/statusMessage');
const cors = require('cors');

// Now read PORT after dotenv is configured
const PORT = process.env.PORT || 4001;

// connect database
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: statusMessage.ERROR,
    message: err.message || 'Internal Server Error'
  });
});

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({ 
    status: statusMessage.FAIL, 
    message: `Can't find ${req.originalUrl} on this server!` 
  });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});