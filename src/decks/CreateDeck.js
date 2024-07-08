/* Imports 'React' and the 'useState' 'component' from 'react'. */
import React, { useState } from 'react';
/* Imports the 'Link', and the 'useNavigate' 'components' from 'react-router-dom'. */
import {Link, useNavigate } from 'react-router-dom';
/* Imports "readDeck", the "createDeck" 'function/component' from 
'../utils/api/index.js'. */
import { createDeck } from '../utils/api/index';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
import { Button, Image } from 'react-bootstrap';
import home from '../imgs/home.png';

/* The "CreateDeck" 'function/component' displays the "nav-bar" 'div' containing 
a 'link' to the "Home page" ('src/Layout/index.js') and a 'form' allowing users 
to 'create' a new "deck" and add it to the 'local server'.  */
function CreateDeck() {
    /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
    const navigate = useNavigate();
    /* The "name" 'variable' and the "setName" 'function' are 'declared' using 
    the 'useState' 'component' with an empty 'string' ("") as its argument. */
    const [ name, setName ] = useState( "" );
    /* The "description" 'variable' and the "setDescription" 'function' are 
    'declared' using the 'useState' 'component' with an empty 'string' ("") as its
    argument. */
    const [ description, setDescription ] = useState( "" );
  
    /* The "handleChange" 'function' takes an 'object' named "target" as its 
    'parameter'. An 'if statement' first checks if the "target's" 'name' 
    'attribute' 'value' is "CreateDeck-name". If so, the "setName" 'function' is 
    'called' with the "target" 'parameter's' current 'value' as an 'argument'. 
    If the "target's" 'name' 'attribute' 'value' is "CreateDeck-description", the
    "setDescription" 'function' is 'called' with the "target" 'parameter's' current 
    'value' as an 'argument'. */
    const handleChange = ({ target }) => {
      if ( target.name === "CreateDeck-name" ) setName( target.value );
      else if ( target.name === "CreateDeck-description" ) setDescription( target.value );
      }
  
    /* The "handleSubmit" 'function' takes a 'parameter' named "event". The 
    'preventDefault' 'method' is 'called' with the "event" 'parameter' to prevent 
    the web page from 'reloading'. The "abortcontroller" 'variable' holds a 'new 
    AbortController' 'method' and the "newDeck" 'variable' holds an 'object' with 
    a "name" 'key' and  the "name" 'variable' as its 'value' and a "description" 
    'key' with the "description" 'variable' as its 'value'. The "createNewDeck" 
    'async function' is 'called' and the "createDeck" 'function' is then 'called' 
    with the "newDeck" 'variable' and "abortController.signal" as its 'arguments'. 
    The "setName" and "setDescription" 'functions' are 'called' with empty 'strings' 
    ("") for their 'arguments'. Finally, an 'abortController.abort method' is 
    'returned'. */
    const handleSubmit = ( event ) => {
      event.preventDefault();
      const abortController = new AbortController();
      const newDeck = { name: name, description: description, };
      async function createNewDeck() {
        try {
          await createDeck( newDeck, abortController.signal );
          setName( "" );
          setDescription( "" );
        } catch ( error ) {
            console.log( error );
          }
      } createNewDeck();
        return () => abortController.abort();
    }
      
    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
    an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
    " / ", a 'Link' JSX 'element' to the specified "deck's" "Deck.js" page,
    and the text "/Create Deck" followed by a JSX 'h1' 'element' with the 'text' 
    "Edit Deck" followed by a 'form' 'element' (with the "handleSubmit" 
    'function' as the 'value' for its 'onSubmit' 'attribute') with two 'label' 
    JSX 'elements', a 'text input' JSX 'element', a 'textarea' JSX 'element', and
    two 'button' JSX 'elements' (the first has the 'text' "Cancel" while the 
    other has the 'text' "Submit"). Both the 'text' and 'textarea' have the 
    "handleChange" 'function' for its 'onChange' 'attribute'. The first 'button'
    JSX 'element's' 'onClick' 'attribute' has the "navigate" 'variable' for its
    value with "/" as its 'argument'. */
    return (
      <div>
        <div className='nav-bar'><Link to="/" className='home-link' >
          <Image src={ home } 
          alt="home" className='home-icon'/>
            Home</Link> / Create Deck</div>
        <h1 className='CreateDeck-create-deck-h1'>Create Deck</h1>
        <form onSubmit={ handleSubmit }>
          <label htmlFor='CreateDeck-name'>
            Name
            <input type='text' name="CreateDeck-name" id="CreateDeck-name" placeholder='Deck Name' 
            onChange={ handleChange } value={ name } required />
          </label>
          <label htmlFor='CreateDeck-description'>
            Description
            <textarea id="CreateDeck-description" name="CreateDeck-description" 
            placeholder='Brief description of the deck' onChange={ handleChange } 
            value={ description } required >
            </textarea>
          </label>
          <Button type='button' className='CreateDeck-cancel-btn' variant='secondary'
          onClick={ () => navigate("/") }>Cancel
          </Button>
          <Button type='submit' className='CreateDeck-submit-btn' variant='primary' >Submit
          </Button>
        </form>
      </div>
      );
  }
  
  /* Exports the "CreateDeck" 'function/component' */
  export default CreateDeck;