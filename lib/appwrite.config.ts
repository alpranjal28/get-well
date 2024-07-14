import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_API_KEY,
  DB_ID,
  COLLECTION_PATIENT,
  COLLECTION_DOCTOR,
  COLLECTION_APPOINTMENT,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT,
} = process.env as Record<string, string>;

const client = new sdk.Client();

client
  .setEndpoint(NEXT_PUBLIC_ENDPOINT)
  .setProject(NEXT_PUBLIC_PROJECT_ID)
  .setKey(NEXT_PUBLIC_API_KEY);

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
