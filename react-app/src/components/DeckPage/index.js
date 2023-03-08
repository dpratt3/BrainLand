import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listDeckByClassId, createDeck, updateDeck } from "../../store/decks";
import CustomButton from "../Button/Button";
import { Modal } from "../CreateCategoryModal";
import { deleteDeckByDeckId } from "../../store/decks";

function DeckPage() {
  const dispatch = useDispatch();
  const { classId } = useParams(); // retrieve class_id from url since one is routed here after clicking on class name
  const DeckList = useSelector((state) => state?.decks?.deck);
  const errorMessage = useSelector(
    (state) => state?.classes?.errorMessage || ""
  );
  const [deckName, setDeckName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    dispatch(listDeckByClassId(Number(classId)));
  }, []);

  const callBack = () => {
    setSelectedDeck(null);
    setOpenModal(false);
    setDeckName("");
  };

  const onUpdateDeck = (deck) => {
    setSelectedDeck(deck);
    setDeckName(deck?.name);
    setOpenModal(true);
  };

  const openCreateDeckModal = () => {
    setSelectedDeck(null);
    setDeckName("");
    setOpenModal(true);
  };

  const callUpdateDeck = () => {
    const deck = {
      id: selectedDeck?.id,
      class_id: selectedDeck?.class_id,
      name: deckName,
    };
    dispatch(updateDeck(deck, callBack));
  };

  const callCreateDeck = () => {
    dispatch(createDeck(deckName, classId, callBack));
  };

  const deleteDeck = (deck) => {
    dispatch(deleteDeckByDeckId(deck?.id));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">List of Decks</h1>
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
          onClick={() => openCreateDeckModal()}
        ></CustomButton>
      </div>

      <p style={{ color: "red" }}>{errorMessage}</p>

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
          <h2 className="title">
            {`${selectedDeck !== null ? "Update" : "Create"}`} Deck
          </h2>
          <input
            type="text"
            placeholder="Enter deck name"
            defaultValue={deckName}
            style={{
              height: 32,
              minWidth: 400,
              borderRadius: 8,
              marginTop: 20,
              marginBottom: 8,
            }}
            onChange={(e) => setDeckName(e.target.value)}
          />

          <div style={{ display: "flex", gap: "20", marginTop: "40" }}>
            {!selectedDeck && (
              <CustomButton
                variant="submit"
                title="Submit"
                onClick={() => callCreateDeck()}
              ></CustomButton>
            )}

            {selectedDeck && (
              <CustomButton
                variant="submit"
                title="Update"
                onClick={() => callUpdateDeck()}
              ></CustomButton>
            )}

            <CustomButton
              variant="cancel"
              title="Cancel"
              onClick={() => setOpenModal(false)}
            ></CustomButton>
          </div>
        </div>
      )}
      <div style={{ padding: 20 }}>
        <ol>
          {DeckList?.map((deck) => (
            <li
              key={deck?.id}
              style={{
                color: "#f8f4f4",
                fontSize: 34,
                fontWeight: 600,
                padding: 5,
              }}
            >
              <a className="link" href={`/deck/${deck?.id}`}>
                {deck?.name}
              </a>
              <div style={{ display: "flex" }}>
                <CustomButton
                  variant="submit"
                  title="Update Deck"
                  onClick={() => onUpdateDeck(deck)}
                ></CustomButton>
                <CustomButton
                  variant="delete"
                  title="Delete Deck"
                  onClick={() => deleteDeck(deck)}
                ></CustomButton>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default DeckPage;
