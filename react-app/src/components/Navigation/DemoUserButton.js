// frontend/src/components/Navigation/ProfileButton.js
import React, { useState} from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './Navigation.css';

function DemoUserButton() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  // const demoUser = {email: 'demo@aa.io', password: 'password'} // must be object

  const demoUserLogin = (e) => {
    return dispatch(sessionActions.login('demo@aa.io', 'password')).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.keys(data.errors).map(key => data.errors[key]));
          }
        });
    };
  
  return (
    <>
    <button style={{ backgroundColor: "#295970", marginRight: "4px" }} onClick={demoUserLogin}>Demo User</button>
    </>
  );
}

export default DemoUserButton;