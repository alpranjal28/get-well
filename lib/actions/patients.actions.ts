"use server";

import { ID, Query } from "node-appwrite";
import {
  APPWRITE_BUCKET_ID,
  APPWRITE_DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_PATIENT_DB,
  APPWRITE_PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser); //////////
  } catch (error: any) {
    // check existing user
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal(`email`, [user.email])]);
      console.log("errorDocument", documents);

      return documents?.users[0];
    } else {
      console.log(error);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get(`blobFile`) as Blob,
        identificationDocument?.get(`fileName`) as string
      );

      file = await storage.createFile(
        APPWRITE_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }

    const newPatient = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_DB!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_DB!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
