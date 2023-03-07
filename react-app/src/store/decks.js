// constants
const SET_DECK = "deck/SET_DECk";
const CREATE_DECK = "class/CREATE_DECK";
const EDIT_DECK = "class/EDIT_DECK";
const DELETE_DECK = "class/DELETE_DECK";
const SET_ERROR = "class/SET_ERROR";

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

const setError = (errorMessage) => ({
  type: SET_ERROR,
  payload: errorMessage,
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

export const deleteDeckByDeckId = (deckId) => async (dispatch) => {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`/api/deck/${deckId}`, options);
  
  if (response.ok) {
    dispatch(deleteDecks(deckId));
  } else {
    const error = await response.json();
    dispatch(setError(error?.message));
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
      const deckId = action.payload;
      let decks = newState?.deck;
      return { deck: decks.filter((deck) => deck?.id !== deckId) };
    }
    case SET_ERROR: {
      return { ...state, errorMessage: action?.payload };
    }
    default:
      return state;
  }
}
