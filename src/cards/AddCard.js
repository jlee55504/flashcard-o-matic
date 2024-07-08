/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useEffect, useState } from 'react';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
/* Imports the 'useParams', 'Link', 'Routes', and the 'Route' 'components' from 
'react-router-dom'. */
import { useParams, Link, Routes, Route } from 'react-router-dom';
/* Imports the "readDeck" 'function/component' from '../utils/api/index.js'. */
import { readDeck } from '../utils/api/index';
import Image from 'react-bootstrap/Image';
import home from '../imgs/home.png';
import AddEditCards from './AddEditCards';
/* The "AddCard" 'function/component' allows users to add a "card" to the 
specific "deck" and 'local server'. */
function AddCard() {
  /* The "deckId" 'variable' is extracted using the 'useParams' 'component'. */
  const { deckId } = useParams();
  /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
  using the 'useState' (which is set to an empty 'string' ("")). */
  const [ deckName, setDeckName ] = useState( "" );
  /* The "abortcontroller" holds a 'new AbortController' 'method'. */
  const abortController = new AbortController();

  useEffect(() => {    
    async function getDeck() {
        try {
          const selectedDeck = await readDeck( deckId, abortController.signal );
          setDeckName( selectedDeck.name );
        } catch ( error ) { 
            console.error( error ); 
          } 
    } getDeck();
      return () => abortController.abort(); 
  }, [ deckName ]);

  /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
  contains a 'Link' JSX 'component' (which brings users to the "Home page") with
  an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
  " / ", a 'Link' JSX 'element' to the  the 'link' to the "Deck.js" 
  'file' that displays the current "deck", and the 'text' " / Add Card ". 
  Two 'h2' JSX 'elements' follow the "nav-bar" 'div'. The first displays the 
  'value' of the "deckName" 'variable'. The second displays the 'text' 
  "Add Card". A 'Routes' and 'Route' 'component' display the "AddEdditCards.js"
  'file/component' which handles the "AddCard.js" 'file's/component's functionality'. */
  return (
    <div>
      <div className='nav-bar'><Link to="/" className='home-link' >
        <Image src={ home }
        alt="home" className='home-icon'/>Home </Link> / <Link to={`/decks/${ deckId }`}> { deckName }</Link> / Add Card</div>
      <h2 className='AddCard-deck-name-h2'> { deckName }: </h2><h2 className='AddCard-add-card-h2'> Add Card</h2>
      <Routes>
        <Route path="/new/*" element={<AddEditCards />} />
      </Routes>
    </div>
  );
}

/* Exports the "AddCard" 'function/component'. */
export default AddCard;