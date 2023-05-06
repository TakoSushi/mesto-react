import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';

function EditProfilePopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef(null);
  
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  
  return(
    <PopupWithForm
      title="Обновить аватар"
      buttonText="Сохранить"
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="text"
        name="avatar-url"
        placeholder="Ссылка на картинку"
        className="popup__input-data popup__input-data_avatar-url"
        required
      />
      <span className="popup__error-message"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;