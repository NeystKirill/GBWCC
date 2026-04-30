import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  console.log('Testing connection...');
  try {
    await mongoose.connect(process.env.DATABASE_URL, { serverSelectionTimeoutMS: 2000 });
    console.log('Success!');
    process.exit(0);
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  }
}
test();
