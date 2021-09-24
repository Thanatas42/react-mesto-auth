import React from 'react';

function Success(props) {
    return ((
        < div className={props.isOpen ? `popup popup_opened popup_type_success` : `popup popup_type_success`} >
            <form className="popup__container" name={props.name} style={{padding: '60px'}}>
                {props.children}
                <button className="popup__close-button" type="reset" onClick={props.closeAllPopups}></button>
            </form>
        </div >
    ));
};

export default Success;