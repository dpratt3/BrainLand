import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createClass, listClass, editClass } from "../../store/classes";
import { Modal } from "../CreateCategoryModal";
import CustomButton from "../Button/Button";
import { deleteClass } from "../../store/classes";

function ClassPage() {
  const dispatch = useDispatch();
  const ClassList = useSelector((state) => state?.classes?.class || []);
  const errorMessage = useSelector(
    (state) => state?.classes?.errorMessage || ""
  );
  const [className, setClassName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(listClass());
  }, []);

  const callBack = () => {
    setOpenModal(false);
    setClassName("");
  };

  const callUpdateClass = () => {
    const updatedClass = {
      id: selectedClass?.id,
      name: className,
      user_id: selectedClass?.user_id,
    };
    dispatch(editClass(updatedClass, callBack));
  };

  const onUpdateClass = (cl) => {
    setSelectedClass(cl);
    setClassName(cl?.name);
    setOpenModal(true);
  };

  const openCreateClassModal = () => {
    setSelectedClass(null);
    setClassName("");
    setOpenModal(true);
  };

  const callCreateClass = () => {
    dispatch(createClass(className, callBack));
  };

  const deleteClasses = (cl) => {
    dispatch(deleteClass(cl?.id));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1 className="title">Classes</h1>
      {/* - To Do: Create decks button (On click it will open create deck modal (ambitions) or form (conservative)
      - To Do: List of decks for selected class ( on right side there will be two buttons, 1. Add Cards, 2. Study deck) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 40,
        }}
      >
        <CustomButton
          variant="submit"
          title="Create Class"
          onClick={() => openCreateClassModal()}
        ></CustomButton>
      </div>

      {/* A class with decks cannot be deleted! */}
      <p style={{ color: "red" }}>{errorMessage}</p>

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
          <h2 className="title">
            {`${selectedClass !== null ? "Update" : "Create"}`} Class
          </h2>
          <input
            type="text"
            placeholder="Enter class name"
            defaultValue={className}
            style={{
              height: 32,
              minWidth: 390,
              borderRadius: 8,
              marginTop: 20,
              padding: 8,
              marginBottom: 8,
            }}
            onChange={(e) => setClassName(e.target.value)}
          />

          <div style={{ display: "flex", gap: "20", marginTop: "40" }}>
            {selectedClass !== null ? (
              <CustomButton
                variant="submit"
                title="Update"
                disabled={className?.length === 0}
                onClick={() => callUpdateClass()}
              ></CustomButton>
            ) : (
              <CustomButton
                variant="submit"
                title="Submit"
                disabled={className?.length === 0}
                onClick={() => callCreateClass()}
              ></CustomButton>
            )}

            <CustomButton
              variant="cancel"
              title="Cancel"
              onClick={() => setOpenModal(false)}
            ></CustomButton>
          </div>
        </div>
      )}
      <div style={{ padding: 10 }}></div>
      <ol>
        {ClassList?.map((cl) => (
          <li
            key={cl.id}
            style={{
              color: "#f8f4f4",
              fontSize: 34,
              fontWeight: 600,
              padding: 5,
            }}
          >
            <a className="link" href={`/class/${cl?.id}`}>
              {cl?.name}
            </a>
            <div style={{ display: "flex" }}>
              <CustomButton
                variant="submit"
                title="Update Class"
                onClick={() => onUpdateClass(cl)}
              ></CustomButton>
              <CustomButton
                variant="delete"
                title="Delete Class"
                onClick={() => deleteClasses(cl)}
              ></CustomButton>
            </div>
          </li>
        ))}
      </ol>
      <div />
    </>
  );
}

export default ClassPage;
