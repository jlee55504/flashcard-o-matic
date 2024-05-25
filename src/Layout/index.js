import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CreateDeck from '../decks/CreateDeck';
import './style.css';
import Card from 'react-bootstrap/Card';
import AddCard from '../cards/AddCard';
import Study from '../cards/Study';
import eye from '../imgs/eye.png'
import add from '../imgs/add.png';
import trashcan from '../imgs/trashcan.png';
import book from '../imgs/book.png';
import { createDeck, updateDeck, listDecks, deleteDeck } from '../utils/api/index';

function Layout() {
  const [decksList, setDecksList] = useState([]);
  const navigate = useNavigate();
  //let deckIdToDelete;
  let decks;
  useEffect(() => {
   async function getDecks() {
    const listOfDecks = await listDecks();
    setDecksList(listOfDecks);
    } getDecks();
  }, [])

  const location = useLocation();
  
function HandleDeleteDeck(event) {
 const deckIdToDelete = event;
  console.log(deckIdToDelete);
  const confirm = window.confirm("Delete this deck?\n You will not be able to recover it.");
  if (confirm == false) return
  else {
    async function deleteAndUpdateDecks() {
    const deckToDelete = await deleteDeck(deckIdToDelete);
    const listOfDecks = await listDecks();
    setDecksList(listOfDecks);
  } deleteAndUpdateDecks();}
  }
  /*
  for (let i = 0; i < list.length; i++ ) {
  for (let j = 0; j < list[i].cards.length; j++) {
    const currentCard = list[i].cards[j];
    console.log(currentCard);
    //console.log(list.map((deck, index) => console.log(deck.cards[currentCard])));
  }
}
  
 

  */
if (location.pathname === "/") {
  decks = decksList.map((deck, index) => (
  <div className="deck-div" key={index} >
  <div className="header-card-count-div">
  <h2 className="deck-title">{deck.name}</h2>
          <h5 className="card-count-div">{deck.cards.length} cards</h5>
  </div>
  <p className="deck-description">{deck.description}</p>
  <div className="btns-div">
  <Button variant="secondary" type="button" className="view-link" >
              <Image src={eye} className="eye-logo" />
              View</Button> 
        <Button type="button" variant="primary" className="study-link" onClick={() => navigate(`/decks/${deck.id}/study`)} >
              <Image src={book} />
            Study</Button>
              <Button variant="danger" type="button" value={index} onClick={ () => HandleDeleteDeck(deck.id)}>
              <Image src={trashcan} className="trashcan-img" />
          </Button>    
  </div>
</div>))
} else decks = null;
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        {/*<Button variant="secondary" className="create-deck-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
          Create Deck</Button>*/}
          <Button type="button" variant="secondary" className="create-deck-btn" onClick={() => navigate("/decks/new")} >
          <Image src={add} className="add-icon" />
          Create Deck</Button>
          {/*<Card className="card">
            <Card.Body>
              <div className="a">
              <Card.Title>Rendering in React</Card.Title>
              <div className="card-count-div">3 cards</div>
              </div>
              <Card.Text>React's component structure allows for quickly building
                 a complex web application that relies on DOM manipulation.
              </Card.Text>
              <div className="btns-div">
              {/* <Button variant="secondary" className="view-btn" >
                <Image src={eye} className="eye-logo" />
                View</Button> 

                <Link className="view-link" >
                <Image src={eye} className="eye-logo" />
                  View</Link>
              {/*<Button variant="primary" className="study-btn" >
                <Image src={book} />
              Study</Button>
                <Link className="study-link" >
                <Image src={book} />
                Study</Link>
              {/*<Button variant="danger" className="trashcan-link" >
                <Image src={trashcan} className="trashcan-img" />
            </Button>
              <Link className="trashcan-link" >
              <Image src={trashcan} className="trashcan-img" />
              </Link>

              </div>
            </Card.Body>
          </Card>

          
          */}
          {decks}
          {/* <div className="deck-div">
            <div className="header-card-count-div">
            <h2 className="deck-title">Rendering in React</h2>
            <h5 className="card-count-div">3 cards</h5>
            </div>
            <p className="deck-description">React's component structure allows for quickly building
                 a complex web application that relies on DOM manipulation.</p>
                 <div className="btns-div">
           
              
              <Button variant="secondary" className="view-link" >
                <Image src={eye} className="eye-logo" />
                View</Button> 

<Button variant="primary" className="study-link" >
                <Image src={book} />
              Study</Button>

              <Button variant="danger" >
                <Image src={trashcan} className="trashcan-img" />
            </Button>
              </div>
          </div>*/}

          <Routes>
          <Route path="/" element={Layout} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
        </Routes>
      </div>
      
    </>
  );
}

export default Layout;
