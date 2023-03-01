import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { listCategory } from "../../store/categories";
import { Modal } from "../../context/Modal";


function CategoryPage() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories.category);
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    dispatch(listCategory());
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  //   categories are like subjects
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 40,
        }}
      >
        <h1>Categories</h1>
        <button
          name="create-category"
          style={{
            width: 240,
            height: 34,
            backgroundColor: "#3faee0",
            color: "white",
            border: "none",
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={() => setOpenModal(true)}
        >
          Create Category
        </button>

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
          <h2>Create Category</h2>
          <input
            type="text"
            placeholder="Enter caterory name"
            style={{ height: 32, minWidth: 250, borderRadius: 8 , marginTop: 20}}
          />
          <button
            name="create-category"
            style={{
              width: 240,
              marginTop: 40,
              height: 34,
              backgroundColor: "#3faee0",
              color: "white",
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
            }}
            // dispatch create category action with payload and openModal set to false 
            // onClick={() => }}
          >
            Create
          </button>
        </div>
      )}
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
