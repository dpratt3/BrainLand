import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createCard, listCardByDeckId, updateCard } from "../../store/cards";
import CustomButton from "../Button/Button";
import { deleteCardByCardId } from "../../store/cards";

function CardPage() {
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const CardList = useSelector((state) => state.cards.cards);

  const [cardQuestion, setCardQuestion] = useState("");
  const [cardAnswer, setCardAnswer] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  console.log(CardList[selectedCard?.id])
  useEffect(() => {
    //  do list of card by deckId
    dispatch(listCardByDeckId(deckId));
  }, []);

  const callBack = () => {
    setSelectedCard(null);
    setOpenModal(false);
    setCardQuestion("");
    setCardAnswer("");
  };

  const callCreateCard = () => {
    dispatch(createCard(cardQuestion, cardAnswer, deckId, callBack));
  };

  const deleteCard = async(card) => {
    await dispatch(deleteCardByCardId(card?.id)); //.then(() => history.push('/songs'))
  };


  const callUpdateCard = () => {
    const card = {
      id: selectedCard?.id,
      deck_id: deckId,
      card_question: cardQuestion,
      card_answer: cardAnswer,
    };
    dispatch(updateCard(card, callBack));
  };

  const openCreateCardModal = () => {
    setSelectedCard(null);
    setCardQuestion("");
    setCardAnswer("");
    setOpenModal(true);
  };

  const onUpdateCard = (card) => {
    setSelectedCard(card);
    setCardQuestion(card?.card_question);
    setCardAnswer(card?.card_answer);
    setOpenModal(true);
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 40,
        }}
      >
        <h1 className="title">List of Cards</h1>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <button
            className="fancyButton"
            name="create-card"
            onClick={() => setOpenModal(true)}
          >
            Create Card
          </button> */}
          <CustomButton
            variant="submit"
            title="Create Card"
            onClick={() => openCreateCardModal()}
          ></CustomButton>
          <a
            className="link"
            href={`/play/${deckId}`}
            style={{ textDecoration: "none" }}
          >
            {/* <button class="fancyButton" disabled={CardList?.length === 0}>
              Play Deck
            </button> */}
            <CustomButton
              variant="submit"
              title="Play Deck"
              onClick={() => setOpenModal(false)}
              disabled={CardList?.length === 0}
            ></CustomButton>
          </a>
        </div>
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
          <h2 className="title">
            {`${selectedCard !== null ? "Update" : "Create"}`} Card
          </h2>
          <input
            type="text"
            placeholder="Enter card question"
            defaultValue={cardQuestion}
            style={{
              height: 32,
              minWidth: 400,
              borderRadius: 8,
              marginTop: 20,
              padding: 8,
            }}
            onChange={(e) => setCardQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter card answer"
            defaultValue={cardAnswer}
            style={{
              height: 32,
              minWidth: 400,
              borderRadius: 8,
              marginTop: 20,
              padding: 8,
            }}
            onChange={(e) => setCardAnswer(e.target.value)}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 40 }}>
            {!selectedCard && (
              <CustomButton
                variant="submit"
                title="Submit"
                onClick={() => callCreateCard()}
              ></CustomButton>
            )}

            {selectedCard && (
              <CustomButton
                variant="submit"
                title="Update"
                onClick={() => callUpdateCard()}
              ></CustomButton>
            )}

            <CustomButton
              variant="cancel"
              title="Cancel"
              onClick={() => setOpenModal(false)}
            ></CustomButton>

            {/* <button
              className="fancyButton"
              name="create-card"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button className="fancyButton" onClick={() => callCreateCard()}>
              Create
            </button> */}
          </div>
        </div>
      )}

      {/* - To Do: Create decks button (On click it will open create
      deck modal (ambitions) or form (conservative) - To Do: List of decks for
      selected class ( on right side there will be two buttons, 1. Add Cards, 2.
      play deck) */}

      <div style={{ padding: 40 }}>
        <ol>
          {CardList?.map((card) => (
            <div
              key={card?.id}
              style={{ color: "#f8f4f4", fontSize: 34, fontWeight: 600, display: "flex", justifyContent: "space-between"}}
            >
              <li>{card?.card_question}</li>

            <div style={{display: "flex"}}>
              <CustomButton
                variant="submit"
                title="Update Card"
                onClick={() => onUpdateCard(card)}
              ></CustomButton>
              <CustomButton
                variant="delete"
                title="Delete Card"
                onClick={() => deleteCard(card)}
              ></CustomButton>
              </div>
            </div>
          ))}
        </ol>
      </div>
      {/* <button className="fancyButton">Show Answer</button>
      <button className="fancyButton">Next Card</button>
      <button className="fancyButton">Previous Card</button> */}
    </>
  );
}

export default CardPage;
