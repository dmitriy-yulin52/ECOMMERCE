import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Loader from "../../../common/Loader/Loader";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './LoginSignUp.scss'
import {userActions} from "../../../../store/reducers/user/actions";
import {snackBarActions} from "../../../../store/reducers/snackBar/snackBarReducer";
import {productActions} from "../../../../store/reducers/product/actions";


const LoginSignUp = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    const {loading, error, isAuth} = useSelector(state => state.user)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const {name, email, password} = user;

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [avatar, setAvatar] = useState('./prof.png');
    const [avatarPreview, setAvatarPreview] = useState('./prof.png');

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.login(loginEmail, loginPassword))
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(userActions.register(myForm))
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({...user, [e.target.name]: e.target.value});
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(snackBarActions.openSnackBar(true))
            dispatch(snackBarActions.setMessage(error))
            dispatch(productActions.clearErrors())
        }
    }, [error])

    useEffect(() => {
        if (isAuth) {
            navigate(redirect, {replace: true});
        }
    }, [redirect, isAuth])

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>Войти</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>Регистрация</p>
                                </div>
                                <button ref={switcherTab}/>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon/>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon/>
                                    <input
                                        type="password"
                                        placeholder="Пароль"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Забыли пароль?</Link>
                                <input type="submit" value="Войти" className="loginBtn"/>
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <FaceIcon/>
                                    <input
                                        type="text"
                                        placeholder="Имя"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon/>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon/>
                                    <input
                                        type="password"
                                        placeholder="Пароль"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview"/>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Регистрация" className="signUpBtn"/>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LoginSignUp;