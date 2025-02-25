// import Community from "../../components/Community.vue";
import authService from "../auth";
import Community from "../collections/Community";
import {bucket} from "../bucket"
export const CommunityRealTime=(item,loading,scroll)=>{
    try {
      const unSubscribe=authService.client.subscribe(
            `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${import.meta.env.VITE_COLLECTION_ID_COMMUNITY}.documents`,
            (response)=>{
                // console.log(response)
                response.events.forEach((events)=>{
                    switch (events) {
                        case 'databases.*.collections.*.documents.*.create':
                            if(response.payload){
                                setTimeout(()=>{
                                    const posts=new Community()
                                    const gotten= posts.find(response.payload.$id)
                                    gotten.then((res)=>{
                                        // console.log(res.value)
                                        item.value.push(res.value)
                                        scroll()
                                    })
                                    loading.value=false
                                },5000)
                            }
                            
                            break;
                            case 'databases.*.collections.*.documents.*.delete':
                                item.value=item.value.filter(posts=>{
                                    
                                  return  posts.$id !== response.payload.$id
                                })
                            break;
                            case 'databases.*.collections.*.documents.*.update':
                                // console.log('updated')
                                if (response.payload) {
                                    // console.log(response.payload)
                                    
                                    const index = item.value.findIndex(
                                        posts => posts.$id === response.payload?.$id
                                    )
                                    if(index !== -1){
                                        item.value[index] = {
                                            ...item.value[index],
                                            ...response.payload
                                        }
                                    }
                                    // console.log(Community.value)
                                }
                                break;
                        default:
                            break;
                    }
                })
            }
        )
        return unSubscribe
    } catch (error) {
        
    }
}