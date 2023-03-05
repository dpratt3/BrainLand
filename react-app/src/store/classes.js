// constants
const SET_CLASS = "class/SET_CLASS";
const CREATE_CLASS  = "class/CREATE_CLASS";
const EDIT_CLASS = "class/EDIT_CLASS";
const DELETE_CLASS = "class/DELETE_CLASS";

const createClasses = (classes) => ({
  type: CREATE_CLASS,
  payload: classes
}) 

const setClasses = (classes) => ({
  type: SET_CLASS,
  payload: classes,
});

const editClasses = (classes) => ({
  type: EDIT_CLASS,
  payload: classes,
});

const deleteClasses = (classes) => ({
  type: DELETE_CLASS,
  payload: classes,
});


const initialState = { classes: [] };

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

export const createClass = (className, callBack) => async(dispatch) => {
  const response = await fetch("/api/class/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({className: className})
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createClasses({newClass: data}));
    callBack();
  }
};

export const editClass = (classes, classId) => async(dispatch) => {
  const response = await fetch(`/api/class/${classId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classes)
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(editClasses(data));
  }
};

export const deleteClass = (classes, classId) => async(dispatch) => {
  const response = await fetch(`/api/class/${classId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteClasses(data));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CLASS:{
      let classList = state.class;
      classList.push(action.payload.newClass);
      return {...state, ...{class: classList}};
    }
    case SET_CLASS:{
      return { class: action.payload };
    }
    case EDIT_CLASS:{
      const newState = {...state}
      newState[action.classes.id] = action.classes
      return newState;
    }
    case DELETE_CLASS:{
      const newState = {...state}
      delete newState[action.classes.id]
      return newState;
    }
    default:
      return state;
  }
}
