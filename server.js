const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
dotenv.config();
connectDB();

const app = express();
//app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 7080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database connected`);
});
