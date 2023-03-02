import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function HomePage() {
  const dispatch = useDispatch();
  
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
      <div><div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <img src="https://miro.medium.com/v2/resize:fit:828/0*Bx8KWmQYWfJN0_w5"
              style={{ width: 800, height: 450, borderRadius: 4, opacity: 0.85 }} alt="crowd of listeners" />
      </div>
          <div style={{ textAlign: "center", backgroundColor: "#36013F", marginTop: 8, color: "#fff" }}>
              BrainScape Clone | Author : David Pratt
          </div>
      </div>);

}

export default HomePage;
