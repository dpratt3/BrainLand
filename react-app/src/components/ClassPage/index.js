import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listClass } from "../../store/classes";
import { Modal } from "../CreateCategoryModal";

function ClassPage() {
  const dispatch = useDispatch();
  const ClassList = useSelector((state) => state?.classes?.class || []);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    dispatch(listClass());
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1>Classes</h1>
      {/* - To Do: Create decks button (On click it will open create deck modal (ambitions) or form (conservative)
      - To Do: List of decks for selected class ( on right side there will be two buttons, 1. Add Cards, 2. Study deck) */}
            <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 40,
        }}
      >
        <button
          name="create-category"
          style={{
            width: 240,
            height: 34,
            backgroundColor: "#3faee0",
            color: "white",
            border: "none",
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={() => setOpenModal(true)}
        >
          Create Class
        </button>

        {/* do css, alignment, color etc. */}
        {/* make it functional */}
      </div>
      {openModal && (
        <div
          style={{
            border: "1px solid grey",
            margin: 20,
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>Create Class</h2>
          <input
            type="text"
            placeholder="Enter class name"
            style={{ height: 32, minWidth: 250, borderRadius: 8 , marginTop: 20}}
          />
          <button
            name="create-category"
            style={{
              width: 240,
              marginTop: 40,
              height: 34,
              backgroundColor: "#3faee0",
              color: "white",
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
            }}
            // dispatch create category action with payload and openModal set to false 
            // onClick={() => }}
          >
            Create
          </button>
        </div>
      )}
      <ul>
        {ClassList?.map((cl) => (
          <li key={cl.id}>
            <a href={`/class/${cl?.id}`}>{cl?.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClassPage;
