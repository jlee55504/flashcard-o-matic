/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useState, useEffect } from 'react';
/* Imports the 'useParams', the 'Link', the 'Routes', and the 'Route' 'components' from 
'react-router-dom'. */
import { useParams, Link, Routes, Route } from 'react-router-dom';
/* Imports the "readDeck"'function/component' from '../utils/api/index.js'. */
import { readDeck } from '../utils/api/index';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
import { Image } from 'react-bootstrap';
import AddEditCards from './AddEditCards';
import home from '../imgs/home.png';

/* The "EditCard" 'function/component' displays the "nav-bar" 'div'. which 
(contains a 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" 
(which displays the specified "decks" info) and uses the "AddEditCards.js" 
'file/component' to handle the "EditCard" 'function's/component's' functionality.
 */
function EditCard() {
    /* The "deckId" and the "cardId" 'variables' are extracted using the 'useParams'
    'component'. */
    const { deckId, cardId } = useParams();
    /* The "deck" 'variable' and the "setDeck" 'function' are declared 
    using the 'useState' 'component' with an empty 'array' ('[]') as its argument. */
    const [ deck, setDeck ] = useState( [] );
    /* The "abortcontroller" holds a 'new AbortController' 'method'. */
    const abortController = new AbortController();
    
    const [ waitforDeckHeader, setWaitForDeckHeader ] = useState( false );
   
    useEffect(() => {
      async function updateDeckHeader() {
        try {
          setWaitForDeckHeader( true );
        } catch ( error ) {
            console.log( error )
          } 
      } updateDeckHeader();
        return abortController.abort();
    },[ deckId ])
  
    useEffect(() => { 
      async function getDeck() {
        try { 
          const currentDeck = await readDeck( deckId, abortController.signal );
          setDeck( currentDeck );
        } catch ( error ) { 
            console.error( error ); 
          } 
      } getDeck(); 
        return () => abortController.abort();
    }, [ waitforDeckHeader ]);
  
    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
    an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
    " / ", a 'Link' JSX 'element' to the  the 'link' to the "Deck.js" 
    'file' that displays the current "deck", and the 'text' " / Edit Card ", plus 
    the "card" 'variable's' "id" 'key' 'value', an 'h1' JSX 'element' with the 
    'text' "Edit Card". A 'Routes' and 'Route' 'component' are used to display the 
    "AddEdditCards.js" 'file/component' which handles the "EditCard.js" 'file's/component's 
    functionality'. */
    return (
      <div>   
        <div className='nav-bar'><Link to="/" className='home-link' >
        <Image src={ home }
        alt="home" className='home-icon'/>
        Home</Link> / <Link to={`/decks/${ deckId }`}>Deck { deck.name }</Link> / Edit Card { cardId }</div>
        <h1>Edit Card</h1>
        <Routes>
          <Route path="/edit/*" element={<AddEditCards />} />
        </Routes>
      </div>
      );
  }
  
  /* Exports the "EditCard" 'function/component'. */
  export default EditCard;