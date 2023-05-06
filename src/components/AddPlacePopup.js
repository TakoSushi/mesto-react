import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from 'react';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const cardName = useRef(null);
  const cardUrl = useRef(null)

  useEffect(() => {
    cardName.current.value = null;
    cardUrl.current.value = null;
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    
    onAddPlace({
        name: cardName.current.value,
        link: cardUrl.current.value
      });
  }

  return(
    <PopupWithForm
      title="Новое место"
      buttonText="Создать"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
      ref={cardName}
      type="text"
      name="img-name"
      placeholder="Название"
      className="popup__input-data popup__input-data_img-name"
      minLength="2"
      maxLength="30"
      required
      />
      <span className="popup__error-message"></span>
      <input
      ref={cardUrl}
      type="url"
      name="img-url"
      placeholder="Ссылка на картинку"
      className="popup__input-data popup__input-data_img-url"
      required
      />
      <span className="popup__error-message"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;