function ImagePopup({card, onClose}){
  
  return(
    <div className={`popup popup_img-large ${card.name ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_size">
        <button
          type="button"
          className="popup__close popup__close_position"
          onClick={onClose}
          ></button>
        <figure className="popup__figure-img">
          <img className="popup__full-img" src={card.link} alt={card.name}/>
          <figcaption className="popup__title-full-img">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;