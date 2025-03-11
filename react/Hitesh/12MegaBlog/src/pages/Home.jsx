import React, {useEffect, useState} from 'react'
import appwriteservice from '../appwrite/config'
import { Container,PostCard } from '../components'

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        appwriteservice.getPosts().then((post) =>{
            if(post){
                setPosts(post.documents)
            }
        })
    },[])
  
  if(posts.length === 0){
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Please login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }

  return (
    <div className=' w-full p-8'>
        <Container >
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div 
                        key={post.$id } className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default Home
