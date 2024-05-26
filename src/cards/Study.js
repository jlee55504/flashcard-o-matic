import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap';
import { readDeck, } from '../utils/api/index';
import home from '../imgs/home.png';
import add from '../imgs/add.png';
function Study() {
    const { deckId } = useParams();
    const [selectedDeckName, setSelectedDeckName] = useState("");
    const [selectedDeckCards, setSelectedDeckCards] = useState([]);
    const [currentCardNumber, setCurrentCardNumber] = useState(1);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentCardText, setCurrentCardText] = useState("");
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [firstFlip, setFirstFlip] = useState(false);
    const [sameCard, setSameCard] = useState(false);
    let buttonsToDisplay;

    const navigate = useNavigate();
    useEffect(() => {
        async function getDeck() {
            const selectedDeck = await readDeck(deckId);
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

    const handleCardFlip = (dontFlipCard = false) => {
       if (currentCardIndex -1 === selectedDeckCards.length -1 && dontFlipCard === false) {
        const confirm = window.confirm("Restart cards? \n Click 'cancel' to return to the home page.");
         if (confirm == true) {   
             setCurrentCardIndex((currentIndex) => currentIndex = 0);
             setCurrentCardNumber((currentCardNumber) => currentCardNumber = 1);
             navigate(`/decks/${deckId}/study`);
             setIsCardFlipped(false)
             return;
         }    
         else if (confirm == false) navigate("/");
     } 

if (isCardFlipped === false && dontFlipCard === false || isCardFlipped === true
        && dontFlipCard === true) {
            setIsCardFlipped(true);
            setSameCard(true);
            if (dontFlipCard === false){ 
                setCurrentCardText(selectedDeckCards[currentCardIndex].back);
                setCurrentCardIndex((index) => index + 1);
            }
            else if (dontFlipCard === true) {
                setCurrentCardText(selectedDeckCards[currentCardIndex -1].front);
                setIsCardFlipped(false);
            }
        } else if (isCardFlipped === true && dontFlipCard === false) {
            setCurrentCardText(selectedDeckCards[currentCardIndex].front);
            setIsCardFlipped(false);
        }else if (isCardFlipped === false && dontFlipCard === true) {
            setCurrentCardText(selectedDeckCards[currentCardIndex -1].back);
            setIsCardFlipped(true);
        }
    }

    if (isCardFlipped === true) {
        buttonsToDisplay = <><Button variant='secondary' className='flip-btn' 
        onClick={() => {
            handleCardFlip(true)
        }
    }>Flip</Button> <Button variant='primary'
         className='next-btn' onClick={() => {            
            if (firstFlip  === false) setFirstFlip(true);
            setCurrentCardNumber((cardNumber) => cardNumber + 1); 
           setSameCard(false);         
            handleCardFlip();
        }
    }>Next</Button></>
    }
    else if (isCardFlipped === false) { 
        buttonsToDisplay = <Button variant='secondary' className='flip-btn' 
        onClick={() => {
       if (sameCard === true) {
        handleCardFlip(true);
        return;
       }
           else handleCardFlip();
    }
}>Flip</Button>
}

    return (
        <div className='study-div'>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / <Link>{selectedDeckName}</Link> / Study</div>
            <h1>Study: {selectedDeckName}</h1>
           { selectedDeckCards.length >=3 ? <Card>
              <Card.Body>
                <Card.Title>Card of {currentCardNumber} of 
                {selectedDeckCards.length}</Card.Title>
                <Card.Text> {currentCardText} </Card.Text>
                {buttonsToDisplay}
              </Card.Body>
            </Card> : <>
                <h2>NotEnoughCards</h2>
                <p>You need at least 3 cards to study. There are 
                    {selectedDeckCards.length} in this deck.</p>
                 <Button variant='primary' 
                 onClick={() => navigate(`/decks/${deckId}/cards/new`)} > 
                 <Image src={add} className="add-icon"  />Add Cards</Button>
            </>
            }
        </div>
    )
}

export default Study;