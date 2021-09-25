import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
    const [namePlace, setNamePlace] = React.useState('');
    const [linkPlace, setLinkPlace] = React.useState('');

    function handleChangeNamePlace(e) {
        setNamePlace(e.target.value);
    }
    function handleChangeLinkPlace(e) {
        setLinkPlace(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            link: linkPlace,
            name: namePlace,
        });
        setNamePlace('');
        setLinkPlace('');
    }

    return ((
        <PopupWithForm title="Новое&nbsp;место" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input className="popup__text"
                    placeholder="Название" type="text" name="name-place"
                    minLength="2" maxLength="30"
                    required value={namePlace} onChange={handleChangeNamePlace} />
                <span className="popup__input-error" id="name-place-error"></span>
            </div>
            <div className="popup__field">
                <input className="popup__text" placeholder="Ссылка на картинку"
                    type="url" required value={linkPlace} onChange={handleChangeLinkPlace} />
                <span className="popup__input-error" id="link-error"></span>
            </div>
        </PopupWithForm>
    ));
};

export default AddPlacePopup;