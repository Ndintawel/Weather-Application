import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherApp from './Component/WeatherApp/WeatherApp.jsx';
import Auth from "./Component/auth.js";
import Login from "./Component/login.js";
import Crud from './Component/crud.js';
import HomePage from "./Component/Home.js";

import { db } from "./firebase.js";
import { getDocs, collection} from "firebase/firestore";

function App() {
  const [userInfo, setUserInfo] = useState([]);
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

 

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login userInfo={userInfo} />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/crud" element={<Crud />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

