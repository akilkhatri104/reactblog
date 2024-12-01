import React,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import {Container,Postcard} from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
    const [posts,setPosts] = useState([])
    const loginStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        appwriteService.getPosts().then(posts => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    if(!loginStatus){
        return (
            <div className='w-full py-8 text-center'>
                <Container>
                    <h1 className='text-3xl font-bold'>Login To Read Posts <Link to='/login' className='text-blue-800'>Here</Link>.</h1>
                </Container>
            </div>
        )
    }

    if(posts.length === 0 && loginStatus){
        return(<div className='w-full py-8 text-center'>
                <Container>
                    <h1 className='text-3xl font-bold'>Write Post <Link to='/add-post' className='text-blue-800'>Here</Link>.</h1>
                </Container>
            </div>)
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map(post => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
  
}

export default Home