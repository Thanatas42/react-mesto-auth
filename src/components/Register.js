import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Success from './Success';
import approved from ".././images/success/SuccessOk.svg";
import notApproved from ".././images/success/SuccessErr.svg";
import * as Auth from '../Auth';


const Register = (props) => {
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setpasswordInput] = React.useState('');
    const [successRes, setSuccessRes] = React.useState(true);
    const [route, setroute] = React.useState('');
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    function handleChangeEmailInput(e) {
        setEmailInput(e.target.value);
    }
    function handleChangePasswordInput(e) {
        setpasswordInput(e.target.value);
    }

    const onReg = ({ passwordInput, emailInput }) => {
        return Auth.register(passwordInput, emailInput).then((res) => {
            if (!res || res.statusCode === 400) {
                throw new Error("Что-то пошло не так");
            } else
                return res;
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        onReg({ passwordInput, emailInput })
            .then(() => {
                setSuccessRes(true);
                setIsOpen(true);
                setroute('/sign-in');
            })
            .catch((err) => {
                setSuccessRes(false);
                setIsOpen(true);
                setroute('/sign-up');
                console.log(err);
            });
    }

    const onPopupClosed = () => {
        setIsOpen(false);
        history.push(route);
    };

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            history.push("/main");
        }
    }, []);

    return (
        <>
            <form className="auth" onSubmit={handleSubmit}>
                <h2 className="auth__title">Регистрация</h2>
                <input className="auth__input" type="email"
                    placeholder="Email"
                    minLength="2" maxLength="40"
                    required value={emailInput} onChange={handleChangeEmailInput} />
                <input className="auth__input" type="text"
                    placeholder="Пароль"
                    minLength="2" maxLength="40"
                    required value={passwordInput} onChange={handleChangePasswordInput} />
                <button className="auth__confirm-button" type="submit">Зарегистрироваться</button>
                {props.children}
            </form>
            <Success isOpen={isOpen} closeAllPopups={onPopupClosed}>
                <img
                    className="popup__success-symbol"
                    src={successRes ? approved : notApproved}
                    alt="approved"
                />
                <h2 className="popup__title" style={{ textAlign: 'center', fontSize: '24px', paddingBottom: '0' }}>
                    {successRes ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </Success>
        </>
    );
};

export default Register;