// constants
const SET_CATEGORY = "category/SET_CATEGORY";
const CREATE_CATEGORY = "category/CREATE_CATEGORY";

const setCategories = (categories) => ({
  type: SET_CATEGORY,
  payload: categories,
});

const createCategories = (categories) => ({
  type: CREATE_CATEGORY,
  payload: categories,
});


const initialState = { category: [] };

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

export const createCategory = (categoryName, callBack) => async(dispatch) => {
  const response = await fetch("/api/category/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name: categoryName})
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createCategories({category: data}));
    callBack();
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CATEGORY:{
      let categories = state.category;
      categories.push(action.payload.category);
      return {...state, ...{category: categories}};
    }
    case SET_CATEGORY: {
      return { category: action.payload };
    }
    default:
      return state;
  }
}
