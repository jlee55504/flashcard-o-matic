/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useEffect, useState } from 'react';
/* Imports the 'useParams' and the 'useNavigate' 'components' from 
'react-router-dom'. */
import { useParams, useNavigate } from 'react-router-dom';
/* Imports the "createCard", "updateCard", and the "readCard" 'functions/components'
from '../utils/api/index.js'. */
import { readCard, updateCard, createCard } from '../utils/api/index';

import Button from 'react-bootstrap/Button';
/* The "AddEditCards" 'function/component' handles returns a 'form JSX element' for 
the "src/cards/AddCard.js" and "src/cards/EditCard.js" 'files/components' and handles 
both of their functionality. */
function AddEditCards() {
  const { deckId, cardId } = useParams();
  /* The "card" 'variable' and the "setCard" 'function' are 'declared' using the 
  'useState' (which is set to an empty 'string' ("")). */
  const [ card, setCard ] = useState( [] );
  /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
  const [ frontCardText, setFrontCardText ] = useState( "" );
  /* The "backCardText" 'variable' and the "setBackCardText" 'function' are 
  'declared' using the 'useState' (which is set to an empty 'string' ("")). */
  const [ backCardText, setBackCardText ] = useState( "" );
  /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
  const navigate = useNavigate();

  const [ waitToAddCard, setWaitToAddCard ] = useState( false );
  /* The "abortcontroller" holds a 'new AbortController' 'method'. */
  const abortController = new AbortController();

  const [updateEditCardText, setUpdateEditCardText] = useState(false);

  /* The "waitForCardToUpdate" 'variable' and the "setWaitForCardToUpdate" 
  'function' are 'declared' using the 'useState' (which is set to 'false'). */
  const [ waitForCardToUpdate, setWaitForCardToUpdate ] = useState( false ); 
  
  useEffect(() => { 
    if ( cardId ) {  
      async function displayEditCardText() {
        try { 
          setUpdateEditCardText( true )
        } catch ( error ) { 
            console.error( error ); 
          } 
      } displayEditCardText();
        return () => abortController.abort();
    } else return;
  }, [ deckId ]);

  useEffect(() => { 
    if ( cardId ) {   
      async function getCard() { 
        try { 
          const currentCard = await readCard( cardId, abortController.signal );
          setCard( currentCard ); 
          setFrontCardText( currentCard.front );
          setBackCardText( currentCard.back );
        } catch ( error ) { 
              console.error( error ); 
          } 
      } getCard(); 
        return () => abortController.abort();
    } else return;
  }, [ updateEditCardText ]);

  useEffect(() => {  
    if ( waitToAddCard && !cardId ) { 
      async function createCardData() { 
        try { 
          await createCard( deckId, { front: frontCardText, back: backCardText, }, abortController.signal );
          setFrontCardText( "" );
          setBackCardText( "" );
          setWaitToAddCard( false );
        } catch ( error ) { 
            console.error( error ); 
          }
      } createCardData(); 
    } return () => abortController.abort();
  }, [ waitToAddCard ]);

  useEffect(() => { 
    if ( waitForCardToUpdate && cardId ) {  
      async function updateCardData() { 
        try { 
          await updateCard( card, abortController.signal );
          setWaitForCardToUpdate( false );
          setFrontCardText( "" );
          setBackCardText( "" );
          navigate(`/decks/${ deckId }`);
        } catch ( error ) { 
            console.error( error ); 
          }
      } updateCardData(); 
    } return () => abortController.abort();
  }, [ waitForCardToUpdate, navigate, card, deckId ]);

  /* The "handleChange" 'function' takes an 'object' 'parameter' named 
  "target" and checks if the "cardId" 'variable's' 'value' is 'truthy'. 
  If so, the functionality used to handle the "src/cards/EditCard.js" 
  'file/component' runs. Otherwise, the code used to handle the 
  "src/cards/AddCard.js" 'file's/component's' functionality is run. */
  const handleChange = ( { target } ) => {
    if( cardId ) {
      if ( target.name === "EditCard-front-text" ) setFrontCardText( target.value );
      else if ( target.name === "EditCard-back-text" ) setBackCardText( target.value );
    } else {
        if ( target.name === "AddCard-front-text" ) setFrontCardText( target.value );
        else if ( target.name === "AddCard-back-text" ) setBackCardText( target.value );
      }
  }
  /* The "handleSubmit" 'function' takes a 'parameter' named "event". The 
  'method' 'preventDefault' is 'called' with the "event" 'parameter'. Then, 
  the "cardId" 'variable's' is checked for a 'truthy value'.If so, the 
  functionality used to handle the "src/cards/EditCard.js" 'file/component' 
  runs. Otherwise, the code used to handle the "src/cards/AddCard.js" 
  'file's/component's' functionality is run. */
  const handleSubmit = event => { 
    event.preventDefault();
    if ( cardId ) {
      setCard( { id: Number( card.id ), front: frontCardText, back: backCardText, 
      deckId: Number( card.deckId ), 
      }); 
      setWaitForCardToUpdate( true );
    } else setWaitToAddCard( true ); 
  };

  /* A 'form JSX element' is returned with 'attribute values' based on the 
  'value' of the "cardId" 'variable'. */
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor={ cardId ? "EditCard-front-text" : 'AddCard-front-text' } className={ cardId ? 
        'EditCard-front-text-label' : ""} >
        Front
        <textarea id={ cardId ? "EditCard-front-text" : "AddCard-front-text" } 
          name={ cardId ? "EditCard-front-text" : "AddCard-front-text" }
          placeholder={ cardId ? card.front : 'Front side of card' }
          onChange={ handleChange } value={ frontCardText } required ></textarea>
      </label>
      <label htmlFor={ cardId ? "EditCard-back-text" : 'AddCard-back-text' } >
        Back
        <textarea id={ cardId ? "EditCard-back-text" : "AddCard-back-text" } 
        name={ cardId ? "EditCard-back-text" : "AddCard-back-text" }
        placeholder={ cardId ? card.front : 'Back side of card' } 
        onChange={ handleChange } value={ backCardText } required />
      </label>
      <Button type="button" variant='secondary' className={ cardId ? "EditCard-cancel-btn" : 
        'AddCard-done-btn' } onClick={ () => navigate(`/decks/${ deckId }`) } >Cancel</Button>
      <Button type="submit" variant="primary" className={ cardId ? "EditCard-submit-btn btn btn-primary" : 
        'AddCard-submit-btn' } >Submit</Button>
    </form>
  );
 }

/* Exports the "AddEditCards" 'function/component'. */
export default AddEditCards;