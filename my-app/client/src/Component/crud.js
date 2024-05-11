import React, {useState,useEffect} from 'react';
import { db,storage} from '../firebase'; 
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref,uploadBytes,listAll,getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';

export const Crud = () => {

  // New user info states
  const [newFullName, setNewFullName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newLocation, setNewLocation] = useState('');

  // Update user's content
  const [updatedContent, setUpdatedContent] = useState('');

  const [userInfoItem, setUserInfo] = useState([]);
  const [image, setImage]=useState(null);
  const [imageUrl, setImageUrl]=useState([]);

  const userCollectionRef = collection(db, "User Info");
  const imageListRef=ref(storage, "Images/");


  const getUserInfo = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        imageUrl: imageUrl[index]
      }));
      setUserInfo(filteredData);
      console.log(userInfoItem)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((response)=>{
      response.items.forEach((item)=> {
        getDownloadURL(item).then((url)=> {
          setImageUrl((prev)=> [...prev,url]);
        });
      });
    });
 }, []);

 useEffect(()=> {
  getUserInfo();
 },[]);

 
 const deleteUserInfo = async (id) => {
  try{
    const userDoc = doc(db, "User Info", id);
    await deleteDoc(userDoc);
    getUserInfo();
  }catch(err) {
    console.error(err);
  }
};


 const updateUserInfo = async (id) => {
  try{
    const userDoc = doc(db, "User Info", id);
    await updateDoc(userDoc, { Content: updatedContent });
    getUserInfo();
  }catch(err) {
    console.error(err);
  }
  
}; 

const onSubmit = async () => {
    try {
       console.log(newFullName,newTitle,newContent,newLocation)
       await addDoc(userCollectionRef, {
        FullName: newFullName,
        Title: newTitle,
        Content: newContent,
        Location: newLocation,
      });
      getUserInfo();

    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    const imageName = `${image.name}_${v4()}`;
    const imageRef = ref(storage, `Images/${imageName}`); // Corrected usage of ref function
    try {
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      setImageUrl((prev) => [...prev, url]);
      alert("Image uploaded");
    } catch (error) {
      console.error(error);
    }
  };
  

  
  return (
    <div>
      <h1>Create a post</h1>
      <p>Share your thoughts daily...</p>
      <div className='form'>
        <input placeholder="Full Name: " onChange={(e) => setNewFullName(e.target.value)} />
        <input placeholder="Blog Title: " onChange={(e) => setNewTitle(e.target.value)} />
        <textarea placeholder="Content: " onChange={(e) => setNewContent(e.target.value)} />
        <input placeholder="Location: " onChange={(e) => setNewLocation(e.target.value)} />
        <input placeholder="Choose File" type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={()=>{onSubmit(); uploadImage()}}>Submit Info</button>
      </div>
      <div>
        {userInfoItem.map((userInfoItem) => (
          <div key={userInfoItem.id}>
            <p>Full Name: {userInfoItem.FullName}</p>
            <p>Title: {userInfoItem.Title}</p>
            <p>Content: {userInfoItem.Content}</p>
            <p>Location: {userInfoItem.Location}</p>

            <div>
              {userInfoItem.imageUrl && <img src= {userInfoItem.imageUrl}/>}
            </div>


            <button onClick={() => deleteUserInfo(userInfoItem.id)}>Delete Info</button>

            <input placeholder="New Content: " onChange={(e) => setUpdatedContent(e.target.value)} />
            <button onClick={() => updateUserInfo(userInfoItem.id)}>Update Info</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crud;
