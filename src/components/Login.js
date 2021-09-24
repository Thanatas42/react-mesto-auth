import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Auth from '../Auth';

const Login = (props) => {
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setpasswordInput] = React.useState('');
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    function handleChangeEmailInput(e) {
        console.log(emailInput)
        setEmailInput(e.target.value);
    }
    function handleChangePasswordInput(e) {
        console.log(passwordInput)
        setpasswordInput(e.target.value);
    }

    const resetForm = () => {
        setEmailInput('');
        setpasswordInput('');
    };

    const onLog = ({ passwordInput, emailInput }) => {
        return Auth.authorize(passwordInput, emailInput).then((res) => {
            if (!res || !res.token)
                throw new Error("Неправильные имя пользователя или пароль");
            if (res.token) {
                props.setLoggedIn(true);
                localStorage.setItem("jwt", res.token);
            }
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        onLog({ passwordInput, emailInput })
            .then(resetForm)
            .then(() => {
                history.push("/main");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            history.push("/main");
        }
    }, []);

    return (
        <>
            <form className="auth" onSubmit={handleSubmit}>
                <h2 className="auth__title">Вход</h2>
                <input className="auth__input" type="email"
                    placeholder="Email"
                    minLength="2" maxLength="40"
                    required value={emailInput} onChange={handleChangeEmailInput} />
                <input className="auth__input" type="text"
                    placeholder="Пароль"
                    minLength="2" maxLength="40"
                    required value={passwordInput} onChange={handleChangePasswordInput} />
                <button className="auth__confirm-button" type="submit">Войти</button>
                {props.children}
            </form>
        </>
    );
};

export default Login;