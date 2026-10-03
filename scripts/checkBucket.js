import { Client, Storage } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

async function checkBucket() {
  try {
    const bucket = await storage.getBucket('hotel-media');
    console.log('Bucket fileSecurity:', bucket.fileSecurity);
    console.log('Bucket permissions:', bucket.$permissions);
  } catch (err) {
    console.error(err);
  }
}
checkBucket();
