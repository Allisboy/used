import { Client, Account, Databases, Storage, Functions, Query, ID,Permission,Role } from "appwrite";
import Model from "../Model";
import authService from '../auth'

class Post extends Model {
    collection=import.meta.env.VITE_COLLECTION_ID_POST;
    database=authService.databases

    attributes=[
        'name',
        'note',
        'users',
        'views',
        'categories',
        'amount'
       ];
    //    permission=[
    //     Permission.read(Role.any()),
    //     Permission.write(Role.user('current')),
    //     Permission.update(Role.user('current')),
    //     Permission.delete(Role.user('currrent'))
    // ]

   async makePost(data,userId){
        return await this.database.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            this.collection,
            ID.unique(),
            data,
        );
    }
}
export default Post;