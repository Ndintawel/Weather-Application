import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, NavLink } from 'react-router-dom'; 
import { auth } from '../firebase';
import "./login.css"

const Login = ({ userInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 

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
 
  return (
    <>
      <main >
        <section>
          <div>
          
              <div>
              <p>
                
              </p>
              <h1>Login to Weather Daily</h1>
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

            <p className="text-sm text-white text-center">
              No account yet? {' '}
              <NavLink to="/auth">
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

