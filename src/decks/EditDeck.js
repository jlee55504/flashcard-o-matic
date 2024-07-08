/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useState, useEffect } from 'react';
/* Imports the 'useParams', 'Link', and the 'useNavigate' 'components' from 
'react-router-dom'. */
import { useParams, useNavigate, Link } from 'react-router-dom';
/* Imports the "readDeck" and the "updateDeck" 'functions/components' from 
'../utils/api/index.js'. */
import { readDeck, updateDeck } from '../utils/api/index';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
import { Image, Button } from 'react-bootstrap';
import home from '../imgs/home.png';

/* The "EditDeck" 'function/component' displays the "nav-bar" 'div', (which 
contains 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" (which 
displays the specified "decks" info), and a 'form' allowing users to 'edit' and 
'update' the info of the specified "deck" on the 'local server'. */
function EditDeck() {
    /* The 'useParams' 'component' is used to 'extract' the "deckId" 'variable.' */
    const { deckId } = useParams();
    /* The "deck"'variable' and the "setDeck" 'function' are 'declared' using the
    'useState' (which is set to an empty 'object' ('{}'). */
    const [ deck, setDeck ] = useState( {} );
    /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
    using the 'useState' (which is set to an empty 'string' ("")). */
    const [ deckName, setDeckName ] = useState( "" );
    /* The "deckDescription" 'variable' and the "setDeckDescription" 'function' 
    are 'declared' using the 'useState' (which is set to an empty 'string' (""). */
    const [ deckDescription, setDeckDescription ] = useState( "" );
    /* The "waitForDeckToUpdate" 'variable' and the "setWaitForDeckToUpdate" 
    'function' are 'declared' using the 'useState' (which is set to 'false'). */
    const [ waitForDeckToUpdate, setWaitForDeckToUpdate ] = useState( false );
    const [ loadDeckInfo, setLoadDeckInfo ] = useState( false );
    /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */ 
    const navigate = useNavigate();
    /* The "abortController" 'variable' holds a 'new' 'AbortController' 'method'. */
    const abortController = new AbortController();
   
    useEffect(() => {
      async function loadTheDeckInfo() {
        try {
          setLoadDeckInfo( true );
        } catch ( error ) {
              console.log( error );
          }
      } loadTheDeckInfo();
        return () => abortController.abort();
    }, [ deckId ])
  
    useEffect(() => { 
      async function getDeck() {
        try {
          const currentDeck = await readDeck( deckId, abortController.signal );
          setDeck( currentDeck );
          setDeckName( currentDeck.name );
          setDeckDescription( currentDeck.description );
        } catch ( error ) {
              console.log( error );
          }
      } getDeck();
       return () => abortController.abort();
      }, [ loadDeckInfo ]);
  
    /* When the "waitForDeckToUpdate" 'variable' changes, a 'useEffect' 
    'component' runs checking if the "deck" 'variable' if 'falsey'. If so, 
    'return' is returned. If "waitForDeckToUpdate" is 'true'and the "deck" 
    'variable' is not an empty 'object', the "updateTheDeck" 'async function'
     is using a 'try/catch statement' and the "updateDeck" 'function' is 
     called with the "deck" 'variable' and "abortController.signal" as its 
     'arguments' and 'sets' the "waitForDeckToUpdate" 'variable' to 'false'. 
     Finally, an 'abortController.abort method' is 'returned'. */
    useEffect(() => {
      if ( !waitForDeckToUpdate ) return;
      else if ( waitForDeckToUpdate === true && deck != {} ) {
        async function updateTheDeck() {
          try { 
            await updateDeck( deck, abortController.signal );
            setWaitForDeckToUpdate( false );
          } catch ( error ) {
              console.log( error );
            }
        } updateTheDeck();
      } return ()=> abortController.abort();
    }, [ waitForDeckToUpdate ] ); 
      
    /* The "handleChange" 'function' uses a "target" 'object' 'parameter' and
    holds the data inputted by the user in the "deckName" and the 
    "deckDescription" 'variables' using the "setDeckName" and the 
    "setDeckDescription" 'functions'. */
    const handleChange = ( { target } ) => {
      if ( target.name === "EditDeck-deck-name" ) setDeckName( target.value );
      else if ( target.name === "EditDeck-deck-description" ) setDeckDescription( target.value );
    }
    /* The "handleSubmit" 'function' 'fires' when the user clicks the "Submit" 
    'button' JSX 'element', the "handleSubmit" 'function' 'fires' 'setting' the 
    "deck" 'variable' with the data input by the user with the "setDeck" 
    'function' (with the original "deck's" "id" as a 'key/value', a "name" 'key'
    with the "deckName" 'variable' as its 'value', and a "description" 'key' 
    with the "deckDescription" 'variable' as its 'value'), sets the 
    "waitForDeckToUpdate" 'variable' to 'true' with the "setWaitForDeckToUpdate" 
    'function', and 'sets' the "deckName" and "deckDescription" 'variables' to an
    empty 'string' ("") with the "setDeckName" and the "setDeckDescription" 
    'function'. */
    function handleSubmit( event ) {
      event.preventDefault(); 
      setDeck( {
        id: Number( deck.id ),    
        name: deckName,
        description: deckDescription,
      } );
      setWaitForDeckToUpdate( true );  
      // setDeckName("");
      // setDeckDescription("");         
    }
    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
    an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
    " / ", a 'Link' JSX 'element' to the specified "deck's" "Deck.js" page, and 
    the text "/Edit Deck" followed by a JSX 'h1' 'element' with the 'text' "Edit
    Deck" followed by a 'form' 'element' (with the "handleSubmit" 'function' as
    the 'value' for its 'onSubmit' 'attribute') with two 'label' JSX 'elements'
    , a 'text input' JSX 'element', a 'textarea' JSX 'element', and two 
    'button' JSX 'elements'. Both the 'text' and 'textarea' have the 
    "handleChange" 'function' for its 'onChange' 'attribute'. */
    return (
      <div>
        <div className='nav-bar'><Link to="/" className='home-link' >
          <Image src={ home } 
          alt="home" className='home-icon'/>
            Home</Link> / <Link to={`/decks/${ deckId }`}>{ deck.name }</Link> / Edit Deck</div>
        <h1>Edit Deck</h1>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="EditDeck-deck-name" >
            Name
            <input type="text" id="EditDeck-deck-name" name="EditDeck-deck-name" 
            placeholder={ deck.name } 
            onChange={ handleChange } required value={ deckName } >
            </input>
          </label>
          <label htmlFor="EditDeck-deck-description" >
            Description
            <textarea id="EditDeck-deck-description" name="EditDeck-deck-description"
            placeholder={ deck.description } 
            onChange={ handleChange } required value={ deckDescription } >
            </textarea>
            <Button type="button" variant="secondary" 
            className="EditDeck-cancel-btn" onClick={ () => navigate(`/decks/${ deckId }`) } >
              Cancel
            </Button>
            <Button type="submit" variant="primary" 
            className="EditDeck-submit-btn" >Submit</Button>
          </label>
        </form>
      </div>
    );
  }
  
  /* Exports the "EditDeck" 'function/component'. */
  export default EditDeck;