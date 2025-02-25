import { Storage, ID } from "appwrite";
import authService from "./auth";

const client = authService.client;

const storage = new Storage(client);
const bucketId = import.meta.env.VITE_STORAGE_ID;
export const bucket = {
    createImage: (file, id = ID.unique()) => {
            const response = storage.createFile(
                bucketId,
                id,
                file
            );
                return id;
            
        
    },
    reviewToUrl: (id) => {
        const img = storage.getFilePreview(bucketId, id);
        return img;
    },
    deleteImage:(id)=>{
       return storage.deleteFile(bucketId,id)
    }
};