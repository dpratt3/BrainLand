import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div style={{ position: "relative"}}>
      <button onClick={openMenu} style={{ backgroundColor: "#2898dd", marginRight: "4px" }}>
        <i className="fas fa-user-circle" />
      </button>

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            {/* <li>{user.username}</li> */}
            
            <span style={{ margin: "auto 4", marginRight: "4px" }}>{user.email}</span>
            <hr style={{ width: "100%" }} />
            <span>
              <button style={{ backgroundColor: "#ff5614"}} onClick={handleLogout}>Log Out</button>
            </span>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
