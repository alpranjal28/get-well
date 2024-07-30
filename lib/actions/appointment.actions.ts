"use server";
import { ID, Query } from "node-appwrite";
import {
  APPWRITE_APPOINTMENT_DB,
  APPWRITE_DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_DB!, //////
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointmentList = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_DB!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (appointmentList.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") acc.scheduledCount++;
        if (appointment.status === "pending") acc.pendingCount++;
        if (appointment.status === "cancelled") acc.cancelledCount++;
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointmentList.total,
      ...counts,
      documents: appointmentList.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_DB!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }
    
    // SMS notification logic
    const smsMessage = `
    Hi, it's CarePulse. 
    ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
    }
    `;
    await sendSmsNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSmsNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
