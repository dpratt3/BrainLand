import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createCard, listCardByDeckId } from "../../store/cards";

function CardPage() {
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const CardList = useSelector((state) => state.cards.cards);

  const [cardQuestion, setCardQuestion] = useState("");
  const [cardAnswer, setCardAnswer] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    //  do list of card by deckId
    dispatch(listCardByDeckId(deckId));
  }, []);

  const callBack = () => {
    setOpenModal(false);
    setCardQuestion("");
    setCardAnswer("");
  };

  const callCreateCard = () => {
    dispatch(createCard(cardQuestion, cardAnswer, deckId, callBack));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">Card Question Detail</h1>
      <button className="fancyButton"
        name="create-card"
        onClick={() => setOpenModal(true)}
      >
        Create Card
      </button>
      <a className="link" href={`/play/${deckId}`}>
        <button class="fancyButton">Play Deck</button>
      </a>
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
          <h2 className="title">Create Card</h2>
          {/* <input
            type="text"
            placeholder="Enter card name"
            style={{
              height: 32,
              minWidth: 250,
              borderRadius: 8,
              marginTop: 20,
            }}
            onChange={(e) => setCardQuestion(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Enter card question"
            style={{
              height: 32,
              minWidth: 250,
              borderRadius: 8,
              marginTop: 20,
            }}
            onChange={(e) => setCardQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter card answer"
            style={{
              height: 32,
              minWidth: 250,
              borderRadius: 8,
              marginTop: 20,
            }}
            onChange={(e) => setCardAnswer(e.target.value)}
          />
          <button className="fancyButton" onClick={() => callCreateCard()}>
            Create
          </button>
        </div>
      )}

      {/* - To Do: Create decks button (On click it will open create
      deck modal (ambitions) or form (conservative) - To Do: List of decks for
      selected class ( on right side there will be two buttons, 1. Add Cards, 2.
      play deck) */}

      <ul>
        {CardList?.map((card) => (
          <li key={card?.id}>
            <ul style={{ color: "#f8f4f4" }}>{card?.card_question}</ul>
            {/* <p style={{ color: "#f8f4f4" }}>{card?.card_answer}</p> */}
          </li>
        ))}
      </ul>

      {/* <button className="fancyButton">Show Answer</button>
      <button className="fancyButton">Next Card</button>
      <button className="fancyButton">Previous Card</button> */}
    </>
  );
}

export default CardPage;
