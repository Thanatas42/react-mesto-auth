import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.userName);
    const [description, setDescription] = React.useState(currentUser.userDescription);


    React.useEffect(() => {
        setName(currentUser.userName);
        setDescription(currentUser.userDescription);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return ((
        <PopupWithForm title="Редактировать&nbsp;профиль" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input className="popup__text" type="text"
                    placeholder="Введите ваше имя"
                    minLength="2" maxLength="40"
                    required value={name || ''} onChange={handleChangeName} />
                <span className="popup__input-error"></span>
            </div>
            <div className="popup__field">
                <input className="popup__text" type="text"
                    placeholder="Введите вашу профессию"
                    minLength="2" maxLength="40"
                    required value={description || ''} onChange={handleChangeDescription} />
                <span className="popup__input-error"></span>
            </div>
        </PopupWithForm>
    ));
};

export default EditProfilePopup;