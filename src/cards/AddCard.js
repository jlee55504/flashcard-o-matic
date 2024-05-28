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
        async function getDeck() {
            const selectedDeck = await readDeck(deckId);
            setDeckName(selectedDeck.name);
        } getDeck();
    }, []);
    
    const handleChange = ({ target }) => {
        if (target.name === "front-card") setFrontCardText(target.value);
        else if (target.name === "back-card") setbackCardText(target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        createCard(deckId, {front: frontCardText, back: backCardText});
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
                    <label htmlFor='front-card'>
                        Front<textarea id="front-card" name="front-card" placeholder='Front side of card' onChange={handleChange} value={frontCardText} required ></textarea>
                    </label>
                    <label htmlFor='back-card'>
                    Back<textarea id="back-card" name="back-card" placeholder='Back side of card' onChange={handleChange} value={backCardText} required ></textarea>
                    </label>
        <Button variant='secondary' type="button" className='done-btn' >Done</Button>
        <Button variant='primary' type='submit' >Save</Button>
                </form>
            </>
    );
}

export default AddCard;