import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './style.css';
import Image from 'react-bootstrap/Image';
import home from '../imgs/home.png';
import { createDeck } from '../utils/api/index';

function CreateDeck() {
    /* */
    const navigate = useNavigate();
    /**/

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleChange = ({ target }) => {
        if (target.name === "CreateDeck-name") setName(target.value);
        else if (target.name === "CreateDeck-description") setDescription(target.value)

    }

    const handleSubmit = (event) => {
        event.preventDefault();
       const abortController = new AbortController();
       const newDeck = {name: name, description: description};
       createDeck(newDeck, abortController.signal);
        setName("");
        setDescription("");
    }
    return (
        <>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <Image src={home} className='home-icon' />
                Home</Link> / Create Deck</div>
            <h1 className='CreateDeck-create-deck-h1'>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='CreateDeck-name'>
                    Name
                    <input type='text' name="CreateDeck-name" id="CreateDeck-name" placeholder='Deck Name' onChange={handleChange} value={name} />
                </label>
                <label htmlFor='CreateDeck-description'>
                    Description<textarea id="CreateDeck-description" name="CreateDeck-description" placeholder='Brief description of the deck' onChange={handleChange} value={description} ></textarea>
                </label>
                <Button variant='secondary' type='button' className='CreateDeck-cancel-btn' onClick={() => navigate("/")}>Cancel</Button>
                <Button variant='primary' type='submit' className='CreateDeck-submit-btn' >Submit</Button>
            </form>
        </>
    );
}

export default CreateDeck;