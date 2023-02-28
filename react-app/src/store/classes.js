// constants
const SET_CLASS = "class/SET_CLASS";
const CREATE_CLASS  = "class/CREATE_CLASS";

const setClasses = (classes) => ({
  type: SET_CLASS,
  payload: classes,
});

const initialState = { class: [] };

export const listClass = () => async (dispatch) => {
  const response = await fetch("/api/class/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setClasses(data));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLASS:
      return { class: action.payload };
    default:
      return state;
  }
}
