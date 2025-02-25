import { ID } from "appwrite";
import authService from "./auth";

const databases=authService.databases
const db={}


const collections=[
    {
    dbId:import.meta.env.VITE_DATABASE_ID,
    id:import.meta.env.VITE_COLLECTION_ID_INFO,
    name:'info'
    },
    {
    dbId:import.meta.env.VITE_DATABASE_ID,
    id:import.meta.env.VITE_COLLECTION_ID_USER,
    name:'user'
    },
    {
    dbId:import.meta.env.VITE_DATABASE_ID,
    id:import.meta.env.VITE_COLLECTION_ID_POST,
    name:'post'
    },
    {
    dbId:import.meta.env.VITE_DATABASE_ID,
    id:import.meta.env.VITE_COLLECTION_ID_IMAGES,
    name:'images'
    },
    {
    dbId:import.meta.env.VITE_DATABASE_ID,
    id:import.meta.env.VITE_COLLECTION_ID_POSTSTATUS,
    name:'Poststatus'
    },
]

collections.forEach((col) => {
    db[col.name]={
        dbId:col.id,
        create:async(payload,id=ID.unique())=>{
        try {
            const dbCreate=await databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
            )
            return dbCreate
        } catch (error) {
            throw error
        }

        },
        createUser:async(payload,id)=>{
            console.log(id)
        try {
            // const dbCreate=await databases.createDocument(
            //     col.dbId,
            //     col.id,
            //     id,
            //     payload,
            // )
            // return dbCreate
        } catch (error) {
            throw error
        }

        },
        get:(id)=>databases.getDocument(col.dbId,col.id,id),
        list:(queries=[])=>databases.listDocuments(col.dbId,col.id,queries),
        createWithPermission:async(payload,permission,id=ID.unique())=>{
            try {
                const dbCreate=await databases.createDocument(
                    col.dbId,
                    col.id,
                    id,
                    payload,
                    permission
                )
                return dbCreate
            } catch (error) {
                throw error
            }
        }
    }
});


export default db;