import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap';
import { readDeck, } from '../utils/api/index';
import home from '../imgs/home.png';
import add from '../imgs/add.png';
function Study() {
    const { deckId } = useParams();
    const [selectedDeckName, setSelectedDeckName] = useState("");
    const [deck, setDeck] = useState([])
    const [selectedDeckCards, setSelectedDeckCards] = useState([]);
    const [currentCardNumber, setCurrentCardNumber] = useState(1);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentCardText, setCurrentCardText] = useState("");
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [firstFlip, setFirstFlip] = useState(false);
    const [sameCard, setSameCard] = useState(true);
    let buttonsToDisplay;
    let notEnoughCards;
    let enoughCards;
    const navigate = useNavigate();
    useEffect(() => {
        async function getDeck() {
            const selectedDeck = await readDeck(deckId);
            setDeck(selectedDeck);
            setSelectedDeckName(selectedDeck.name);
            setSelectedDeckCards(selectedDeck.cards);              
        }
         getDeck();
    }, []);

    useEffect(() => {
       if(selectedDeckCards.length > 0 && currentCardIndex === 0) {
            setCurrentCardText(selectedDeckCards[0].front);
        }
        
    }, [selectedDeckCards, currentCardIndex]);


    const handleCardFlip = () => {

       if (currentCardIndex -1 === selectedDeckCards.length -1) {
        const confirm = window.confirm("Restart cards? \n Click 'cancel' to return to the home page.");
         if (confirm == true) {   
             setCurrentCardIndex((currentIndex) => currentIndex - currentIndex);
           // setCurrentCardIndex(0);
             setCurrentCardNumber((currentCardNumber) => currentCardNumber - currentCardNumber +1);
             //setCurrentCardNumber(1)
             navigate(`/decks/${deckId}/study`);
             setIsCardFlipped(false)
             return;
         }    
         else if (confirm == false) navigate("/");
     } 

       if (isCardFlipped === false && firstFlip === false) {
        setCurrentCardText(selectedDeckCards[currentCardIndex].Back);
       setCurrentCardIndex((index) => index + 1);
        setIsCardFlipped(true);

       }
     else if (isCardFlipped === false && firstFlip === true) {

            setCurrentCardText(selectedDeckCards[currentCardIndex].Back);
            setCurrentCardIndex((index) => index + 1)
            setIsCardFlipped(true);

        } else if (isCardFlipped === true) {
            setCurrentCardText(selectedDeckCards[currentCardIndex].front);
            setIsCardFlipped(false);
        }
    }
    
    if (isCardFlipped === true) {
        buttonsToDisplay = <><Button variant='secondary' className='flip-btn' onClick={handleCardFlip} >Flip</Button> <Button variant='primary'
         className='next-btn' onClick={() => {            
            if (firstFlip  === false) setFirstFlip(true);
            setCurrentCardNumber((cardNumber) => cardNumber + 1); 
            handleCardFlip();

        }}>Next</Button></>
    }
    else if (isCardFlipped === false) buttonsToDisplay = <Button variant='secondary' className='flip-btn' onClick={() =>{
        //if (currentCardIndex > 0) setCurrentCardIndex((index) => index + 1)
        handleCardFlip();
    }} >Flip</Button>
    return (
        <div className='study-div'>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / <Link>{selectedDeckName}</Link> / Study</div>
            <h1>Study: {selectedDeckName}</h1>
           { selectedDeckCards.length >=3 ? <Card>
              <Card.Body>
                <Card.Title>Card of {currentCardNumber} of {selectedDeckCards.length}</Card.Title>
                <Card.Text> {currentCardText} </Card.Text>
                {buttonsToDisplay}
              </Card.Body>
            </Card> : <>
                <h2>NotEnoughCards</h2>
                <p>You need at least 3 cards to study. There are {selectedDeckCards.length} in this deck.</p>
                 <Button variant='primary' onClick={() => navigate(`/decks/${deckId}/cards/new`)} > 
                 <Image src={add} className="add-icon"  />
                    Add Cards</Button>
            </>}
        </div>
    )
}

export default Study;