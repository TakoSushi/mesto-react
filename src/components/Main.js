import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect( () => {
    api.getUserInfo()
    .then( (userData) => {
    setUserName(userData.name);
    setUserDescription(userData.about);
    setUserAvatar(userData.avatar);
    })
    .catch((err) => console.warn(err));
  }, []);

  useEffect( () => {
    api.getInitialCards()
    .then( (cardsData) => setCards(cardsData))
    .catch((err) => console.warn(err));
  }, []);


  return (
    <main>
      <section className="profile">
        <div className="avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <button
            type="button"
            className="avatar__change-button"
            aria-label="edit avatar"
            onClick={onEditAvatar}
            ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="edit profile"
              onClick={onEditProfile}
              ></button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="add card"
          onClick={onAddPlace}
          ></button>
      </section>

      <section className="photo-grid" aria-label="Фотогалерея">
        <ul className="photo-grid__list">
          {cards.map( (card) => {
            return <Card key={card._id} card={card} onCardClick={onCardClick}/>;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;