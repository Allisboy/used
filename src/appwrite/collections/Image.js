import { Client, Account, Databases, Storage, Functions, Query, ID } from "appwrite";
import Model from "../Model";
import authService from '../auth'

class Images extends Model {
    collection=import.meta.env.VITE_COLLECTION_ID_IMAGES;
   database=authService.databases

   attributes=[
    'url',
    'post',
    'community'
   ];
}
export default Images;