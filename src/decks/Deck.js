import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import edit from '../imgs/edit.png';
import book from '../imgs/book.png';
import add from '../imgs/add.png';
import trashcan from '../imgs/trashcan.png';
import home from '../imgs/home.png';
import { readDeck, deleteCard, deleteDeck } from '../utils/api/index';

function Deck() {
    const { deckId } = useParams();
    const [ deckCards, setDeckCards ] = useState([]);
    const [ updateCardList, setUpdateCardList ] = useState(false);
    const [ deck, setDeck ] = useState({});
    const navigate = useNavigate();
    const [ cardsToDisplay, setCardsToDisplay ] = useState([]);
    const abortController = new AbortController();
    useEffect(() => {
        async function getDeck() {
            const selectedDeck = await readDeck(deckId, abortController.signal);
            setDeck(selectedDeck);
            setDeckCards(selectedDeck.cards);
            setUpdateCardList(false);
        } getDeck();
    }, [updateCardList]);

    useEffect(()=> {
        if (deckCards.length > 0) {
            const alllDeckCards = deckCards.map((card, index) => (
                <div className="Deck-card-div" key={index} >
                    <div className="Deck-card-div-front-div" >
                    <p className="Deck-card-div-front-p" >{card.front}</p>
                </div>
                <div className="Deck-card-div-back-div" >
                    <p className="Deck-card-div-back-p" >{card.back}</p>
                    <div className="Deck-card-div-btns-div" >
                        <Button variant="secondary" type="button" className="Deck-edit-card-btn" onClick={()=> navigate(`/decks/${deckId}/cards/${card.id}/edit`)} >
                            <Image src={edit} className="edit-img" />
                            Edit
                        </Button>
                        <Button variant="danger" type="button" className="Deck-delete-card-btn" onClick={(event) => {                             
                            handleDeleteCard(card.id)}} >
                            <Image src={trashcan} className="trashcan-img" />
                        </Button>
                    </div>
                </div>
                </div>
            ));
            setCardsToDisplay(alllDeckCards);
        }
    }, [deckCards]);

    async function handleDeleteCard(cardId) {
        const confirm = window.confirm("Delete this card? \n You will not be able to recover it.");
        if (confirm === true) {
            await deleteCard(cardId, abortController.signal);   
            setUpdateCardList(!false);
        }
    }

    async function handleDeleteDeck(deckId) {
        const confirm = window.confirm("Delete this deck? \n You will not be able to recover it.");
        if (confirm === true) {
            await deleteDeck(deckId, abortController.signal); 
            navigate("/");
        }
    }
     
    return (
        <>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / {deck.name}
                </div>
            <div className="Deck-select-deck-div">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="Deck-select-deck-btns-div">
                    <Button variant="secondary" type="button" className="Deck-edit-deck-Btn" onClick={()=> navigate(`/decks/${deckId}/edit`)} >
                        <Image src={edit} className="edit-img" />
                        Edit
                    </Button>
                    <Button variant="primary" type="button" className="Deck-study-deck-btn" onClick={()=> navigate(`/decks/${deckId}/study`)} >
                        <Image src={book} className="book-img" />
                        Study
                    </Button>
                    <Button variant="primary" type="button" className="Deck-add-cards-to-deck-btn" onClick={()=> navigate(`/decks/${deckId}/cards/new`)} >
                        <Image src={add} className="add-img" />
                            Add Cards
                    </Button>
                    <Button variant="danger" type="button" className="Deck-delete-deck-btn" onClick={() => handleDeleteDeck(deckId)} >
                        <Image src={trashcan} className="trashcan-img" />
                    </Button>
                </div>
           </div>
           <h1>Cards</h1>
           <div className="Deck-cards-div">
                {cardsToDisplay}
           </div>
        </>
    );
}

export default Deck;