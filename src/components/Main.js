import { useState, useEffect, useContext } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect( () => {
    api.getInitialCards()
    .then( (cardsData) => setCards(cardsData))
    .catch((err) => console.warn(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button
            type="button"
            className="avatar__change-button"
            aria-label="edit avatar"
            onClick={onEditAvatar}
            ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="edit profile"
              onClick={onEditProfile}
              ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
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