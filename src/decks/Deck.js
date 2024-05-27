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
    const [ selectedDeck, setSelectedDeck ] = useState({});
    const navigate = useNavigate();
    const [ cardsToDisplay, setCardsToDisplay ] = useState([])
    useEffect(() => {
        async function getDeck() {
            const selectedDeck = await readDeck(deckId);
            setSelectedDeck(selectedDeck);
            setDeckCards(selectedDeck.cards);
            setUpdateCardList(false);
        } getDeck();
    }, [updateCardList]);

    useEffect(()=> {
        if (deckCards.length > 0) {
            const alllDeckCards = deckCards.map((card, index) => (
                <div className="card-div" key={index} >
                    <div className="card-div-front-div" >
                    <p className="card-div-front-p" >{card.front}</p>
                </div>
                <div className="card-div-back-div" >
                    <p className="card-div-back-p" >{card.back}</p>
                    <div className="card-div-btns-div" >
                        <Button variant="secondary" type="button" onClick={()=> navigate(`/decks/${deckId}/cards/${card.id}/edit`)} >
                            <Image src={edit} className="edit-img" />
                            Edit
                        </Button>
                        <Button variant="danger" type="button" onClick={() => handleDeleteCard(card.id)} >
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
            await deleteCard(cardId);
            setUpdateCardList(!false);
        }
    }

    async function handleDeleteDeck(deckId) {
        const confirm = window.confirm("Delete this deck? \n You will not be able to recover it.");
        if (confirm === true) {
            await deleteDeck(deckId);
            navigate("/");
        }
    }
     
    return (
        <div className='-deck-deck-div'>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / {selectedDeck.name}
                </div>
            <div className="select-deck-div">
            <h3>{selectedDeck.name}</h3>
            <p>{selectedDeck.description}</p>
            <div className="select-deck-btns-div">
                <Button variant="secondary" type="button" onClick={()=> navigate(`/decks/${deckId}/edit`)} >
                    <Image src={edit} className="edit-img" />
                    Edit
                </Button>
                <Button variant="primary" type="button" onClick={()=> navigate(`/decks/${deckId}/study`)} >
                    <Image src={book} className="book-img" />
                    Study
                </Button>
                <Button variant="primary" type="button" onClick={()=> navigate(`/decks/${deckId}/cards/new`)} >
                    <Image src={add} className="add-img" />
                    Add Cards
                </Button>
                <Button variant="danger" type="button" onClick={() => handleDeleteDeck(deckId)} >
                    <Image src={trashcan} className="trashcan-img" />
                </Button>
            </div>
           </div>
           <h1>Cards</h1>
           <div className="cards-div">
            {cardsToDisplay}
           </div>
        </div>
    )
}

export default Deck;