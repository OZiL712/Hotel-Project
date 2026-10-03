import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';
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

async function setupAppwrite() {
  try {
    console.log('⏳ Starting Appwrite Setup...');

    // 1. Create Database
    console.log('📦 Creating Database...');
    try {
      await databases.create(DB_ID, 'Hotel Database');
      console.log('✅ Database created.');
    } catch (err) {
      if (err.code === 409) console.log('ℹ️ Database already exists.');
      else if (err.code === 403) console.log('ℹ️ Database limit reached, assuming database already exists.');
      else throw err;
    }

    // 2. Create Storage Bucket 'hotel-media'
    console.log('📂 Creating Storage Bucket...');
    try {
      await storage.createBucket('hotel-media', 'Hotel Media', [
        Permission.read(Role.any()), // Public read access
      ], false, false, undefined, ['jpg', 'png', 'jpeg', 'webp']);
      console.log('✅ Storage bucket created.');
    } catch (err) {
      if (err.code === 409) console.log('ℹ️ Storage bucket already exists.');
      else if (err.code === 403) console.log('ℹ️ Storage bucket limit reached, assuming bucket already exists.');
      else throw err;
    }

    // 3. Create Collections & Attributes
    
    // --- hotel_settings ---
    console.log('📝 Creating collection: hotel_settings');
    try {
      await databases.createCollection(DB_ID, 'hotel_settings', 'Hotel Settings', [Permission.read(Role.any())]);
      console.log('✅ hotel_settings collection created.');
      
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'name', 255, true);
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'tagline', 255, false);
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'phone', 50, true);
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'whatsapp', 50, true);
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'address', 500, true);
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'map_embed_url', 1000, false);
      await databases.createStringAttribute(DB_ID, 'hotel_settings', 'logo_id', 255, false);
      console.log('✅ hotel_settings attributes created. Note: Attributes may take a moment to be fully created in Appwrite.');
    } catch (err) {
      if (err.code === 409) console.log('ℹ️ hotel_settings collection/attributes already exist.');
      else throw err;
    }

    // --- rooms ---
    console.log('📝 Creating collection: rooms');
    try {
      await databases.createCollection(DB_ID, 'rooms', 'Rooms', [Permission.read(Role.any())]);
      console.log('✅ rooms collection created.');
      
      await databases.createStringAttribute(DB_ID, 'rooms', 'title', 255, true);
      await databases.createStringAttribute(DB_ID, 'rooms', 'category', 100, true);
      await databases.createFloatAttribute(DB_ID, 'rooms', 'price', true);
      await databases.createIntegerAttribute(DB_ID, 'rooms', 'capacity', true);
      await databases.createStringAttribute(DB_ID, 'rooms', 'description', 2000, true);
      await databases.createStringAttribute(DB_ID, 'rooms', 'amenities', 1000, false, undefined, true); // array
      await databases.createStringAttribute(DB_ID, 'rooms', 'image_ids', 255, false, undefined, true); // array
      await databases.createBooleanAttribute(DB_ID, 'rooms', 'is_available', false, true);
      console.log('✅ rooms attributes created.');
    } catch (err) {
      if (err.code === 409) console.log('ℹ️ rooms collection/attributes already exist.');
      else throw err;
    }

    // --- bookings ---
    console.log('📝 Creating collection: bookings');
    try {
      await databases.createCollection(DB_ID, 'bookings', 'Bookings'); 
      console.log('✅ bookings collection created.');
      
      await databases.createStringAttribute(DB_ID, 'bookings', 'guest_name', 255, true);
      await databases.createStringAttribute(DB_ID, 'bookings', 'phone', 50, true);
      await databases.createStringAttribute(DB_ID, 'bookings', 'room_id', 255, true);
      await databases.createDatetimeAttribute(DB_ID, 'bookings', 'check_in', true);
      await databases.createDatetimeAttribute(DB_ID, 'bookings', 'check_out', true);
      await databases.createStringAttribute(DB_ID, 'bookings', 'status', 50, false, 'pending');
      await databases.createDatetimeAttribute(DB_ID, 'bookings', 'created_at', true);
      console.log('✅ bookings attributes created.');
    } catch (err) {
      if (err.code === 409) console.log('ℹ️ bookings collection/attributes already exist.');
      else throw err;
    }

    console.log('🎉 Appwrite setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up Appwrite:', error);
  }
}

setupAppwrite();
