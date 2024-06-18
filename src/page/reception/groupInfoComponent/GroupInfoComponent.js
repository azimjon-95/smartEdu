import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import './style.css'

const GroupInfoComponent = () => {
    // Array tuzish
    const lessons = [
        { id: 1, lessonTime: "8:30 AM", honaRaqami: 202, ustozi: "Akbar o'g'li", oquvchilarSoni: 25 },
        { id: 2, lessonTime: "10:45 AM", honaRaqami: 305, ustozi: "Mavluda Muqimova", oquvchilarSoni: 30 },
        { id: 3, lessonTime: "1:00 PM", honaRaqami: 101, ustozi: "Shahzod", oquvchilarSoni: 28 },
        { id: 4, lessonTime: "3:15 PM", honaRaqami: 211, ustozi: "Hasan", oquvchilarSoni: 40 },
        { id: 5, lessonTime: "5:30 PM", honaRaqami: 125, ustozi: "Zarif", oquvchilarSoni: 20 },
        { id: 6, lessonTime: "7:45 PM", honaRaqami: 410, ustozi: "Nodir", oquvchilarSoni: 35 }
    ];
    return (
        <div className="site-card-border-less-wrapper">
            {
                lessons.map((lesson) => (
                    <Card key={lesson.id} style={{ width: '245px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <div >
                            <h2>Group Information</h2>
                            <p>Dars vaqti: <span>{lesson.lessonTime}</span></p>
                            <p>Xona raqami: <span>{lesson.honaRaqami}</span></p>
                            <p>Ustozi: <span>{lesson.ustozi}</span></p>
                            <p>O'quvchilar soni: <span>{lesson.oquvchilarSoni}</span></p>
                            <Link to={`/studentList/${lesson.id}`}>
                                <Button type="primary">Ko'rish</Button>
                            </Link>
                            <Link to={`/register/${lesson.id}`}>
                                <Button type="primary">Qushish</Button>
                            </Link>
                        </div>
                    </Card>
                ))
            }
        </div>
    );
};

export default GroupInfoComponent;