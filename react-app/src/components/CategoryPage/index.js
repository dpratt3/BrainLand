import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { listCategory } from "../../store/categories";

function CategoryPage() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories.category);

  useEffect(() => {
    dispatch(listCategory());
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  //   categories are like subjects
  return (
    <>
      <h1>Categories</h1>

      <ul>
        {categoryList?.map((category) => (
          <li key={category.id}>
            <a href={category?.name}>{category.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoryPage;
