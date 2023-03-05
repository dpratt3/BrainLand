// constants
const SET_CARD = "question/SET_CARD";
const CREATE_CARD = "questions/CREATE_CARD";
const UPDATE_CARD = "questions/UPDATE_CARD";
const DELETE_CARD = "questions/DELETE_CARD";

const setCards = (cards) => ({
  type: SET_CARD,
  payload: cards,
});

const createCards = (card) => ({
  type: CREATE_CARD,
  payload: card,
});

const updateCards = (card) => ({
  type: UPDATE_CARD,
  payload: card,
});

const deleteCards = (cardId) => ({
  type: DELETE_CARD,
  payload: cardId,
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

export const createCard =
  (cardQuestion, cardAnswer, deckId, callBack) => async (dispatch) => {
    const response = await fetch(`/api/card/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deck_id: deckId,
        card_question: cardQuestion,
        card_answer: cardAnswer,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }

      dispatch(createCards({ card: data }));
      callBack();
    }
  };

export const updateCard = (card, callBack) => async (dispatch) => {
  const response = await fetch(`/api/card/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(updateCards(data));
    callBack();
  }
}

  export const deleteCardByCardId = (cardId) => async(dispatch) => {
    const options = {
        method: "DELETE"
    }
    const response = await fetch(`/api/card/${cardId}`, options);
    dispatch(deleteCards(cardId));
    return response
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CARD: {
      let cards = state.cards;
      cards.push(action.payload.card);
      return { ...state, ...{ cards: cards } };
    }
    case UPDATE_CARD: {
      let cards = state.cards?.map(card => {
        if(card?.id === action?.payload?.id){
          return action?.payload;
        }
        return card;
      })
      return { ...state, ...{ cards: cards } };
    }
    case SET_CARD: {
      return { cards: action.payload };
    }
    case DELETE_CARD: {
      const newState = {...state};
      const cardId = action.payload;
      let cards = newState?.cards;
      return {cards: cards.filter((card) => card?.id !== cardId)}
    }
    default:
      return state;
  }
}
