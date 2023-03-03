// constants
const SET_CARD = "question/SET_CARD";
const CREATE_CARD = "questions/CREATE_CARD";

const setCards = (cards) => ({
  type: SET_CARD,
  payload: cards,
});

const createCards = (card) => ({
  type: CREATE_CARD,
  payload: card,
});

const initialState = { cards: [] };

export const listCard = () => async (dispatch) => {
  const response = await fetch("/api/card/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setCards(data));
  }
};

export const listCardByDeckId = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/card/?deck_id=${deckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setCards(data));
  }
};

export const createCard = (cardQuestion, cardAnswer, deckId, callBack) => async(dispatch) => {
  const response = await fetch(`/api/deck/?deck_id=${deckId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({card_question: cardQuestion, card_answer: cardAnswer})
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createCards(data));
    callBack();
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CARD:{
      let cards = state.cards;
      cards.push(action.payload.card);
      return {...state, ...{card: cards}};
    }
    case SET_CARD: {
      return { cards: action.payload };
    }
    default:
      return state;
  }
}
