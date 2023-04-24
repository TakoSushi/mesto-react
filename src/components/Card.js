function Card({card, onCardClick}) {

  function handleClick() {
      onCardClick(card);
  }

  return(
    <li className="photo-grid__card">
      <div
        className="photo-grid__img"
        style={{ backgroundImage: `url(${card.link})`}}
        onClick={handleClick}
      >
        <button
          type="button"
          className="photo-grid__trash-button"
          aria-label="delete card"
          ></button>
      </div>
      <div className="photo-grid__title">
        <h2 className="photo-grid__title-name">{card.name}</h2>
        <div>
          <button type="button" className="photo-grid__heart" aria-label="лайк"></button>
          <div className="photo-grid__heart-count">{card.likes.length}</div>
        </div>
      </div>
    </li>
  ) 
}

export default Card;