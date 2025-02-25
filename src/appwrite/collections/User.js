import { Client, Account, Databases, Storage, Functions, Query, ID,Permission,Role } from "appwrite";
import Model from "../Model";
import authService from '../auth'
import Post from "./Post"
class User extends Model {
    collection=import.meta.env.VITE_COLLECTION_ID_USER;
    database=authService.databases;

    // permission=[
    //     // Permission.read(Role.guests()),
    //     Permission.read(Role.any()),
    //     Permission.write(Role.users()),
    //     Permission.update(Role.user('current')),
    //     Permission.delete(Role.user('currrent'))
    // ]
}
export default User;