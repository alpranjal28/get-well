"use server"
import { ID } from "node-appwrite";
import {
  APPWRITE_APPOINTMENT_DB,
  APPWRITE_DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_DB!,
      ID.unique(),
			appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
