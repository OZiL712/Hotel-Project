import { Client, Databases, Storage, Permission, Role } from 'node-appwrite';
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
const storage = new Storage(client);
const DB_ID = 'hotel_db';

async function updatePermissions() {
  try {
    console.log('⏳ Updating permissions to allow public write access...');
    
    const permissions = [
      Permission.read(Role.any()),
      Permission.create(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ];

    await databases.updateCollection(DB_ID, 'hotel_settings', 'Hotel Settings', permissions);
    await databases.updateCollection(DB_ID, 'rooms', 'Rooms', permissions);
    await databases.updateCollection(DB_ID, 'bookings', 'Bookings', permissions);
    await storage.updateBucket('hotel-media', 'Hotel Media', permissions);

    console.log('✅ Permissions updated successfully!');
  } catch (error) {
    console.error('❌ Error updating permissions:', error);
  }
}

updatePermissions();
