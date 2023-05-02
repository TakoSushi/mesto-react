import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect( () => {
    api.getUserInfo()
    .then( (userData) => setCurrentUser(userData))
    .catch( (err) => console.warn(err));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  const handleCardClick = setSelectedCard;

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">      
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          buttonText="Сохранить"
          name="user-data"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="user-name"
            placeholder="Имя"
            className="popup__input-data popup__input-data_user-name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error-message"></span>
          <input
            type="text"
            name="user-profession"
            placeholder="О себе"
            className="popup__input-data popup__input-data_user-profession"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error-message"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          buttonText="Создать"
          name="new-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
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
            type="url"
            name="img-url"
            placeholder="Ссылка на картинку"
            className="popup__input-data popup__input-data_img-url"
            required
          />
          <span className="popup__error-message"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          buttonText="Сохранить"
          name="update-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="avatar-url"
            placeholder="Ссылка на картинку"
            className="popup__input-data popup__input-data_avatar-url"
            required
          />
          <span className="popup__error-message"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          buttonText="Да"
          name="delete-confirm"
        >
        </PopupWithForm>
          
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
