import { Client, Account, Databases, Storage, Functions, Query, ID,Permission,Role } from "appwrite";
import Model from "../Model";
import authService from '../auth'
class Community extends Model {
    collection=import.meta.env.VITE_COLLECTION_ID_COMMUNITY;
    database=authService.databases;
    attributes=[
        'message',
        'users',
        'images',
        'imageId'
    ]
}
export default Community;