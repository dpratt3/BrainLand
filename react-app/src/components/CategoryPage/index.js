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
        {/* <button
          name="create-category"
          style={{
            width: 240,
            height: 34,
            backgroundColor: "#36013F",
            color: "white",
            border: "none",
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={() => setOpenModal(true)}
          
        >
          Create Category
        </button> */}
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
              minWidth: 250,
              borderRadius: 8,
              marginTop: 20,
            }}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {/* <button
            name="create-category"
            style={{
              width: 240,
              marginTop: 40,
              height: 34,
              backgroundColor: "#36013F",
              color: "white",
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
            }}
            onClick={() => callCreateCategory()}
            // dispatch create category action with payload and openModal set to false
            // onClick={() => }}
          >
            Create
          </button> */}
        <CustomButton
          variant="submit"
          title="Submit"
          onClick={() => setOpenModal(true)}
        ></CustomButton>
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
