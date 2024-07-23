import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../../assets/eng.jpg';
import image2 from '../../../assets/eng1.jpg';
import image3 from '../../../assets/eng2.png';
import image4 from '../../../assets/eng3.jpg';
import image5 from '../../../assets/eng4.jpg';
import { FaUsers } from "react-icons/fa";
import { FaWeebly } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { BsDoorOpen } from "react-icons/bs";
import './style.css';
import { useGetAllRegistrationsQuery } from '../../../context/groupsApi';

const NewGrupps = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const { data: gruups } = useGetAllRegistrationsQuery();
    const data = gruups?.filter((i) => i.state === "new") // active

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8333', '#33FFF1', '#8333FF', '#33FF83', '#FF3333', '#33FFA5'];
    const images = [image1, image2, image3, image4, image5];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors?.length);
        return colors[randomIndex];
    };

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images?.length);
        return images[randomIndex];
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const getScheduleText = (schedule) => {
        switch (schedule) {
            case 'oddDays':
                return 'D,CH,J';
            case 'evenDays':
                return 'S,P,SH';
            case 'allDays':
                return 'Har kuni';
            default:
                return schedule;
        }
    };
    return (
        <div className="site-card-border-less">
            {data?.map((lesson, inx) => (
                <div key={inx} className="boxGroups">
                    <div className="top-bar" style={{ backgroundColor: getRandomColor() }}></div>
                    <div className="top">
                        <Link to={`/register/${lesson._id}`}>
                            <IoMdPersonAdd className="fa-check-circle" />
                        </Link>
                    </div>
                    <div className="content">
                        <img src={getRandomImage()} alt="Lesson Image" />
                        <strong>{lesson.subjects}</strong>
                        <p>{lesson.teachers}</p>
                        <div className="length_students">
                            <div className="iconBox">
                                <FaWeebly /> {getScheduleText(lesson?.schedule)}
                            </div>
                            <p>|</p>
                            <div className="iconBox">
                                <IoTimeOutline />  {lesson?.lessonTime}
                            </div>
                        </div>
                        <div className="length_students">
                            <div className="iconBox">
                                <FaUsers /> {lesson?.studentsLength}
                            </div>
                            <p>|</p>
                            <div className="iconBox">
                                <BsDoorOpen />  {lesson?.roomNumber}
                            </div>
                            <p>|</p>
                            <Link to={`/studentList/${lesson._id}`}>
                                <a>Kirish</a>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewGrupps;