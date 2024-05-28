import React, { useState, useEffect } from 'react';
import home from '../imgs/home.png';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';
import { Image, Button } from 'react-bootstrap';
export function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("")
    const [waitForDeckToUpdate, setWaitForDeckToUpdate] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
        }
        getDeck();
    }, [deck]);

    useEffect(() => {
        if (deck != {} && waitForDeckToUpdate === true)   { 
            updateDeck(deck);
            setWaitForDeckToUpdate(false);
        }
    }, [waitForDeckToUpdate]) 

    const handleChange = ({ target }) => {
        if (target.name === "EditDeck-deck-name") setDeckName(target.value);
        else if (target.name === "EditDeck-deck-description") setDeckDescription(target.value);
    }

     function handleSubmit(event) {
        event.preventDefault(); 
        setDeck({
        id: Number(deck.id),    
        name: deckName,
        description: deckDescription
        });
        setWaitForDeckToUpdate(true);  
        setDeckName("");
        setDeckDescription("");         
    }

    return (
        <>
        <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Deck</div>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlfor="EditDeck-deck-name" >Name
                    <input type="text" id="EditDeck-deck-name" name="EditDeck-deck-name" 
                    placeholder={deck.name} value={deckName} 
                    onChange={handleChange} required ></input>
                </label>
                <label htmlfor="EditDeck-deck-description" >Description
                    <textarea id="EditDeck-deck-description" name="EditDeck-deck-description"
                    placeholder={deck.description} value={deckDescription} 
                    onChange={handleChange} required ></textarea>
                 <Button type="button" variant="secondary" 
                    className="EditDeck-cancel-btn" onClick={()=> navigate(`/decks/${deckId}`)} >
                        Cancel
                 </Button>
                 <Button type="submit" variant="primary" 
                 className="EditDeck-submit-btn" >Submit</Button>
                </label>
            </form>
        </>
    );
}

export default EditDeck;