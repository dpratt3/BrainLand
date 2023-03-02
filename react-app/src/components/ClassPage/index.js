import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createClass, listClass } from "../../store/classes";
import { Modal } from "../CreateCategoryModal";

function ClassPage() {
  const dispatch = useDispatch();
  const ClassList = useSelector((state) => state?.classes?.class || []);
  const [className, setClassName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    dispatch(listClass());
  }, []);

  const callBack = () => {
    setOpenModal(false);
    setClassName("");
  }

  const callCreateClass = () => {
    dispatch(createClass(className, callBack));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">Classes</h1>
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
          name="create-class"
          style={{
            width: 240,
            height: 34,
            backgroundColor: "#36013F",
            color: "white",
            border: "none",
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={() => setOpenModal(true)}
        >
          Create Class
        </button>
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
            style={{
              height: 32,
              minWidth: 250,
              borderRadius: 8,
              marginTop: 20,
            }}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button
            name="create-class"
            style={{
              width: 240,
              marginTop: 40,
              height: 34,
              backgroundColor: "#36013F",
              color: "white",
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
            }}
            onClick={() => callCreateClass()}
          >
            Create
          </button>
        </div>
      )}
      <ul>
        {ClassList?.map((cl) => (
          <li key={cl.id}>
            <a className="link" href={`/class/${cl?.id}`}>{cl?.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClassPage;
