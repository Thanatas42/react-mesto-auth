import React from 'react';
import approved from ".././images/success/SuccessOk.svg";
import notApproved from ".././images/success/SuccessErr.svg";

function InfoToolTip(props) {
    return ((
        < div className={props.isOpen ? `popup popup_opened popup_type_success` : `popup popup_type_success`} >
            <div className="popup__container" name={props.name} style={{ padding: '60px' }}>
                <img
                    className="popup__success-symbol"
                    src={props.resStatus ? approved : notApproved}
                    alt="approved"
                />
                <h2 className="popup__title" style={{ textAlign: 'center', fontSize: '24px', paddingBottom: '0' }}>
                    {props.resStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                <button className="popup__close-button" type="reset" onClick={props.closeAllPopups}></button>
            </div>
        </div >
    ));
};

export default InfoToolTip;