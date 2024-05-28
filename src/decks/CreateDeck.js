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
        if (target.name === "name") setName(target.value);
        else if (target.name === "description") setDescription(target.value)

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
            <h1 className='create-deck-h1'>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Name
                    <input type='text' name="name" id="name" placeholder='Deck Name' onChange={handleChange} value={name} />
                </label>
                <label htmlFor='description'>
                    Description<textarea id="description" name="description" placeholder='Brief description of the deck' onChange={handleChange} value={description} ></textarea>
                </label>
                <Button variant='secondary' type='button' className='cancel-btn' onClick={() => navigate("/")}>Cancel</Button>
                <Button variant='primary' type='submit' className='submit-btn' >Submit</Button>
            </form>
        </>
    );
}

export default CreateDeck;