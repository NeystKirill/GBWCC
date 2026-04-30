import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log('Connecting to:', process.env.DATABASE_URL?.substring(0, 20) + '...');
mongoose.connect(process.env.DATABASE_URL)
  .then(() => { console.log('Connected!'); process.exit(0); })
  .catch(err => { console.error('Error:', err); process.exit(1); });
setTimeout(() => { console.error('Timeout!'); process.exit(1); }, 15000);
