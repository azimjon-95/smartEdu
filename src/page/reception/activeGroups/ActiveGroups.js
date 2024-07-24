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
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat';
import { BsDoorOpen } from "react-icons/bs";
import './style.css';
import { useGetAllRegistrationsQuery } from '../../../context/groupsApi';
import { Input, Select, Empty } from 'antd';
import { SearchOutlined, DollarOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const GroupInfoComponent = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const { data: gruups } = useGetAllRegistrationsQuery();
    const data = gruups?.filter((i) => i.state === "active") // active
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedSubjects, setSelectedSubjects] = useState(null);

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

    // O'qituvchi tanlanganda ma'lumotlarni olish
    const handleTeacherChange = value => {
        setSelectedTeacher(value);
    };

    // Unikal o'qituvchilar nomlarini yig'ish
    const teacherNames = Array.from(
        new Set(data?.flatMap(s => s.teachers))
    );

    // Unikal fanlar nomlarini yig'ish
    const subjectsNames = Array.from(
        new Set(data?.flatMap(s => s.subjects))
    );
    // Fanlar tanlanganda ma'lumotlarni olish
    const handleSubjectsChange = value => {
        setSelectedSubjects(value);
    };

    const filteredData = data?.filter((g) => {
        const matchesTeacher = selectedTeacher ? g?.subjects?.includes(selectedTeacher) : true;
        const searchTermLower = searchTerm?.toLowerCase();
        const matchesSearchTerm = g?.teachers?.some(teacher =>
            teacher?.toLowerCase()?.includes(searchTermLower)
        ) || g?.roomNumber?.toLowerCase()?.includes(searchTermLower) ||
            g?.subjects?.toLowerCase()?.includes(searchTermLower);
        return matchesTeacher && matchesSearchTerm;
    });
    // Tanlangan o'qituvchiga qarab o'quvchilarni filtrlash

    return (
        <div className="site-card-border-less">

            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "0 10px", marginTop: "8px" }}>
                <Input
                    placeholder="O'quvchilarni qidirish"
                    style={{ width: "100%" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
                <Select
                    style={{ width: 200 }}
                    placeholder="O'qituvchini tanlang"
                    onChange={handleTeacherChange}
                    value={selectedTeacher}
                >
                    <Option value={null}>Ustozlar</Option>
                    {teacherNames?.map(name => (
                        <Option key={name} value={name}>
                            {name}
                        </Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 200 }}
                    placeholder="O'qituvchini tanlang"
                    onChange={handleSubjectsChange}
                    value={selectedSubjects}
                >
                    <Option value={null}>Fanlar</Option>
                    {subjectsNames?.map(name => (
                        <Option key={name} value={name}>
                            {name}
                        </Option>
                    ))}
                </Select>
            </div>
            {data?.length === 0 ? (
                <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Empty description="Ma'lumot yo'q" />
                </div>
            ) : (
                filteredData?.map((lesson, inx) => (
                    <div key={inx} className="boxGroups">
                        <div className="top-bar" style={{ backgroundColor: getRandomColor() }}></div>
                        <div style={{ width: "15px", height: "15px" }}></div>
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
                ))
            )}
        </div>
    );
};



export default GroupInfoComponent;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import image1 from '../../../assets/eng.jpg';
// import image2 from '../../../assets/eng1.jpg';
// import image3 from '../../../assets/eng2.png';
// import image4 from '../../../assets/eng3.jpg';
// import image5 from '../../../assets/eng4.jpg';
// import { FaUsers, FaWeebly } from "react-icons/fa";
// import { IoTimeOutline } from "react-icons/io5";
// import { BsDoorOpen } from "react-icons/bs";
// import './style.css';
// import { useGetAllRegistrationsQuery } from '../../../context/groupsApi';
// import { Input, Select, Empty } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';

// const { Option } = Select;

// const GroupInfoComponent = () => {
//     const [selectedDate, setSelectedDate] = useState("");
//     const { data: gruups } = useGetAllRegistrationsQuery();
//     const data = gruups?.filter((i) => i.state === "active");
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedTeacher, setSelectedTeacher] = useState(null);
//     const [selectedSubjects, setSelectedSubjects] = useState(null);

//     const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8333', '#33FFF1', '#8333FF', '#33FF83', '#FF3333', '#33FFA5'];
//     const images = [image1, image2, image3, image4, image5];

//     const getRandomColor = () => {
//         const randomIndex = Math.floor(Math.random() * colors.length);
//         return colors[randomIndex];
//     };

//     const getRandomImage = () => {
//         const randomIndex = Math.floor(Math.random() * images.length);
//         return images[randomIndex];
//     };

//     const handleDateChange = (e) => {
//         setSelectedDate(e.target.value);
//     };

//     const getScheduleText = (schedule) => {
//         switch (schedule) {
//             case 'oddDays':
//                 return 'D,CH,J';
//             case 'evenDays':
//                 return 'S,P,SH';
//             case 'allDays':
//                 return 'Har kuni';
//             default:
//                 return schedule;
//         }
//     };

//     // O'qituvchi tanlanganda ma'lumotlarni olish
//     const handleTeacherChange = value => {
//         setSelectedTeacher(value);
//     };

//     // Fan tanlanganda ma'lumotlarni olish
//     const handleSubjectsChange = value => {
//         setSelectedSubjects(value);
//     };

//     // Unikal o'qituvchilar nomlarini yig'ish
//     const teacherNames = Array.from(
//         new Set(data?.flatMap(s => s.teachers))
//     );

//     // Unikal fanlar nomlarini yig'ish
//     const subjectsNames = Array.from(
//         new Set(data?.flatMap(s => s.subjects))
//     );

//     const filteredData = data?.filter((g) => {
//         const matchesTeacher = selectedTeacher ? g?.teachers?.includes(selectedTeacher) : true;
//         const matchesSubjects = selectedSubjects ? g?.subjects?.includes(selectedSubjects) : true;
//         const searchTermLower = searchTerm?.toLowerCase();
//         const matchesSearchTerm = g?.teachers?.some(teacher =>
//             teacher?.toLowerCase()?.includes(searchTermLower)
//         ) || g?.roomNumber?.toLowerCase()?.includes(searchTermLower) ||
//             g?.subjects?.some(subject => subject?.toLowerCase()?.includes(searchTermLower));
//         return matchesTeacher && matchesSubjects && matchesSearchTerm;
//     });

//     return (
//         <div className="site-card-border-less">
//             <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "0 10px", marginTop: "8px" }}>
//                 <Input
//                     placeholder="O'quvchilarni qidirish"
//                     style={{ width: "100%" }}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
//                 />
//                 <Select
//                     style={{ width: 200 }}
//                     placeholder="O'qituvchini tanlang"
//                     onChange={handleTeacherChange}
//                     value={selectedTeacher}
//                 >
//                     <Option value={null}>Ustozlar</Option>
//                     {teacherNames.map(name => (
//                         <Option key={name} value={name}>
//                             {name}
//                         </Option>
//                     ))}
//                 </Select>
//                 <Select
//                     style={{ width: 200 }}
//                     placeholder="Fanlarni tanlang"
//                     onChange={handleSubjectsChange}
//                     value={selectedSubjects}
//                 >
//                     <Option value={null}>Fanlar</Option>
//                     {subjectsNames.map(name => (
//                         <Option key={name} value={name}>
//                             {name}
//                         </Option>
//                     ))}
//                 </Select>
//             </div>
//             {data?.length === 0 ? (
//                 <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                     <Empty description="Ma'lumot yo'q" />
//                 </div>
//             ) : (
//                 filteredData?.map((lesson, inx) => (
//                     <div key={inx} className="boxGroups">
//                         <div className="top-bar" style={{ backgroundColor: getRandomColor() }}></div>
//                         <div style={{ width: "15px", height: "15px" }}></div>
//                         <div className="content">
//                             <img src={getRandomImage()} alt="Lesson Image" />
//                             <strong>{lesson.subjects}</strong>
//                             <p>{lesson.teachers}</p>
//                             <div className="length_students">
//                                 <div className="iconBox">
//                                     <FaWeebly /> {getScheduleText(lesson?.schedule)}
//                                 </div>
//                                 <p>|</p>
//                                 <div className="iconBox">
//                                     <IoTimeOutline />  {lesson?.lessonTime}
//                                 </div>
//                             </div>
//                             <div className="length_students">
//                                 <div className="iconBox">
//                                     <FaUsers /> {lesson?.studentsLength}
//                                 </div>
//                                 <p>|</p>
//                                 <div className="iconBox">
//                                     <BsDoorOpen />  {lesson?.roomNumber}
//                                 </div>
//                                 <p>|</p>
//                                 <Link to={`/studentList/${lesson._id}`}>
//                                     <a>Kirish</a>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default GroupInfoComponent;