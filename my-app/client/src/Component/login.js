import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, NavLink } from 'react-router-dom'; 
import { auth } from '../firebase';
import { db } from '../firebase';
import { getDocs, collection, addDoc } from "firebase/firestore";
import "./login.css"

export const Login = ({ userInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newFullName,setNewFullName]=useState('');
  const [newTitle,setNewTitle]=useState('');
  const [newContent,setNewContent]=useState('');
  const [newLocation,setNewLocation]=useState('');
  const navigate = useNavigate();

  const [setUserInfo] = useState([]);
  const userCollectionRef = collection(db, "User Info");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setUserInfo(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();
  }, []);


  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/weather");
        console.log("Clicked");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const Logout = async () => {
    try {
      console.log("Clicked");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit=async()=>{
    try{
      await addDoc(userCollectionRef, {
        FullName: newFullName, 
        Title: newTitle, 
        Content: newContent, 
        Location: newLocation
      });
    }catch(err){
      console.error(err);
    }
  };

  return (
    <>
      <main >
        <section>
          <div>
            <h1>Weather Daily By Sophie</h1>
            <p>Share your thoughts daily...</p>
            <div className='form'> 
                <input placeholder="Full Name: " onChange={(e)=> setNewFullName(e.target.value)}/>
                <input placeholder="Blog Title: " onChange={(e)=> setNewTitle(e.target.value)}/>
                <textarea placeholder="Content: " onChange={(e)=> setNewContent(e.target.value)}/>
                <input placeholder="Location: " onChange={(e)=> setNewLocation(e.target.value)}/>
                <button onClick={onSubmit}>Submit Info</button>
            </div>
            <div>
              {userInfo.map((userInfoItem) => (
                <div key={userInfoItem.id}>
                  <p>Full Name: {userInfoItem.FullName}</p>
                  <p>Title: {userInfoItem.Title}</p>
                  <p>Content: {userInfoItem.Content}</p>
                  <p>Location: {userInfoItem.Location}</p>
                </div>
              ))}
            </div>
            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  onClick={onLogin}
                >
                  Login
                </button>
                <button onClick={Logout}>Logout</button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              No account yet? {' '}
              <NavLink to="/signup">
                Sign up
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;

