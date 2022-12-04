import db from "db/database";
import { USER_DETAILS_COLLECTION_NAME, type UserDetailsSchema } from "./schema";

const UserDetails = db.collection<UserDetailsSchema>(
  USER_DETAILS_COLLECTION_NAME,
);
export default UserDetails;
