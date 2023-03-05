import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listDeckByClassId, createDeck } from "../../store/decks";
import CustomButton from "../Button/Button";
import { Modal } from "../CreateCategoryModal";

function DeckPage() {
  const dispatch = useDispatch();
  const { classId } = useParams(); // retrieve class_id from url since one is routed here after clicking on class name
  const DeckList = useSelector((state) => state.decks.deck);
  const [deckName, setDeckName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const callBack = () => {
    setOpenModal(false);
    setDeckName("");
  };

  useEffect(() => {
    dispatch(listDeckByClassId(Number(classId)));
  }, []);

  const callCreateDeck = () => {
    dispatch(createDeck(deckName, classId, callBack));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">Decks</h1>
      {/* * To Do: Create decks button (On click it will open create deck modal (ambitions) or form (conservative)
       * To Do: List of decks for selected class ( on right side there will be two buttons, 1. Add Cards, 2. Study deck) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 40,
        }}
      >
        {/* <button className="fancyButton">Create Deck</button> */}
        <CustomButton
          variant="submit"
          title="Create Deck"
          onClick={() => setOpenModal(true)}
        ></CustomButton>
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
          <h2 className="title">Create Deck</h2>
          <input
            type="text"
            placeholder="Enter deck name"
            style={{
              height: 32,
              minWidth: 400,
              borderRadius: 8,
              marginTop: 20,
              marginBottom: 8
            }}
            onChange={(e) => setDeckName(e.target.value)}
          />
          {/* <button
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
            onClick={() => callCreateDeck()}
          >
            Create
          </button> */}
          {/* <CustomButton
            variant="submit"
            title="Submit"
            onClick={() => setOpenModal(true)}
          ></CustomButton> */}

        <div style={{display: "flex", gap: "20", marginTop: "40"}}>
          <CustomButton
            variant="submit"
            title="Submit"
            onClick={() => callCreateDeck()}
          ></CustomButton>

          <CustomButton
            variant="cancel"
            title="Cancel"
            onClick={() => setOpenModal(false)}
          ></CustomButton>
          </div>
        
        </div>
      )}
      <ul>
        {DeckList?.map((deck) => (
          <li key={deck?.id}>
            <a className="link" href={`/deck/${deck?.id}`}>
              {deck?.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DeckPage;
