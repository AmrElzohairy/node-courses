const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
const connectDB = require('./helpers/mongodb.connection');
const statusMessage = require('./utils/statusMessage');
const cors = require('cors');
const PORT = process.env.PORT || 4001;

dotenv.config();


// connect database
connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors())
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: statusMessage.ERROR,
    message: err.message || 'Internal Server Error'
  });
});
//invalid route handler
app.use((req, res) => {
  res.status(404).json({ status: statusMessage.FAIL, message: `Can't find ${req.originalUrl} on this server!` });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});