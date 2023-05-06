import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

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
            return <Card 
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;