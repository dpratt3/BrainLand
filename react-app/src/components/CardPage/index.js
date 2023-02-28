import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listCard } from "../../store/cards";

function CardPage() {
  const dispatch = useDispatch();
  const CardList = useSelector((state) => state.cards.card);
  console.log(CardList)
  
  useEffect(() => {
    dispatch(listCard());
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1>Cards</h1>
      - To Do: Create decks button (On click it will open create deck modal (ambitions) or form (conservative)
      - To Do: List of decks for selected class ( on right side there will be two buttons, 1. Add Cards, 2. Study deck)

      <button>Create Card</button>
      <button>Next Card</button>
      <button>Previous Card</button>

      <ul>
        {CardList?.map((card) => (
          <li key={card?.id}>
            <a href={card.card_answer}>{card.card_answer}</a>
          </li>
        ))}
      </ul>
      
    </>
  );
}

export default CardPage;
