import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Image, Button }from 'react-bootstrap';
import CreateDeck from '../decks/CreateDeck';
import './style.css';
import Deck from '../decks/Deck';
import AddCard from '../cards/AddCard';
import EditDeck from '../decks/EditDeck';
import EditCard from '../cards/EditCard';
import Study from '../cards/Study';
import eye from '../imgs/eye.png'
import add from '../imgs/add.png';
import trashcan from '../imgs/trashcan.png';
import book from '../imgs/book.png';
import { listDecks, deleteDeck } from '../utils/api/index';
let createDeckBtn;
function Layout() {
  const [decksList, setDecksList] = useState([]);
  const navigate = useNavigate();
  let decks;
  const abortController = new AbortController();
  const location = useLocation();
  useEffect(() => {
    async function getDecks() {
      const listOfDecks = await listDecks(abortController.signal);
      setDecksList(listOfDecks);
    } getDecks();
  });
function HandleDeleteDeck(deckId) {
  const confirm = window.confirm("Delete this deck?\n You will not be able to recover it.");
  if (confirm === true)  {
    async function deleteAndUpdateDecks() {
    const deckToDelete = await deleteDeck(deckId, abortController.signal);
    const listOfDecks = await listDecks(abortController.signal);
    setDecksList(listOfDecks);
  } deleteAndUpdateDecks();
}
  }

if (location.pathname === "/") {
  createDeckBtn = <Button type="button" variant="secondary" className="create-deck-btn" onClick={() => navigate("/decks/new")} >
    <Image src={add} className="add-img" />
    Create Deck</Button>
  decks = decksList.map((deck, index) => (
    <div className="deck-div" key={index} >
      <div className="header-card-count-div">
        <h2 className="deck-title">{deck.name}</h2>
        <h5 className="card-count-div">{deck.cards.length} cards</h5>
      </div>
      <p className="deck-description">{deck.description}</p>
    <div className="btns-div">
      <Button variant="secondary" type="button" className="Layout-index-view-deck-btn" onClick={() => navigate(`/decks/${deck.id}`)} >
        <Image src={eye} className="eye-img" />
          View</Button> 
        <Button type="button" variant="primary" className="Layout-index-study-deck-btn" onClick={() => navigate(`/decks/${deck.id}/study`)} >
            <Image src={book} className="book-img" />
              Study</Button>
          <Button variant="danger" type="button" className="Layout-index-delete-deck-btn" value={index} onClick={ () => HandleDeleteDeck(deck.id)}>
            <Image src={trashcan} className="trashcan-img" />
          </Button>    
  </div>
</div>
));
} else {
  createDeckBtn = null;
  decks = null;
}

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
          {createDeckBtn}
          {decks}
          <Routes>
            <Route path="/" element={Layout} />
            <Route path="/decks/:deckId/study" element={<Study />} />
            <Route path="/decks/new" element={<CreateDeck />} />
            <Route path="/decks/:deckId" element={<Deck />} />
            <Route path="/decks/:deckId/edit" element={<EditDeck />} />
            <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>      
    </>
  );
}

export default Layout;
