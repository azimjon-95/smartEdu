import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";
import { BsFillCaretRightFill } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";
import { HiEye } from "react-icons/hi2";
import image from '../../../assets/profile.jpg'
import './style.css';

const GroupInfoComponent = () => {
    const [selectedDate, setSelectedDate] = useState(""); // State tanimi

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Tanlangan sana qiymatini o'zgartirish
    };

    const lessons = [
        { id: 1, lessonTime: "8:30 AM", honaRaqami: 202, ustozi: "Akbar o'g'li", oquvchilarSoni: 25, groupLevel: "A" },
        { id: 3, lessonTime: "1:00 PM", honaRaqami: 101, ustozi: "Shahzod", oquvchilarSoni: 28, groupLevel: "A" },
        { id: 3, lessonTime: "1:00 PM", honaRaqami: 101, ustozi: "Shahzod", oquvchilarSoni: 28, groupLevel: "A" },
        { id: 2, lessonTime: "10:45 AM", honaRaqami: 305, ustozi: "Mavluda Muqimova", oquvchilarSoni: 30, groupLevel: "B" },
        { id: 3, lessonTime: "1:00 PM", honaRaqami: 101, ustozi: "Shahzod", oquvchilarSoni: 28, groupLevel: "A" },
        { id: 4, lessonTime: "3:15 PM", honaRaqami: 211, ustozi: "Hasan", oquvchilarSoni: 40, groupLevel: "C" },
        { id: 5, lessonTime: "5:30 PM", honaRaqami: 125, ustozi: "Zarif", oquvchilarSoni: 20, groupLevel: "B" },
        { id: 6, lessonTime: "7:45 PM", honaRaqami: 410, ustozi: "Nodir", oquvchilarSoni: 35, groupLevel: "A" },
        { id: 6, lessonTime: "7:45 PM", honaRaqami: 410, ustozi: "Nodir", oquvchilarSoni: 35, groupLevel: "A" },
        { id: 3, lessonTime: "1:00 PM", honaRaqami: 101, ustozi: "Shahzod", oquvchilarSoni: 28, groupLevel: "A" },
        { id: 5, lessonTime: "5:30 PM", honaRaqami: 125, ustozi: "Zarif", oquvchilarSoni: 20, groupLevel: "B" },
        { id: 3, lessonTime: "1:00 PM", honaRaqami: 101, ustozi: "Shahzod", oquvchilarSoni: 28, groupLevel: "A" },
    ];

    return (
        <div className="site-card-border-less-wrapper">
            {/* {lessons.map((lesson) => (
                <Card key={lesson.id} style={{ width: '245px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <div className="card-content">
                        <div className="calendar">
                            <button><FaUsers /></button>
                            <input type="date" id="calendar" value={selectedDate} onChange={handleDateChange} />
                        </div>
                        <h2>SmartEdu<BsFillCaretRightFill /></h2>
                        <div className="image-container">
                            <div className="img1"> </div>
                            <div className="img2"></div>
                            <div className="img3"></div>
                            <div className="img4"></div>
                            <div className="img5">
                                <b>{lesson.oquvchilarSoni > 10 ? `${lesson.oquvchilarSoni}+` : lesson.oquvchilarSoni}</b>
                            </div>
                        </div>
                        <div className="buttons-container">
                            <div className="group-level">
                                <p>Dars vaqti: {lesson.lessonTime}</p>
                                <p>O'quvchilar soni: {lesson.oquvchilarSoni}</p>
                                <p>Guruh darajasi: {lesson.groupLevel}</p>
                                <Link to={`/studentList/${lesson.id}`}>
                                    <Button className='primary1' type="primary"><HiEye /></Button>
                                </Link>
                                <Link to={`/register/${lesson.id}`}>
                                    <Button className='primary' type="primary"><MdLibraryAdd /></Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            ))} */}
        </div>
    );
};

export default GroupInfoComponent;
