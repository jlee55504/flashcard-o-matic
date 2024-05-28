import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api/index';
import home from '../imgs/home.png';
import Image from 'react-bootstrap/Image';
function AddCard() {
    const { deckId } = useParams();
    const [deckName, setDeckName] = useState("");
    const [frontCardText, setFrontCardText] = useState("");
    const [backCardText, setbackCardText] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const selectedDeck = await readDeck(deckId, abortController.signal);
            setDeckName(selectedDeck.name);
        } getDeck();
    }, []);
    
    const handleChange = ({ target }) => {
        if (target.name === "AddCard-front-card") setFrontCardText(target.value);
        else if (target.name === "AddCard-back-card") setbackCardText(target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const abortController = new AbortController();
        createCard(deckId, {front: frontCardText, back: backCardText}, abortController.signal);
        setFrontCardText("");
        setbackCardText("");
    }

    return (
        <>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                    Home</Link> / <Link to={`/decks/${deckId}`}>{deckName}</Link> / Add Card</div>
                <h1>{deckName}: Add Card</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='AddCard-front-card'>
                        Front<textarea id="AddCard-front-card" name="AddCard-front-card" placeholder='Front side of card' onChange={handleChange} value={frontCardText} required ></textarea>
                    </label>
                    <label htmlFor='AddCard-back-card'>
                    Back<textarea id="AddCard-back-card" name="AddCard-back-card" placeholder='Back side of card' onChange={handleChange} value={backCardText} required ></textarea>
                    </label>
                <Button variant='secondary' type="button" className='AddCard-done-btn' >Done</Button>
                <Button variant='primary' type='submit' className='AddCard-save-btn' >Save</Button>
                </form>
            </>
    );
}

export default AddCard;