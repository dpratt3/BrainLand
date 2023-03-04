import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listCardByDeckId } from "../../store/cards";
import { deleteCardByCardId } from "../../store/cards";

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
  }

  const deleteCard = async (card) => {
    await dispatch(deleteCardByCardId(card?.id)) //.then(() => history.push('/songs'))
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div className="sidebar" style={{ color: "white", width: 200, textAlign: 'center' }}>
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
        {currentQuestionIndex === CardList?.length && (
          <div style={{ color: "white" }}>
            <h1> You have successfully completed this deck!</h1>
            <button className="fancyButton" onClick={onRetry}>Retry</button>
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

            <div>
              <button className="fancyButton" onClick={onShowAnswer}>
                Show Answer
              </button>
              <button
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
              </button>
              <button
                className="fancyDeleteButton"
                onClick={() => deleteCard(CardList[currentQuestionIndex])}
                // disabled={currentQuestionIndex === 0}
              >
                Delete Card
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayDeck;