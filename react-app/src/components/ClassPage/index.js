import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listClass } from "../../store/classes";

function ClassPage() {
  const dispatch = useDispatch();
  const ClassList = useSelector((state) => state?.classes?.class || []);

  useEffect(() => {
    dispatch(listClass());
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1>Classes</h1>
      {/* - To Do: Create decks button (On click it will open create deck modal (ambitions) or form (conservative)
      - To Do: List of decks for selected class ( on right side there will be two buttons, 1. Add Cards, 2. Study deck) */}

      <ul>
        {ClassList?.map((cl) => (
          <li key={cl.id}>
            <a href={`/class/${cl?.id}`}>{cl?.name}</a>
          </li>
        ))}
      </ul>

      <button>Create Class</button>
    </>
  );
}

export default ClassPage;
