// frontend/src/components/Navigation/ProfileButton.js
import React, { useState} from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './Navigation.css';
import CustomButton from "../Button/Button";

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
    <CustomButton
          variant="submit"
          title="Demo User"
          onClick={demoUserLogin}
        ></CustomButton>
    </>
  );
}

export default DemoUserButton;