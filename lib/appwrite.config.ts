import * as sdk from "node-appwrite";

export const {
  APPWRITE_PROJECT_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_PATIENT_DB,
  APPWRITE_DOCTOR_DB,
  APPWRITE_APPOINTMENT_DB,
  APPWRITE_BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint(APPWRITE_ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setKey(APPWRITE_API_KEY!);

// .setEndpoint(NEXT_PUBLIC_ENDPOINT)
// .setProject(NEXT_PUBLIC_PROJECT_ID)
// .setKey(NEXT_PUBLIC_API_KEY);

// .setEndpoint(NEXT_PUBLIC_ENDPOINT)
// .setProject(NEXT_PUBLIC_PROJECT_ID)
// .setKey(NEXT_PUBLIC_API_KEY);

// .setEndpoint(NEXT_PUBLIC_ENDPOINT)
// .setProject(NEXT_PUBLIC_PROJECT_ID)
// .setKey(NEXT_PUBLIC_API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
