import { Client, Account, Databases, Storage, Functions, Query, ID,Permission,Role } from "appwrite";
import Model from "../Model";
import authService from '../auth'

class PostStatus extends Model {
    collection=import.meta.env.VITE_COLLECTION_ID_POSTSTATUS;
   database=authService.databases

//    permission=[
//     Permission.read(Role.any()),
//     Permission.write(Role.user('current')),
//     Permission.update(Role.any()),
//     Permission.delete(Role.user('currrent'))
// ]
   attributes=[
    'views',
    'trends',
    'post'
   ]
}
export default PostStatus;