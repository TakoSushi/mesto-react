import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      buttonText="Сохранить"
      name="user-data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
      type="text"
      name="user-name"
      placeholder="Имя"
      defaultValue={name}
      onChange={handleChangeName}
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
      defaultValue={description}
      onChange={handleChangeDescription}
      className="popup__input-data popup__input-data_user-profession"
      minLength="2"
      maxLength="200"
      required
      />
      <span className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;