import { Client, Databases } from 'node-appwrite';
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

const databases = new Databases(client);

async function fixRooms() {
  try {
    console.log('⏳ Creating missing is_available attribute...');
    await databases.createBooleanAttribute('hotel_db', 'rooms', 'is_available', false, true);
    console.log('✅ is_available attribute created successfully!');
  } catch (error) {
    if (error.code === 409) console.log('ℹ️ Attribute already exists.');
    else console.error('❌ Error:', error);
  }
}

fixRooms();
