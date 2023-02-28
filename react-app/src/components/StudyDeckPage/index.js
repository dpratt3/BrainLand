import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function StudyDeckPage() {
  const dispatch = useDispatch();
  // retrieve class_id from url because you are routed here after clicking on class name

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
     To do: show questions one by one, track progress, and store progress for a particular user.
    </>
  );
}

export default StudyDeckPage;
