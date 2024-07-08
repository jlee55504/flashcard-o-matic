/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useState, useEffect } from 'react';
/* Imports the 'useParams', 'Link', and the 'useNavigate' 'components' from 
'react-router-dom'. */
import { useParams, useNavigate, Link } from 'react-router-dom';
/* Imports the "readDeck" 'function/component' from '../utils/api/index.js'. */
import { readDeck } from '../utils/api/index';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
import { Button, Card, Image } from 'react-bootstrap';
import home from '../imgs/home.png';
import add from '../imgs/add.png';

/* The "Study" 'function/component' displays the "nav-bar" 'div' which (contains
a 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" (which 
displays the specified "decks" info) and the data of the "front" and "back" 
'keys' of the specified "deck" 'object', with the ability to 'redisplay' the 
"cards" after all the "cards" have been displayed or to go back to the "Home 
page" ('src/Layout/index.js'). */
function Study() {
    /* The "deckId" 'variable' is extracted using the 'useParams' 'component'. */
    const { deckId } = useParams();
    /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
    using the 'useState' (which is set to an empty 'string' ("")). */
    const [ deckName, setDeckName ] = useState( "" );
    /* The "deckCards" 'variable' and the "setDeckCards" 'function' are 'declared' 
    using the 'useState' (which is set to an empty 'array' ("[]"). */
    const [ deckCards, setDeckCards ] = useState( [] );
    /* The "currentCardNumber" 'variable' and the "setCurrentCardNumber" 
    'function' are 'declared' using the 'useState' (which is set to the 'Number' 
    "1"). */
    const [ currentCardNumber, setCurrentCardNumber ] = useState( 1 );
    /* The "currentCardIndex" 'variable' and the "setCurrentCardIndex" 
    'function' are 'declared' using the 'useState' (which is set to the 'Number' 
    "0"). */
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    /* The "currentCardText" 'variable' and the "setCurrentCardText" 'function' 
    are 'declared' using the 'useState' (which is set to an empty 'string' ("")). */
    const [ currentCardText, setCurrentCardText ] = useState( "" );
    /* The "isCardFlipped" 'variable' and the "setIsCardFlipped" 
    'function' are 'declared' using the 'useState' (which is set to 'false'). */
    const [ isCardFlipped, setIsCardFlipped ] = useState( false );
    /* The "firstFlip" 'variable' and the "setFirstFlip" 'function' are 'declared'
    using the 'useState' (which is set to 'false'). */
    const [ firstFlip, setFirstFlip ] = useState( false );
    /* The "sameCard" 'variable' and the "setSameCard" 'function' are 'declared'
    using the 'useState' (which is set to 'false'). */
    const [ sameCard, setSameCard ] = useState( false );
    /* The "buttonsToDisplay" 'variable' is 'declared' which will hold either a 
    'div' that contains two 'button' JSX 'elements' or one 'button' JSX 
    'element' depending on the 'value' of the "isCardFlipped" 'variable'. */
    let buttonsToDisplay;
    /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
    const navigate = useNavigate();
    const [ loadDeckInfo, setLoadDeckInfo ] = useState( false );
    /* The "abortcontroller" holds a 'new AbortController' 'method'. */
    const abortController = new AbortController();
    
    useEffect(() => {
      async function loadTheDeckInfo() {
        try {
          setLoadDeckInfo( true );
        } catch ( error ) {
            console.log( error )
          }
      } loadTheDeckInfo();
    }, [ deckId ])
  
    /* This 'useEffect' 'component' runs only once when the web page first 
    'loads'. The "abortcontroller" holds a 'new AbortController' 'method'. The 
    'async function' "getDeck" uses the "readDeck" with 'await' with the "deckId"
    'variable' and "abortController.signal" for 'arguments' (which is stored in 
    the "selectedDeck" 'variable'). An 'if statement' checks if the "loadDeckInfo" 
    'variable's' 'value' is 'truthy'. If so, a 'try/catch statement' is run and the 
    "setDeckName" is 'called' with the specific "deck" from the 'local host server' 
    (the "selectedDeck" 'variable's') "name" 'key' as its 'argument'. This will hold 
    the selected "deck's" "name" in the "deckName" 'variable'. Then, the "setDeckCards" 
    'function' is 'called' with the specific "deck" from the 'local host server'
    (the "selectedDeck" 'variable's') "cards" 'key'. This will hold the selected "deck's" 
    "cards" in the "deckCards" 'variable'. Finally, an 'abortController.abort method' is 
    'returned'. */
    useEffect(() => {
      async function getDeck() {
        if ( loadDeckInfo ) {
          try {
            const selectedDeck = await readDeck( deckId, abortController.signal );
            setDeckName( selectedDeck.name );
            setDeckCards( selectedDeck.cards );              
          } catch ( error ) {
              console.log( error );
            }
        } 
      } getDeck();
        return () => abortController.abort();
    }, [ loadDeckInfo ]);
  
    /* This 'useEffect' 'component' runs when the "deckCards" 'variable' or the 
    "currentCardIndex" 'variable' changes. An 'if statement' first checks if the 
    "deckCards" 'length' is equal to the number '0' (check if there are any 
    "cards/items"). If not, 'return' is 'returned' and the code ends. If the 
    "deckCards" 'length' is greater than the number '1' (there are "cards/items")
    and the "currentCardIndex" 'variable's' 'value' is equal to the number '0', 
    the "setCurrentCardText" 'function' is 'called' with the first "card/item" in
    the "deckCard" 'variable's' "front" 'key' 'value'. This 'useEffect' 
    'component' is used to display the first "card's" "front" 'text'. */
    useEffect(() => {
      if ( deckCards.length === 0 ) return;
      else if( deckCards.length > 0 && currentCardIndex === 0 ) {
        async function setCardText() {
          try {
            setCurrentCardText( deckCards[0].front );
          } catch ( error ) {
            console.log( error );
            }
        } setCardText();
      }
    }, [ deckCards, currentCardIndex ]);
  
    /* The "handleCardFlip" 'function' takes a 'default parameter' named 
    "dontFliCard" which is set to 'false'. If the "currentCardIndex" 'variable's'
    'value' minus the number '1' is equal to the "deckCards" 'variable's' 'length'
    minus the number '1' and the "dontFlipCard's" 'value' is equal to 'false', 
    a 'window.confirm' screen displays (which is stored in the "confirm" 
    'variable') asking if the user wants to 'restart' the "cards" (repeat 
    displaying the 'cards/items' in the "deckCards" 'variable'). If so, the 
    "currentCardIndex" 'variable's' 'value' is 'set' to the number '0' with the 
    "setCurrentCardIndex" 'function', the "currentCardNumber" 'variable' is 'set'
    to the number '1', and the "isCardFlipped" 'variable's' 'value' is 'set' to 
    'false' with the "setIsCardFlipped". If the "confirm" 'variable's' 'value' is
    equal to 'false', the "navigate" 'variable' is 'called' with the 'text' "/"
    (this takes users back to the "Home page"). If the "isCardFlipped" 
    'variable's' 'value' is equal to 'false' and the "dontFlipCard" 
    'parameter's' 'value' is equal to 'false' or the "isCardFlipped" 
    'variable's' 'value' is equal to 'true' and the "dontFlipCard" 'variable's' 
    'value' is equal to 'true', the "setIsCardFlipped" 'function' is 'called'
    with 'true' as its 'argument' and "setSameCard" 'function' is 'called' 
    with "true" as its 'argument'. This means that the "card" has been 
    'flipped' and it's currently the same "card" being displayed. If the 
    "dontFlipCard" 'parameter's' 'value' is equal to 'false', the 
    "setCurrentCardText" 'function' is 'called' with the 'card/item' with the
    same 'number/index' as the "currentCardIndex" 'variable's' "back" 'key' 
    'value' as its 'argument' and the "setIsCardFlipped" 'function' is 
    'called' with the number '1' being added to the "currentCardIndex" 
    'variable's' current 'value'. This 'flips' the "card", displaying the 
    "back" 'key' 'value' and gets the next "card" in the "deck" to be 
    displayed. If the "dontFlipCard" 'parameter's' 'value' is equal to 
    'true', the "setCurrentCardText" 'function' is 'called' with the 
    'card/item' with the same 'number/index' as the "currentCardIndex" 
    'variable's' "front" 'key' 'value' minus the number '1' as its 
    'argument' and the "setIsCardFlipped" 'function' is 'called' with 
    'false' as its 'argument'. This code runs if the "card" being displayed
    has already been 'flipped' and the user hasn't moved on to the next 
    "card" in the "deck". If the "isCardFlipped" 'parameter's' 'value' is
    equal to 'true', the "setCurrentCardText" 'function' is 'called' with
    the 'card/item' with the same 'number/index' as the 
    "currentCardIndex" 'variable's' "currentCardIndex" 'variable's' 
    "front" 'key' 'value' minus the number '1' as its 'argument' and the
    "setIsCardFlipped" 'function' is 'called' with 'false' as its 
    argument. This code is run when the "card" being displayed has been
    'flipped', but is still the same "card" that needs the "front side"
    to be displayed. If the  "isCardFlipped" 'parameter's' 'value' is
    'true' and the "dontFlipCard" 'variable' is 'false', the 
    "setCurrentCardText" 'function' is 'called' with the 'card/item' 
    with the same 'number/index' as the "currentCardIndex" 
    'variable's' "front" 'key' 'value' as its 'argument' and the 
    "setIsCardFlipped" 'function' is 'called' with 'false' as its 
    'argument'. This code runs if the "card" being displayed has been
    "flipped", but the next "card's" "front side" needs to be 
    displayed. If the "isCardFlipped" 'variable' is 'false' and the 
    "dontFlipCard" 'parameter's' 'value' is equal to 'true', the 
    "setCurrentCardText" 'function' is 'called' with the 'card/item'
    with the same 'number/index' as the "currentCardIndex" 
    'variable's' "back" 'key' 'value' minus the number '1' as its 
    'argument' and the "setIsCardFlipped" 'function' is 'called' 
    with 'true' as its 'argument'. This code runs when the "card" 
    has been "flipped", but the same "card's" "back side" still 
    needs to be displayed. */
    const handleCardFlip = ( dontFlipCard = false ) => {
      if ( currentCardIndex -1 === deckCards.length -1 && dontFlipCard === false ) {
        const confirm = window.confirm( "Restart cards? \n Click 'cancel' to return to the home page." );
        if ( confirm == true ) {   
          setCurrentCardIndex( ( currentIndex ) => currentIndex = 0 );
          setCurrentCardNumber( ( currentCardNumber ) => currentCardNumber = 1 );
          setIsCardFlipped( false );
          return;
        }    
        else if ( confirm == false ) { 
          navigate( "/" );
          return;
        }
      } 
  
      /* If the "isCardFlipped" 'variable's' 'value' is equal to 'false' 
      and the "dontFlipCard" 'parameter's' 'value' is equal to 'false' or 
      the "isCardFlipped" 'variable's' 'value' is equal to 'true' and the 
      "dontFlipCard" 'variable's' 'value' is equal to 'true', the 
      "setIsCardFlipped" 'function' is 'called' with 'true' as its 'argument' 
      and "setSameCard" 'function' is 'called' with "true" as its 'argument'. 
      This means that the "card" has been 'flipped' and it's currently the same 
      "card" being displayed. If the "dontFlipCard" 'parameter's' 'value' is equal
      to 'false', the "setCurrentCardText" 'function' is 'called' with the 
      'card/item' with the same 'number/index' as the "currentCardIndex" 
      'variable's' "back" 'key' 'value' as its 'argument' and the "setIsCardFlipped"
      'function' is 'called' with the number '1' being added to the "currentCardIndex" 
      'variable's' current 'value'. This 'flips' the "card", displaying the "back" 
      'key' 'value' and gets the next "card" in the "deck" to be displayed. If the 
      "dontFlipCard" 'parameter's' 'value' is equal to 'true', the "setCurrentCardText" 
      'function' is 'called' with the 'card/item' with the same 'number/index' as the 
      "currentCardIndex" 'variable's' "front" 'key' 'value' minus the number '1' as its 
      'argument' and the "setIsCardFlipped" 'function' is 'called' with 'false' as its 
      'argument'. This code runs if the "card" being displayed has already been 'flipped' 
      and the user hasn't moved on to the next "card" in the "deck". If the "isCardFlipped" 
      'parameter's' 'value' is equal to 'true', the "setCurrentCardText" 'function' is 
      'called' with the 'card/item' with the same 'number/index' as the "currentCardIndex" 
      'variable's' "currentCardIndex" 'variable's' "front" 'key' 'value' minus the number '1' 
      as its 'argument' and the "setIsCardFlipped" 'function' is 'called' with 'false' as its 
      argument. This code is run when the "card" being displayed has been 'flipped', but is 
      still the same "card" that needs the "front side" to be displayed. If the  "isCardFlipped" 
      'parameter's' 'value' is 'true' and the "dontFlipCard" 'variable' is 'false', the 
      "setCurrentCardText" 'function' is 'called' with the 'card/item' with the same 
      'number/index' as the "currentCardIndex" 'variable's' "front" 'key' 'value' as its 
      'argument' and the "setIsCardFlipped" 'function' is 'called' with 'false' as its 
      'argument'. This code runs if the "card" being displayed has been "flipped", but the next 
      "card's" "front side" needs to be displayed. If the "isCardFlipped" 'variable' is 'false' 
      and the "dontFlipCard" 'parameter's' 'value' is equal to 'true', the "setCurrentCardText" 
      'function' is 'called' with the 'card/item' with the same 'number/index' as the 
      "currentCardIndex" 'variable's' "back" 'key' 'value' minus the number '1' as its 'argument' 
      and the "setIsCardFlipped" 'function' is 'called' with 'true' as its 'argument'. This code 
      runs when the "card" has been "flipped", but the same "card's" "back side" still needs to be
      displayed. */ 
      if ( isCardFlipped === false && dontFlipCard === false || isCardFlipped === true
         && dontFlipCard === true ) {
        setIsCardFlipped( true );
        setSameCard( true );
        if ( dontFlipCard === false ) { 
          setCurrentCardText( deckCards[ currentCardIndex ].back );
          setCurrentCardIndex( ( index ) => index + 1 );
        }
      else if ( dontFlipCard === true ) {
        setCurrentCardText( deckCards[ currentCardIndex -1 ].front );
        setIsCardFlipped( false );
        }
      } else if ( isCardFlipped === true && dontFlipCard === false ) {
          setCurrentCardText( deckCards[ currentCardIndex ].front );
          setIsCardFlipped( false );
        } else if ( isCardFlipped === false && dontFlipCard === true ) {
            setCurrentCardText( deckCards[ currentCardIndex -1 ].back );
            setIsCardFlipped( true );
          }
    }
  
    /* If the "isCardFlipped" 'variable' is 'true', the "buttonsToDisplay" 
    'variable' will hold a 'div' JSX 'element' containing two 'button' JSX 
    'elements'; one with the 'text' "Flip" and the other with the "text" "Next". 
    The first 'button' JSX 'element' has the "handleCardFlip" 'function' with 
    'true' as its 'argument' as the 'value' for its 'onClick' 'attribute'. The 
    second 'button' JSX 'element' checks if the "firstFlip" 'variable' is 'false'.
    If so, the "setFirstFlip" 'function' is 'called' with 'true' as its 
    'argument', the "setCurrentCardNumber" 'function' is 'called' adding the 
    number '1' to the "currentCardNumber" 'variable's' current 'value', the 
    "setSameCard" 'function' is 'called' with 'false' as its 'argument', and the
    "handleCardFlip" 'function' is 'called' when the user 'clicks' this 
    'button'. */
    if ( isCardFlipped === true ) {
      buttonsToDisplay = 
      <div>
        <Button className='Study-flip-btn' variant='secondary' 
          onClick={ () => {
              handleCardFlip( true )
            }
          }>Flip</Button>
        <Button className='Study-next-btn' variant='primary' onClick={ () => {            
            if ( firstFlip === false ) setFirstFlip( true );
              setCurrentCardNumber( ( cardNumber ) => cardNumber + 1 ); 
              setSameCard( false );         
              handleCardFlip();
            }
          }>Next</Button>
      </div>
    }
      /* If the "isCardFlipped" 'variable' is 'false', the "buttonsToDisplay" will 
      hold a 'button' JSX 'element' with the 'text' "Flip" that has an 'onClick' 
      'attribute' that checks if the "sameCard"'variable' is 'true'. If so, the 
      "handleCardFlip" 'function' is 'called' with 'true' as its 'argument' followed
      by 'return'. Otherwise, the ""handleCardFlip" 'function' is 'called' without 
      an 'argument'. */
      else if ( isCardFlipped === false ) { 
        buttonsToDisplay = <Button className='Study-flip-btn' variant='secondary' 
        onClick={ () => {
            if ( sameCard === true ) {
              handleCardFlip( true );
              return;
            } else handleCardFlip();
          }
        }>Flip</Button>
      }
  
    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
    an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
    " / ", a 'Link' JSX 'element' to the  the 'link' to the "Deck.js" 
    'file' that displays the current "deck", and the 'text' " / Study", an 'h1' 
    JSX 'element' with the 'text' "Study:" and the 'value' of the "deckName" 
    'variable'. A 'ternary operator' checks if the "deckCards" 'length' is equal 
    to or greater than the number '3' (there are more than three 'cards/objects').
    If so, a 'div' JSX 'element' is 'returned' with an 'h3' JSX 'element' with 
    the 'text' "Card " plus the 'value' of the "currentCardNumber", the 'text' 
    " of ", and the 'value' of the "deckCard" 'variable's' 'length' (the total 
    number of "cards/objects"), followed py a 'p' JSX 'element' with the 'value' 
    of the "currentCardText" 'variable' followed by the 'value' of the "buttonsToDisplay" 
    'variable'. Otherwise, a 'div' JSX 'element' is 'returned' with an 'h2' JSX 'element' 
    with the 'text' "Not enough cards." followed by a 'p' JSX 'element' with the 'text' 
    "You need at least 3 cards to study. There are ", plus the "deckCards" 'variable's' 
    'length' plus the 'text' " in this deck.", followed by a 'button' JSX 'element' 
    with an 'img' JSX 'element' inside and an 'onClick' 'attribute' with the the 
    "navigate" 'variable' with 'text' "/decks", plus the 'value' of the "deckId" 
    'variable', plus "/cards/new". This will take users load the "AddCards.js" 'file' for 
    the specific "deck". */
    return (
      <div>
        <div className='nav-bar'><Link to="/" className='home-link' >
          <Image src={ home } 
          className='home-icon' alt="home"/>
            Home</Link> / <Link to={`/decks/${ deckId }`}>{ deckName }</Link> / Study</div>
        <h1>Study: { deckName }</h1>
        { deckCards.length >= 3 ?
        <Card>
          <Card.Body>
            <Card.Title>Card { currentCardNumber } of { deckCards.length }</Card.Title>
            <Card.Text> { currentCardText } </Card.Text>
            { buttonsToDisplay }
          </Card.Body>
          </Card> : 
          <div>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are { deckCards.length } in this deck.</p>
            <Button className='Study-add-cards-to-deck' variant='primary'
              onClick={ () => navigate(`/decks/${ deckId }/cards/new`) } > 
              <Image src={ add } 
              alt="plus-math"/>Add Cards</Button>
          </div>
        }
      </div>
    );
  }
  
  /* Exports the "Study" 'function/component'. */
  export default Study;