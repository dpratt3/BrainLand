// constants
const SET_CARD = "question/SET_CARD";
const CREATE_CARD  = "questions/CREATE_CARD";

const setCards = (cards) => ({
  type: SET_CARD,
  payload: cards,
});

const initialState = { cards: null };

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARD:
      return {card: action.payload};
    default:
      return state;
  }
}
