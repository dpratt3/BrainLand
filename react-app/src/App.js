import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import CategoryPage from "./components/CategoryPage";
import DeckPage from "./components/DeckPage";
import CardPage from "./components/CardPage";
import ClassPage from "./components/ClassPage";
import PlayDeck from "./components/PlayDeck";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route path="/category">
            <CategoryPage />
          </Route> */}
          <Route exact path="/class">
            <ClassPage />
          </Route>
          <Route path="/class/:classId">
            <DeckPage />
          </Route>
          <Route path="/deck/:deckId">
            <CardPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/play/:deckId">
            <PlayDeck />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
