// import Post from "../../components/Post.vue";
import authService from "../auth";
import Post from "../collections/Post";

export const setUpRealTimePost=(userId,post)=>{
    try {
      const unSubscribe=authService.client.subscribe(
            `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${import.meta.env.VITE_COLLECTION_ID_POST}.documents`,
            (response)=>{
                // console.log(response)
                if(response.payload.users.$id !== userId.$id) return

                response.events.forEach((events)=>{
                    switch (events) {
                        case 'databases.*.collections.*.documents.*.create':
                            if(response.payload){
                                console.log(response.payload)
                                setTimeout(()=>{
                                    const posts=new Post()
                               const gotten= posts.find(response.payload.$id)
                                    gotten.then((res)=>{
                                        console.log(res.value)
                                        post.value.unshift(res.value)
                                    })
                                },5000)
                            }
                            
                            break;
                            case 'databases.*.collections.*.documents.*.delete':
                                post.value=post.value.filter(posts=>posts.$id !== response.payload.$id)
                            break;
                            case 'databases.*.collections.*.documents.*.update':
                                // console.log('updated')
                                if (response.payload) {
                                    // console.log(response.payload)
                                    
                                    const index = post.value.findIndex(
                                        posts => posts.$id === response.payload?.$id
                                    )
                                    if(index !== -1){
                                        post.value[index] = {
                                            ...post.value[index],
                                            ...response.payload
                                        }
                                    }
                                    // console.log(post.value)
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