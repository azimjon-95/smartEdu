// Login.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./style.css";
import log from './img/log.svg';
import loginMain from '../../assets/mainLogo.png';
import axios from "../../api";

function Login({ setIsLoggedIn }) {
    const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (admin) {
            const routes = {
                owner: "/reports",
                reception: "/receptionHome",
                doctor: "/appointments",
            };
            navigate(routes[admin]);
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        if (!data.username || !data.password) {
            if (!data.username) {
                setError("username", { type: "manual", message: "Iltimos foydalanuvchi nomini kiriting" });
            }
            if (!data.password) {
                setError("password", { type: "manual", message: "Iltimos parolni kiriting" });
            }
            setTimeout(() => {
                clearErrors();
            }, 2000);
            return;
        }

        try {
            const res = await axios.post("/api/teacher/signin", data);
            if (res.data.token) {
                const { token, teacher } = res.data;
                localStorage.setItem("token", token); // Tokenni saqlash
                localStorage.setItem(" teacherId", teacher._id);
                setIsLoggedIn(true);
                message.success("Tizimga kirish muvaffaqiyatli yakunlandi!");
                navigate("/reports");
            } else {
                message.error("Kirishda xatolik yuz berdi");
            }
        } catch (error) {
            message.error("Kirishda xatolik yuz berdi");
            console.error(error);
        }

        reset();
    };

    return (
        <div className="containerLog">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form formLog">
                        <img width={350} src={loginMain} alt="" />

                        <h2 className="title">Tizimga kirish</h2>
                        <div className={`input-field ${errors.username ? 'error' : ''}`}>
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder={errors.username ? errors.username.message : "Foydalanuvchi nomi"}
                                {...register("username")}
                            />
                        </div>
                        <div className={`input-field ${errors.password ? 'error' : ''}`}>
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder={errors.password ? errors.password.message : "Parol"}
                                {...register("password")}
                            />
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
