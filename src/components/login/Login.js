import React from "react";
import "./style.css";
import log from './img/log.svg';
import loginMain from '../../assets/mainLogo.png';

function Login() {

    return (
        <div className="containerLog">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <img width={350} src={loginMain} alt="" />
                        <h2 className="title">Kirish</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Foydalanuvchi nomi" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Parol" />
                        </div>
                        <input type="submit" value="Kirish" className="btn solid" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="contentLog">
                        <h1>SmartEdu: Ta'limni raqamlashtirishda yangi davrga qadam qo'ying!</h1>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Login;
