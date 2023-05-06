import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `photo-grid__heart ${isLiked && 'photo-grid__heart_active'}` 
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick(event) {
    event.stopPropagation();
    onCardDelete(card);
  }

  return(
    <li className="photo-grid__card">
      <div
        className="photo-grid__img"
        style={{ backgroundImage: `url(${card.link})`}}
        onClick={handleClick}
      >
        {isOwn && <button
          type="button"
          className="photo-grid__trash-button"
          aria-label="delete card"
          onClick={handleDeleteClick}
        ></button>}
      </div>
      <div className="photo-grid__title">
        <h2 className="photo-grid__title-name">{card.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
          <div className="photo-grid__heart-count">{card.likes.length}</div>
        </div>
      </div>
    </li>
  ) 
}

export default Card;