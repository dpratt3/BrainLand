import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listCardByDeckId } from "../../store/cards";

function CardPage() {
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const CardList = useSelector((state) => state.cards.cards);
  console.log(CardList);

  useEffect(() => {
    //  do list of card by deckId
    dispatch(listCardByDeckId(deckId));
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">Cards</h1>
      <button>Create Card</button>
      {/* - To Do: Create decks button (On click it will open create
      deck modal (ambitions) or form (conservative) - To Do: List of decks for
      selected class ( on right side there will be two buttons, 1. Add Cards, 2.
      Study deck) */}
      <ul>
        {CardList?.map((card) => (
          <li key={card?.id}>
            <p style={{color: '#f8f4f4'}}>{card?.card_question}</p>
            <p style={{color: '#f8f4f4'}}>{card?.card_answer}</p>
          </li>
        ))}
      </ul>
      <button>Next Card</button>
      <button>Previous Card</button>
    </>
  );
}

export default CardPage;
