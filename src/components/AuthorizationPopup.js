function AuthorizationPopup(props) {

    return (
        <>
            <form className="auth">
                <h2 className="auth__title">{props.title}</h2>
                <input className="auth__input" type="email"
                    placeholder="Email"
                    minLength="2" maxLength="40"
                    required />
                <input className="auth__input" type="text"
                    placeholder="Пароль"
                    minLength="2" maxLength="40"
                    required />
                <button className="auth__confirm-button" type="submit">{props.confirm}</button>
                {props.children}
            </form>
        </>
    );
};

export default AuthorizationPopup;