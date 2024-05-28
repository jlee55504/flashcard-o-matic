import React, { useState, useEffect } from 'react';
import home from '../imgs/home.png';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, updateCard, readCard } from '../utils/api/index';
import { Image, Button } from 'react-bootstrap';

function EditCard() {
  const { deckId, cardId } = useParams();
    const [frontCardText, setFrontCardText] = useState("");
    const [backCardText, setBackCardText] = useState("")
    const navigate = useNavigate();
    const [deck, setDeck] = useState({});
    const [deckName, setDeckName] = useState("");
    const [card, setCard] = useState({});
    const [waitForCardToUpdate, setWaitForCardToUpdate] = useState(false);
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
            setDeckName(currentDeck.name)
            const currentCard = await readCard(cardId, abortController.signal);
            setCard(currentCard);
        } getDeck();
    }, [card]);

    useEffect(() => {
        const abortController = new AbortController();
        if (card != {} && waitForCardToUpdate) {
            updateCard(card, abortController.signal);
            setWaitForCardToUpdate(false);
            setFrontCardText("")
            setBackCardText("")
            navigate(`/decks/${deckId}`);
        }
    }, [waitForCardToUpdate])

    const handleChange = ({ target }) => {
        if (target.name === "EditCard-front-text") setFrontCardText(target.value);
        else if (target.name === "EditCard-back-text") setBackCardText(target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setCard({
            id: Number(card.id),
            front: frontCardText,
            back: backCardText,
            deckId: Number(card.deckId)
        });
        setWaitForCardToUpdate(true);
    }
    return (
        <>
            <h1>Edit Card</h1>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / <Link>Deck {deckName}</Link> / Edit Card {card.id}</div>
            <form onSubmit={handleSubmit}>
                <label htmlfor="EditCard-front-text" className='EditCard-front-text-label' >
                    Front
                    <textarea id="EditCard-front-text" name="EditCard-front-text"
                     value={frontCardText} placeholder={card.front}
                      onChange={handleChange} required ></textarea>
                </label>
                <label htmlfor="EditCard-back-text" >Back
                    <textarea id="EditCard-back-text" name="EditCard-back-text" 
                    value={backCardText} placeholder={card.back} required 
                     onChange={handleChange} ></textarea>
                </label>
                <Button type="button" variant='secondary' className="EditCard-cancel-btn" onClick={() => navigate(`/decks/${deckId}`)} >Cancel</Button>
                <Button type="submit" variant="primary" className="EditCard-submit-btn" >Submit</Button>
            </form>
        </>
    )


}

export default EditCard;