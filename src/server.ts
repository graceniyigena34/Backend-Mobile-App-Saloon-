import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './App';

dotenv.config();

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
