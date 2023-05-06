import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    api.getUserInfo()
    .then( (userData) => setCurrentUser(userData))
    .catch( (err) => console.warn(err));
    
    api.getInitialCards()
    .then( (cardsData) => setCards(cardsData))
    .catch((err) => console.warn(err));
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

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch( err => console.warn(err));
  }
  
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch( err => console.warn(err));
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true);

    api.setUserInfo(newUserData).then( (userData) => setCurrentUser(userData))
    .then( () => closeAllPopups())
    .catch( err => console.warn(err))
    .finally( () => setIsLoading (false));
  }
  
  function handleUpdateAvatar(newAvatarUrl) {
    setIsLoading(true);

    api.setUserAvatar(newAvatarUrl).then( (userData) => setCurrentUser(userData))
    .then( () => closeAllPopups())
    .catch( err => console.warn(err))
    .finally( () => setIsLoading (false));
  }

  function handleAddPlaceSubmit(newCardData) {
    setIsLoading(true);

    api.addNewCard(newCardData).then( (newCard) => setCards([newCard, ...cards]))
    .then( () => closeAllPopups())
    .catch( err => console.warn(err))
    .finally( () => setIsLoading (false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">      
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <PopupWithForm
          title="Вы уверены?"
          buttonText="Да"
          name="delete-confirm"
        />
          
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
