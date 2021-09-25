import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ onLog, ...props }) => {
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setpasswordInput] = React.useState('');
    const history = useHistory();

    function handleChangeEmailInput(e) {
        setEmailInput(e.target.value);
    }
    function handleChangePasswordInput(e) {
        setpasswordInput(e.target.value);
    }

    const resetForm = () => {
        setEmailInput('');
        setpasswordInput('');
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
        return () => {
            if (localStorage.getItem("jwt")) {
                history.push("/main");
            }
        }
    }, [history]);

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