import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listCardByDeckId } from "../../store/cards";
import { deleteCardByCardId } from "../../store/cards";
import CustomButton from "../Button/Button";

function PlayDeck() {
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const CardList = useSelector((state) => state.cards.cards);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    //  Get list of cards by deck ID
    dispatch(listCardByDeckId(deckId));
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  const changeQuestion = (step) => {
    setCurrentQuestionIndex(currentQuestionIndex + step);
    setShowAnswer(false);
  };

  const onShowAnswer = () => {
    setShowAnswer(true);
  };

  const onRetry = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  };

  const deleteCard = async (card) => {
    await dispatch(deleteCardByCardId(card?.id)); //.then(() => history.push('/songs'))
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div
        className="sidebar"
        style={{ color: "white", width: 200, textAlign: "center" }}
      >
        {CardList?.map((card, index) => (
          <div>
            <h1
              style={{
                color: `${index === currentQuestionIndex ? "orange" : "white"}`,
              }}
            >
              {index + 1}
            </h1>
          </div>
        ))}
      </div>
      <div className="main-section">
        {CardList?.length === 0 && (
          <div style={{ color: "white" }}>
            <h1> Deck has no cards, please add cards</h1>
            <a className="link" href={`/deck/${deckId}`}>
              <button class="fancyButton">Back</button>
            </a>
          </div>
        )}
        {CardList?.length > 0 && currentQuestionIndex === CardList?.length && (
          <div style={{ color: "white" }}>
            <h1> You have successfully completed this deck!</h1>
            <button className="fancyButton" onClick={onRetry}>
              Retry
            </button>
          </div>
        )}

        {currentQuestionIndex < CardList?.length && (
          <div>
            <h1 style={{ color: "white" }}>
              {CardList[currentQuestionIndex]?.card_question}
            </h1>

            {showAnswer && (
              <>
                <hr style={{ color: "white" }} />
                <h1 style={{ color: "white" }}>
                  {CardList[currentQuestionIndex]?.card_answer}
                </h1>
              </>
            )}

            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
                height: 800,
              }}
            >
              <CustomButton
                variant="success"
                title="Show Answer"
                onClick={onShowAnswer}
              ></CustomButton>

              <CustomButton
                variant="info"
                title="Previous Card"
                onClick={() => changeQuestion(-1)}
                disabled={currentQuestionIndex === 0}
              ></CustomButton>

              <CustomButton
                variant="info"
                title=" Next Card"
                onClick={() => changeQuestion(1)}
                disabled={currentQuestionIndex === CardList?.length}
              ></CustomButton>

              <CustomButton
                variant="delete"
                title="Delete Card"
                onClick={() => deleteCard(CardList[currentQuestionIndex])}
              ></CustomButton>

              {/* <button
                className="fancyButton"
                onClick={() => changeQuestion(1)}
                disabled={currentQuestionIndex === CardList?.length}
              >
                Next Card
              </button>
              <button
                className="fancyButton"
                onClick={() => changeQuestion(-1)}
                disabled={currentQuestionIndex === 0}
              >
                Previous Card
              </button> */}
              {/* <button
                className="fancyDeleteButton"
                onClick={() => deleteCard(CardList[currentQuestionIndex])}
                // disabled={currentQuestionIndex === 0}
              >
                Delete Card
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayDeck;
