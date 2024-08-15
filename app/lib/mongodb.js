import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    cachedClient = await mongoose.connect(uri);
  }

  cachedDb = cachedClient;
  return cachedDb;
}
