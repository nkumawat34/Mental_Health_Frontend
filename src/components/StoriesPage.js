import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Mental from '../Assets/Images/mental.jpg'
import PersonHead from '../Assets/Images/person_head.jpg'
import { RiMentalHealthLine } from "react-icons/ri";
import  storage  from "../components/firebase";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { Link } from 'react-router-dom';

export default function StoriesPage() {
  const location = useLocation();
  const email =location.state.email
  const [title,setTitle]=useState('')
  const [imageUrl, setImageUrl] = useState(null);
  const [content,setContent]=useState('')
  const [stories,setStories]=useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenttoggle,setCommentToggle]=useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState({})
  const [liked, setLiked] = useState([]);
  const [token,SetToken]=useState('')
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const listRef = ref(storage, `files/${email}`);
        const res = await listAll(listRef);
        if (res.items.length > 0) {
          const itemRef = res.items[res.items.length-1]; // Get the most recent uploaded image
          const url = await getDownloadURL(itemRef);
        
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
    const fetchStories = async () => {
      try {
        const response = await axios.get("https://mental-health-backend-j16e.onrender.com/api/stories/allstories");
        setStories(response.data);
        
        
             
       
        setLoading(false); // Set loading to false after data is fe/tched

        const response1 = await axios.get("https://mental-health-backend-j16e.onrender.com/api/auth/getusers");
        const users=(response1.data)
        setUser(users.filter((user)=>user.email==email))

      } catch (err) {
        setError(err);
        setLoading(false); // Also set loading to false on error
      }
    };

    fetchStories();
    SetToken(localStorage.getItem(email+'token'))
  }, []); //
  const handleProfile = () => {
    console.log('Profile clicked');
    // Add your profile logic here
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Add your settings logic here
  };
  const handleCommentClick = async (story) => {
    setShowComments(!showComments);
    setCommentToggle(story._id)
    const remote_comments=await axios.get(`https://mental-health-backend-j16e.onrender.com/api/comments/${story._id}/comments`);
    
    setComments(remote_comments.data)
  };
  const handleCommentSubmit = async (story) => {

    const value=document.getElementById("c").value
    //setNewComment(document.getElementById("c").value)
    //alert(value)
    try {
      const response = await axios.post(`https://mental-health-backend-j16e.onrender.com/api/comments/story/${story._id}/comments`, {
        text: value, // Replace with actual author identifier
        commenter:email
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      setComments(response.data.comments);
      document.getElementById("c").value=""
      
    } catch (error) {
      console.error('Error adding comment:', error.response.data);
    }
  };
  const handleLogout = () => {
    // Remove the JWT token from local storage or session storage
    localStorage.removeItem('token');
    
    // Redirect to the login page or home page
    navigate("/login")
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const Upload=async (e)=>{



  
    e.preventDefault()
    try{
       const story={
        title:title,
      content:content ,
      author:email,
      createdAt:new Date(),
      comments: [],
        likes: [] 
       }

       const token=localStorage.getItem(email+'token');
     
       const response = await axios.post('https://mental-health-backend-j16e.onrender.com/api/stories/create', story, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       
        const response1 = await axios.get("https://mental-health-backend-j16e.onrender.com/api/stories/allstories");
        setStories(response1.data);
       
      //console.log(response)
       alert("Post has succesfully posted")
    }
    catch
    {
        console.log("Error came")
    }

  }
  const handleLike = async (index,story,action) => {
 


    try{
      var response
      if (action === 'like') {
        response=await axios.post(`https://mental-health-backend-j16e.onrender.com/api/likes/${story._id}/like`,{author:email},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      } else {
        response=await axios.delete(`https://mental-health-backend-j16e.onrender.com/api/likes/${story._id}/like/${email}`,{author:email},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      }
    
      const response1 = await axios.get("https://mental-health-backend-j16e.onrender.com/api/stories/allstories");
     setStories(response1.data);
      
      // Optional: Update UI or state to reflect the like
     
    } catch (error) {
      console.error('Error liking the story:', error);
    }
  };
  const handleDelete = async (storyId) => {
    try {
      const token=localStorage.getItem(email+'token');
      
    
      // Send DELETE request to backend API endpoint
      const response = await axios.delete(`https://mental-health-backend-j16e.onrender.com/api/stories/story/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // Log success message or handle response as needed
      const response1 = await axios.get("https://mental-health-backend-j16e.onrender.com/api/stories/allstories");
      setStories(response1.data);
    } catch (error) {
      console.error('Error deleting story:', error);
      // Handle error scenario, show error message, etc.
    }
  };
  const handleDeleteComment=async (storyId,commentId)=>{
    
    try {
      const response = await axios.delete(`https://mental-health-backend-j16e.onrender.com/api/comments/${storyId}/comments/${commentId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(response.data.story.comments)
      console.log('Comment deleted:', response.data.story.comments); // Handle success response as needed
      // Refresh comments or update state accordingly
    } catch (error) {
      console.error('Error deleting comment:', error); // Handle error
    }
  }
  const FullWidthStoryCard = ({ index,story }) => {

    const toggleLike = () => {
      if (userLikedStory) {
        handleLike(index, story, 'unlike');
      } else {
        handleLike(index, story, 'like');
      }
    };
    const userLikedStory = story.likes.includes(email);
    return (
      <div className="max-w-screen-xl mx-auto mt-5 relative">
      {/* Upper Data Section */}
      <div
        className="bg-cover bg-center h-96 flex items-end relative"
        style={{ backgroundImage: `url(${story.imageUrl})` }}
      >
        <div className="bg-cyan-700 text-white p-4 w-full absolute bottom-0 left-0 right-0">
          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(story._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              &times;
            </button>
          </div>
          <h2 className="text-4xl font-bold mb-2 text-center">{story.title}</h2>
          <p className="text-lg">{story.content}</p>
          <div className="flex items-center mt-4">
            <div className="text-sm">
              <p className="text-gray-100 leading-none">Author: {story.author}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-4">
          {userLikedStory ? (
              <button
              onClick={toggleLike}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Liked {story.likes.length}
              </button>
            ) : (
              <button
              onClick={toggleLike}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Like {story.likes.length}
              </button>
            )}
            <button
              onClick={() => handleCommentClick(story)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && story._id === commenttoggle && (
        <div className="mt-4 bg-white text-black p-4 rounded">
          <h3 className="text-xl font-bold mb-2">Comments</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Add your comment..."
           id="c"
          ></textarea>
          <button
            onClick={()=>handleCommentSubmit(story)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Comment
          </button>
          <div className="mt-4">
            {comments && comments.map((comment, index) => (
              <div key={index} className="mt-3 relative">
                <p><strong>{comment.commenter}: </strong>{comment.text}</p>
                <button
                  onClick={() => handleDeleteComment(story._id, comment._id)}
                  className="absolute top-0 right-0 mt-1 mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  };
  return (
    <div>
   
      <div class='flex flex-row justify-between'><div class=''> {imageUrl && (
        <div className="">
       
          <img src={imageUrl} alt="Uploaded" className="w-full h-20 object-cover rounded-full mt-2" />
        </div>
      )}</div>    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="mx-32 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 mt-5"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-32 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={()=> navigate("/profile",{state:{user:user}})}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              
      
              Your Profile
            </button>
            <button
              onClick={handleSettings}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
</div>
      
        <h1 class='text-center text-3xl mt-5'>Story Page</h1>
        
<form class="max-w-sm mx-auto mt-5" onSubmit={(e)=>Upload(e)}>
  <label >Title</label>
  <input class='border-2 hover:border-black my-4 mx-3' onChange={(e)=>setTitle(e.target.value)}></input>
  <textarea id="message" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Your Post" onChange={(e)=>setContent(e.target.value)}></textarea>
<button class='mx-[45%] mt-5 p-4 bg-red-300 rounded-full ' type='submit'>Post</button>
</form>
<img src={Mental} style={{height:"60vh",width:"30vw"}} class=' invisible lg:visible absolute bottom-[50vh] top-[10vh] left-[70%] mx-4'/>
<img src={PersonHead} style={{height:"40vh",width:"300px"}} class=' invisible  lg:visible absolute bottom-[60vh] top-[8vh] left-[4vh] right-[70%] mx-4'/>
<div>
      {stories.map((story,index) => (
        <FullWidthStoryCard key={story.id} index={index} story={story} />
      ))}
    </div>
    </div>
  )
}
