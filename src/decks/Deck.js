/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, {useState, useEffect} from 'react';
/* Imports the 'useParams', 'Link', and the 'useNavigate' 'components' from 
'react-router-dom'. */
import {useNavigate, useParams, Link } from 'react-router-dom';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
/* Imports the "readDeck", the "deleteCard" and the "deleteDeck" 
'functions/components' from '../utils/api/index.js'. */
import { readDeck, deleteCard, deleteDeck } from '../utils/api/index';
import { Button, Image } from 'react-bootstrap';
import edit from '../imgs/edit.png';
import book from '../imgs/book.png';
import add from '../imgs/add.png';
import trashcan from '../imgs/trashcan.png';
import home from '../imgs/home.png';

/* The "Deck" 'function/component' displays the the "nav-bar" 'div' (which 
contains a 'link' to the "Home page" ('src/Layout/index.js')), the info for 
the specified "deck", 'button' JSX 'elements' to 'edit' ('EditDeck.js'), 
'study' ('Study.js'), 'add cards to the specified "deck"' ('AddCards.js'), the
info from every "card" in the specified "deck", and 'button' JSX 'elements' 
to 'edit' ('EditCard.js') or 'delete' the specified "card" from the specified 
"deck". */
function Deck() {
    /* The "deckId" 'variable' is extracted using the 'useParams' 'component'. */
    const { deckId } = useParams();
    /* The "deckCards" 'variable' and the "setDeckCards" 'function' are declared 
    using the 'useState' 'component' with an empty 'array' ('[]') as its argument. */
    const [ deckCards, setDeckCards ] = useState( [] );
    /* The "updateCardList" 'variable' and the "setUpdateCardList" 'function' are
    declared using the 'useState' 'component' with 'false' as its argument. */
    const [ updateCardList, setUpdateCardList ] = useState( false );
    /* The "deck" 'variable' and the "setDeck" 'function' are declared 
    using the 'useState' 'component' with an empty 'object' ('{}') as its argument. */
    const [ deck, setDeck ] = useState( {} );
    /* The "navigate" 'variable' holde the 'useNavigate' 'component'. */
    const navigate = useNavigate();
    /* The "abortcontroller" holds a 'new AbortController' 'method'. */
    const abortController = new AbortController();
    const [loadDeckInfo, setLoadDeckInfo] = useState( false );
  
    useEffect(() => {
      async function loadTheDeckInfo() {
        try {
          setLoadDeckInfo( true );
        } catch ( error ) {
            console.log( error );
          }
      } loadTheDeckInfo();
        return () => abortController.abort();
    }, [ deckId ] )
  
    /* This 'useEffect' 'component' runs every time the "loadDeckInfo" and 
    "updateCardList" 'variables' change using the 'async function' "getDeck" 
    which uses a 'try/catch statement' and calls the "readDeck" 
    'function/component' using 'await' with the "deckId" 'variable' and 
    "abortController.signal" as its arguments (which is stored in the 
    "seleckedDeck" 'variable'). The "deck" 'variable' is then 'set' with 
    data retrieved from the "selectedDeck" 'variable' with the "setDeck" 
    'function' and the "deckCards" 'variable' is set with the "cards" 'key'
    from the "selectedDeck" 'variable's' "cards" 'key' using the "setDeckCards" 
    'function'. If the "updateCardList" 'variable's' 'value' is 'truthy', the 
    "setUpdateCardList" 'function' sets it to 'false'. Finally, an 
    'abortController.abort method' is 'returned'. */
    useEffect(() => {
      async function getDeck() {
        try {
          const selectedDeck = await readDeck( deckId, abortController.signal );
          setDeck( selectedDeck );
          setDeckCards( selectedDeck.cards );
          if( updateCardList ) setUpdateCardList( false );
        } catch ( error ) {
            console.log( error );
          }
      } getDeck();
        return ()=> abortController.abort();
    }, [ loadDeckInfo, updateCardList ]);
  
    /* The "handleDeleteCard" 'function' takes a 'parameter' named "cardId"
    and 'window.confirm' screen displays 'text' confirming wanting to delete a 
    specific "card" (which is stored in the "confirm" 'variable'). If the 
    "confirm" 'variable' 'value' is 'true', the "deleteThecard" 'async function' 
    is run using a 'try/catch statement' is run and the "deleteCard" 
    'function/component' is 'called' using 'await' with the "cardId" 'parameter' 
    and "abortController.signal" as 'arguments', then the "setUpdateCardList" 
    'function' is 'called' with 'true' as its 'argument'. Finally, an 
    'abortController.abort method' is 'returned'. */
    const handleDeleteCard = ( cardId ) => {
      const confirm = window.confirm("Delete this card? \n You will not be able to recover it.");
      if ( confirm === true) {
        async function deleteTheCard() {
          try {
            await deleteCard( cardId, abortController.signal );   
            setUpdateCardList( true );
          } catch ( error ) {
              console.log( error );
            }
        } deleteTheCard();
          return ()=> abortController.abort();
      }
    }
  
    /* The "handleDeleteDeck" 'function' takes a 'parameter' named "deckId"
    and 'window.confirm' screen displays 'text' confirming wanting to delete a 
    specific "deck" (which is stored in the "confirm" 'variable'). If the 
    "confirm" 'variable' value is 'true', the "deleteTheDeck" 'async function' 
    is run using a 'try/catch statement' is run and the "deleteDeck" 
    'function/component' is 'called' using 'await' with the "deckId" 'parameter' 
    and "abortController.signal" as 'arguments', then the "navigate" 
    ('useNavigate' 'component') is called with "/" (the "Home page") as its 
    argument. Finally, an 'abortController.abort method' is 'returned'. */
    const handleDeleteDeck = ( deckId ) => {
        const confirm = window.confirm("Delete this deck? \n You will not be able to recover it.");
          if ( confirm === true ) {
              async function deleteTheDeck() {
              try {
                await deleteDeck( deckId, abortController.signal ); 
                navigate("/");
              } catch (error) {
                  console.log(error)
              }
          } deleteTheDeck();
          return () => abortController.abort();
          }
    }
  
    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
    an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
    " / ", then the "deck" 'variable's' "name" 'key' 'value' in 'text'. After 
    that, another 'div' JSX 'element' follows displaying the "deck" 'variable's' 
    "name" 'key' 'value', the "deck" 'variable's' "decription" 'key' 'value', and
    four 'button' JSX 'elements (all with 'img' JSX 'elements' inside). The 
    first displays the 'text' "Edit" with an 'onClick' 'attribute' with the 
    "navigate" 'variable' as its value with the 'text', "/decks/" plus the 
    'value' of the "deckId" 'variable', plus "/edit" as its argument. This 
    'link' will display the "EditDeck.js" 'file'. The second 'button' JSX 
    'element' displays the 'text' "Study" with an 'onClick' 'attribute' with the
    "navigate" 'variable' as its value with the 'text', "/decks/" plus the 
    'value' of the "deckId" 'variable', plus "/study" as its argument. This 
    'link' will display the "Study.js" 'file'. The third 'button' JSX 'element'
    displays the 'text' "Add Cards" with an 'onClick' 'attribute' with the 
    "navigate" 'variable' as its value with the 'text', "/decks/" plus the 
    'value' of the "deckId" 'variable', plus "/cards/new" as its argument. 
    This 'link' will display the "AddCards.js" 'file'. The final 'button' JSX
    'element' has an 'onClick' 'attribute' with the "deleteDeck" 'function' 
    as the 'value' with the "deckId" as the 'argument' for its value. After 
    this, an 'h2' JSX 'element' follows with the 'text' "Cards". If the 
    "deckCard's" value is 'truthy', a '.map' 'method' is run on the 
    "deckCards" 'variable' and returns a 'div' JSX 'element' that contains 
    every item in the "deckCards" 'variable's' "front" and 'backs' 'key's' 
    'value', and two 'button' JSX 'elements' (each with an 'img' JSX 
    'element' inside).  The first one has the 'text' "Edit" and an 
    'onChange' 'attribute' with the "navigate" 'varible' (with the 'text' 
    "/decks/", plus the "deckId" 'variable', plus "/cards/", plus the current
    item in the "deckCards" 'variable's' "id" 'key' 'value', followed by 
    "/edit") for its value. The second 'button' JSX 'element' has the 
    "handleDeleteDeck" 'function' (with the current item in the "deckCards" 
    'variable's' "id" 'key' 'value' for its 'argument') as the 'value' for 
    its 'onClick' 'attribute'. If the "deckCards" 'variable's' is 'falsey', an 
    empty 'div' JSX 'element' is 'returned' instead. */
    return (
      <div>
        <div className='nav-bar'><Link to="/" className='home-link' >
          <Image src={ home } 
          alt="home" className='home-icon' />
            Home</Link> / { deck.name }</div>
        <div className="Deck-select-deck-div">
          <h3>{ deck.name }</h3>
          <p>{ deck.description }</p>
          <div className="Deck-select-deck-btns-div">
            <Button type="button" className="Deck-edit-deck-btn" variant="secondary"
             onClick={ ()=> navigate(`/decks/${ deckId }/edit`) } >
              <Image src={ edit } 
              alt="edit--v1"/>
                Edit
            </Button>
            <Button type="button" variant="primary" className="Deck-study-deck-btn" 
            onClick={ ()=> navigate(`/decks/${ deckId }/study`) } >
              <Image src={ book } 
              alt="bookmark" className="book-img" />
                Study
            </Button>
            <Button type="button" className="Deck-add-cards-to-deck-btn" variant="primary"
            onClick={ ()=> navigate(`/decks/${ deckId }/cards/new`) } >
              <Image src={ add } className="add-img"
              alt="plus-math"/>
                Add Cards
            </Button>
            <Button type="button" className="Deck-delete-deck-btn" variant="danger"
            onClick={ () => handleDeleteDeck( deckId ) } >
              <Image src={ trashcan } 
              className="trashcan-img" alt="trash" />
            </Button>
          </div>
        </div>
        <h2>Cards</h2>
        {deckCards ? deckCards.map(( card, index ) => (
          <div className="Deck-card-div" key={ index } >
            <div className="Deck-card-div-front-div" >
              <p className="Deck-card-div-front-p" >{ card.front }</p>
            </div>
            <div className="Deck-card-div-back-div" >
              <p className="Deck-card-div-back-p" >{ card.back }</p>
              <div className="Deck-card-div-btns-div" >
                <Button variant="secondary" type="button" className="Deck-edit-card-btn" 
                onClick={ ()=> navigate(`/decks/${ deckId }/cards/${ card.id }/edit`) } >
                  <Image src={ edit }
                  alt="edit--v1"/>
                    Edit
                </Button>
                <Button variant="danger" type="button" className="Deck-delete-card-btn" 
                onClick={ () => handleDeleteCard( card.id ) } >
                  <Image src={ trashcan } className="trashcan-img"
                  alt="trash" />
                </Button>
              </div>
            </div>
          </div>
        )) : <></>}
      </div>
      );
  }
  
  /* Exports the "Deck" 'function/component'. */
  export default Deck;