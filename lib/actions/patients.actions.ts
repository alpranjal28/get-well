import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("patientActionForm", user);
    console.log(ID.unique());
    /////////works till here
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("patientActionForm newUser", newUser);
    return newUser;
  } catch (error: any) {
    // check existing user
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal(`email`, [user.email])]);
      console.log("errorDocument", documents);
      return documents?.users[0];
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
