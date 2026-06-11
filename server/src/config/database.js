import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  await mongoose.connect(uri);
  console.log('✔ MongoDB connected:', uri.replace(/\/\/.*@/, '//***@'));
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
