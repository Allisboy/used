import { useAuthStore } from '../appwrite/utils/global';
import { storeToRefs } from 'pinia';
import { bucket } from '../appwrite/bucket';
import authService from '../appwrite/auth'
import User from '../appwrite/collections/User'
import Post from '../appwrite/collections/Post'
import db from '../appwrite/database';
import Images from '../appwrite/collections/Image';
import PostStatus from '../appwrite/collections/PostStatus';
import { isLoadingEvent, messageEvent } from './utils/general';



 const auth= useAuthStore()
 const {user,refetch}=storeToRefs(auth)

 export const createPost=async(formData,imageFiles)=>{
  const userModal=new User()
  const postModel=new Post()
  const images=new Images()
  const postStatus=new PostStatus()
    const imageID=[]
    imageFiles.value.forEach((img)=>{
      const genImage=bucket.createImage(img);
      if(genImage){
        imageID.push({
          id:genImage,
          url:bucket.reviewToUrl(genImage)
        })
        // console.log(genImage.$id)
      }
    })
    console.log(imageID)
   try {
    
     postModel.name=formData.name;
     postModel.amount=parseFloat(formData.amount);
     postModel.categories=formData.categories;
     postModel.note=formData.note;
     postModel.users=user.value.$id;
     await postModel.Save()
    //  console.log(postModel)
    const postId=await postModel.$id
  
    if (postId) {
      imageID.forEach((img)=>{
        images.url=img.url;
        images.post=postId
        images.Save(img.id)
      })

      postStatus.views=0;
      postStatus.trends=0;
      postStatus.post=postId;
      const finish=postStatus.Save() 
      if(finish){
        refetch()
      } 
    
    } else {
      console.log('failed')
    }
   } catch (error) {
    throw error
   }
  
}

export const updatePost=(formData,id)=>{
  const {setLocalFalse,setLocalTrue}=isLoadingEvent()
  const {setMessage}=messageEvent()
  const post=new Post()

  post.find(id).then(()=>{
    setLocalTrue()
    post.update(null,formData).then((res)=>{
      if(res){
        setMessage('Post Updated Successfully!','success')
        setLocalFalse()
      }else{
        setMessage('Post Update Failed!')
        setLocalTrue()
      }
    })
  })
}