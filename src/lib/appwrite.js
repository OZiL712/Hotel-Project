import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DB_ID = 'hotel_db'; 
export const SETTINGS_COLLECTION_ID = 'hotel_settings';
export const ROOMS_COLLECTION_ID = 'rooms';
export const BOOKINGS_COLLECTION_ID = 'bookings';
export const STORAGE_BUCKET_ID = 'hotel-media';
