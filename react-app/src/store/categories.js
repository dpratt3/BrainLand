// constants
const SET_CATEGORY = "category/SET_CATEGORY";
const CREATE_CATEGORY = "category/CREATE_CATEGORY";

const setCategories = (categories) => ({
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return { category: action.payload };
    default:
      return state;
  }
}
