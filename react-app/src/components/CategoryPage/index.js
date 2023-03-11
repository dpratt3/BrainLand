import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { listCategory, createCategory } from "../../store/categories";
import { Modal } from "../../context/Modal";
import CustomButton from "../Button/Button";

function CategoryPage() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories.category);
  const [categoryName, setCategoryName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(listCategory());
  }, []);

  const callBack = () => {
    setOpenModal(false);
    setCategoryName("");
  };

  const callCreateCategory = () => {
    dispatch(createCategory(categoryName, callBack));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  //   categories are like subjects
  return (
    <>
      <h1 className="title">Categories</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 40,
        }}
      >
        <CustomButton
          variant="submit"
          title="Create Category"
          onClick={() => setOpenModal(true)}
        ></CustomButton>

        {/* do css, alignment, color etc. */}
        {/* make it functional */}
      </div>

      {openModal && (
        <div
          style={{
            border: "1px solid grey",
            margin: 20,
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 className="title">Create Category</h2>
          <input
            type="text"
            placeholder="Enter category name"
            style={{
              height: 32,
              minWidth: 400,
              borderRadius: 8,
              marginTop: 20,
              marginBottom: 8
            }}
            onChange={(e) => setCategoryName(e.target.value)}
          />

        <div style={{display: "flex", gap: "20", marginTop: "40"}}>
          <CustomButton
            variant="submit"
            title="Submit"
            onClick={() => callCreateCategory()}
          ></CustomButton>

          <CustomButton
            variant="cancel"
            title="Cancel"
            onClick={() => setOpenModal(false)}
          ></CustomButton>
          </div>

        </div>
      )}
      <ul>
        {categoryList?.map((category) => (
          <li key={category.id}>
            <a className="link" href={category?.name}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoryPage;
