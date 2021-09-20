import React from 'react';

function PopupWithForm(props) {
    return ((
        < div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`} >
            <form className="popup__container" name={props.name} onSubmit={props.onSubmit}>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className="popup__save-button" type="submit">{props.buttonName}</button>
                <button className="popup__close-button" type="reset" onClick={props.closeAllPopups}></button>
            </form>
        </div >
    ));
};

export default PopupWithForm;