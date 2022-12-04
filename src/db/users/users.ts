import db from "db/database";
import { USERS_COLLECTION_NAME, type UserSchema } from "./schema";

const Users = db.collection<UserSchema>(USERS_COLLECTION_NAME);
export default Users;
