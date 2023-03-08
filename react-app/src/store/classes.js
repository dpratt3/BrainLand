// constants
const SET_CLASS = "class/SET_CLASS";
const CREATE_CLASS = "class/CREATE_CLASS";
const EDIT_CLASS = "class/EDIT_CLASS";
const DELETE_CLASS = "class/DELETE_CLASS";
const SET_ERROR = "class/SET_ERROR";

const createClasses = (classes) => ({
  type: CREATE_CLASS,
  payload: classes,
});

const setClasses = (classes) => ({
  type: SET_CLASS,
  payload: classes,
});

const editClasses = (classes) => ({
  type: EDIT_CLASS,
  payload: classes,
});

const deleteClasses = (classId) => ({
  type: DELETE_CLASS,
  payload: classId,
});

const setError = (errorMessage) => ({
  type: SET_ERROR,
  payload: errorMessage,
});

const initialState = { classes: [] };

export const listClass = () => async (dispatch) => {
  dispatch(setError(""));
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

export const createClass = (className, callBack) => async (dispatch) => {
  dispatch(setError(""));
  const response = await fetch("/api/class/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ className: className }),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createClasses({ newClass: data }));
    callBack();
  }
};

export const editClass = (updatedClass, callback) => async (dispatch) => {
  dispatch(setError(""));

  const response = await fetch(`/api/class`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedClass),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editClasses(data));
  } else {
    const error = await response.json();
    dispatch(setError(error?.message));
  }
  callback();
};

export const deleteClass = (classId) => async (dispatch) => {
  dispatch(setError(""));
  const response = await fetch(`/api/class/${classId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteClasses(classId));
  } else {
    const error = await response.json();
    dispatch(setError(error?.message));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CLASS: {
      let classList = state.class;
      classList.push(action.payload.newClass);
      return { ...state, ...{ class: classList } };
    }
    case SET_CLASS: {
      return { class: action.payload };
    }
    case EDIT_CLASS: {
      let classes = state.class?.map((cl) => {
        if (cl?.id === action?.payload?.id) {
          return action?.payload;
        }
        return cl;
      });
      return { ...state, ...{ class: classes } };
    }
    case DELETE_CLASS: {
      const newState = { ...state };
      const classId = action.payload;
      let classess = newState?.class;
      return { class: classess.filter((cl) => cl?.id !== classId) };
    }
    case SET_ERROR: {
      return { ...state, errorMessage: action?.payload };
    }
    default:
      return state;
  }
}
