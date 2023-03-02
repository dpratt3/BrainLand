import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listDeckByClassId } from "../../store/decks";

function DeckPage() {
  const dispatch = useDispatch();
  const {classId} = useParams() // retrieve class_id from url since one is routed here after clicking on class name
  const DeckList = useSelector((state) => state.decks.deck);
 
  useEffect(() => {
    dispatch(listDeckByClassId(classId));
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">Decks</h1>
      {/* * To Do: Create decks button (On click it will open create deck modal (ambitions) or form (conservative)
      * To Do: List of decks for selected class ( on right side there will be two buttons, 1. Add Cards, 2. Study deck) */}

      <button>Create Deck</button>
      
      <ul>
        {DeckList?.map((deck) => (
          <li key={deck?.id}>
            <a className="link" href={`/deck/${deck?.id}`}>{deck?.name}</a>
          </li>
        ))}
      </ul>
      
    </>
  );
}

export default DeckPage;
