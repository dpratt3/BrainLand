// constants
const SET_DECK = "deck/SET_DECk";
const CREATE_DECK = "class/CREATE_DECK";
const EDIT_DECK = "class/EDIT_DECK";
const DELETE_DECK = "class/DELETE_DECK";

const setDecks = (decks) => ({
  type: SET_DECK,
  payload: decks,
});

const createDecks = (decks) => ({
  type: CREATE_DECK,
  payload: decks,
});

const editDecks = (decks) => ({
  type: EDIT_DECK,
  payload: decks,
});

const deleteDecks = (decks) => ({
  type: DELETE_DECK,
  payload: decks,
});

const initialState = { deck: null };

export const createDeck = (deckName, classId, callBack) => async (dispatch) => {
  const response = await fetch("/api/deck/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ class_id: classId, name: deckName }),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createDecks(data));
    callBack();
  }
};

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

export const listDeckByClassId = (class_id) => async (dispatch) => {
  const response = await fetch(`/api/deck/?class_id=${class_id}`, {
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

export const editDeck = (decks, deckId) => async (dispatch) => {
  const response = await fetch(`/api/deck/${deckId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(decks),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(editDecks(data));
  }
};

export const deleteDeck = (decks, deckId) => async (dispatch) => {
  const response = await fetch(`/api/deck/${deckId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteDecks(data));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DECK: {
      let decks = state.deck;
      decks.push(action.payload);
      return { ...state, ...{ deck: decks } };
    }
    case SET_DECK: {
      return { deck: action.payload };
    }
    case EDIT_DECK: {
      const newState = { ...state };
      newState[action.decks.id] = action.classes;
      return newState;
    }
    case DELETE_DECK: {
      const newState = { ...state };
      delete newState[action.decks.id];
      return newState;
    }
    default:
      return state;
  }
}
