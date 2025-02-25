import { defineStore,storeToRefs } from "pinia";
import Post from "../collections/Post";




export const isLoadingEvent=defineStore('loading',{
    state:()=>({
        loading:false,
        localLoad:false
    }),
    actions:{
        True(){
            this.loading=true;
        },
        False(){
            this.loading=false;
        },
        setLocalTrue(){
            this.localLoad=true;
        },
        setLocalFalse(){
            this.localLoad=false;
        },
    }
})

const authUserPost=defineStore('userPost',{
    state:()=>({
        post:{}
    }),
    actions:{
        reset(){
            const posts=new Post()
            posts.where('user','=')
        }
    }
})
export const messageEvent=defineStore('message',{
    state:()=>({
        message:'',
        hasMessage:false,
        messageType:''
    }),
    actions:{
        setMessage(msg,type){
            this.hasMessage=true
            this.messageType=type
            this.message=msg
            setTimeout(()=>{
                this.hasMessage=false
            },6000)
            setTimeout(()=>{
                this.messageType=''
            },8000)
        }
    }
})
