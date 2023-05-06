function PopupWithForm({title, buttonText, name, isOpen, onClose, children, onSubmit, isLoading}) {

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form name={name} method="POST" className="popup__form" onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{title}</h2>
          <>{children}</>
          <button type="submit" className="popup__button-save" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;