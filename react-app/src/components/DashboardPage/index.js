import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function DashboardPage() {
  const dispatch = useDispatch();
  
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <h1>Dashboard</h1>
      - To do: Create class button (On click it will open create-class modal)
      - To do: list of classes (On click it will redirect to deck page for that class)
    </>
  );
}

export default DashboardPage;
