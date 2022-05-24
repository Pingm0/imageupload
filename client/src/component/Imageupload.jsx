import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import '../App.css';


function Imageupload() {
    const [newPost,setNewPost] = useState(
        {
            postTitle:'',
            postBody:'',
            postPicture:'',
            postedBy:''
        }
    )

    const [posts,setposts] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('postTitle',newPost.postTitle);
        formData.append('postBody',newPost.postBody);

        
        formData.append('postPicture',newPost.postPicture);

        console.log(newPost.postPicture)
        axios.post('http://localhost:8000/api/post',formData)
            .then((res) => {
                console.log(res)
                
            })
            .catch((err) => {
                console.log(err)

            })


    }

    useEffect((req,res) => {
        axios.get('http://localhost:8000/api/all/posts')
            .then((res) => {
                console.log(res)
                setposts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])
   

    function handleChange(e){
        setNewPost({...newPost,[e.target.name]: e.target.value})
    }
    function handlePhoto(e){
        setNewPost({...newPost,postPicture:e.target.files[0]}) //for single file
        // setNewPost({...newPost,postPicture:e.target.files[0]})


        console.log(newPost)


    }

    return (
        
    <div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type={'text'}
                placeholder='Post Title'
                name='postTitle'
                value={newPost.postTitle}
                onChange={handleChange}
            />
            <input 
                type={'text'}
                placeholder='Type you post here'
                name='postBody'
                value={newPost.postBody}
                onChange={handleChange}
            />
            <input 
                type={'file'}
                accept='.png, .jpg, .jpeg'
                name='postPicture'
                multiple
                onChange={handlePhoto}
            />
            <div className='bg'>

            </div>
            <input type="submit" 

            />

        
        </form>

        <div>
            {
                posts.map((post,index) => {
                    return(
                    <div key={index} className="imagesize">
                        <div>
                            {console.log(post.postPicture[0])}
                            <img src={`/images/${post.postPicture[0]}`} alt="" />
                        </div>
                    </div>
                )})
                }
            </div>

        
    </div>
    )
}

export default Imageupload