import { useState } from "react";
import  storage  from "../components/firebase";
import { ref, uploadBytesResumable, getDownloadURL,deleteObject,listAll } from "firebase/storage";
 import { useLocation } from "react-router-dom";
 import './Profile.css'
 import { useEffect } from "react";
function Profile() {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState(null);
    const location = useLocation();
    const {user} =location.state
    const user_new=user[0]
    const [imageUrl, setImageUrl] = useState(null);
    // progress
    const [percent, setPercent] = useState(0);
 
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      };
      useEffect(() => {
        const fetchImageUrl = async () => {
          try {
            const listRef = ref(storage, `files/${user_new.email}`);
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
      },[])
    const handleUpload = async () => {
        if (!file) {
            alert("Please upload an image first!");
        }
             // Delete all previous files
      const listRef = ref(storage, `files/${user_new.email}`);
      const res = await listAll(listRef);
      const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);

        const storageRef = ref(storage, `/files/${user_new.email}/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
 
    return (
        <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-md shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold">{`Welcome, ${user_new.username}`}</h2>
      <img src={imageUrl} alt="Update Profile Image" className="w-full h-80 object-cover  mt-2" />
      <p className="text-gray-600">{user_new.email}</p>
      <input
        type="file"
        onChange={handleChange}
        accept="image/*"
        className="p-2 border border-gray-300 rounded w-full"
      />
      {preview && (
        <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded mt-4" />
      )}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Profile 
      </button>
      {file?<p className="text-lg">{percent}% done</p>:""}
    </div>
    );
}
 
export default Profile;