// constants
const SET_CATEGORY = "category/SET_CATEGORY";
const CREATE_CATEGORY = "category/CREATE_CATEGORY";

const setCategories = (categories) => ({
  type: SET_CATEGORY,
  payload: categories,
});

const createCategories = (categories) => ({
  type: SET_CATEGORY,
  payload: categories,
});


const initialState = { category: null };

export const listCategory = () => async (dispatch) => {
  const response = await fetch("/api/category/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setCategories(data));
  }
};

export const createCategory = (categories) => async(dispatch) => {
  const response = await fetch("/api/categories/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categories)
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createCategories(data));
  }
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CATEGORY:{
      const newState = {...state}
      newState[action.categories.id] = action.categories
      return newState;
    }
    case SET_CATEGORY: {
      return { category: action.payload };
    }
    default:
      return state;
  }
}
