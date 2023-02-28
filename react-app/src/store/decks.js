// constants
const SET_DECK = "deck/SET_DECk";
const CREATE_DECK  = "deck/CREATE_DECK";

const setDecks = (decks) => ({
  type: SET_DECK,
  payload: decks,
});

const initialState = { deck: null };

export const listDeck = () => async (dispatch) => {
  const response = await fetch("/api/deck/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setDecks(data));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DECK:
      return { deck: action.payload };
    default:
      return state;
  }
}
