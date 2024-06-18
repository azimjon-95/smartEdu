import React, { useState } from 'react';
import { Table, Button, Space, Input } from 'antd';
import './style.css'
import { useNavigate, useParams, Link } from 'react-router-dom';

import { IoArrowBackOutline } from "react-icons/io5";

const { Search } = Input;

const StudentList = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    // O'quvchilar ro'yhati
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', age: 22 },
        { id: 2, name: 'Jane Smith', age: 20 },
        { id: 3, name: 'Michael Johnson', age: 21 },
    ]);

    // O'quvchini o'chirish
    const handleDelete = (record) => {
        const updatedStudents = students.filter(student => student.id !== record.id);
        setStudents(updatedStudents);
    };

    // O'quvchini yangilash
    const handleUpdate = (record) => {
        // Bu funksiya o'quvchini yangilash uchun ishlatiladi
        console.log('Update button clicked for:', record);
    };

    const handleClearClick = () => {
        navigate(-1); // Navigate back one page in history
    };

    // Table uchun ustunlar
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Ism', dataIndex: 'name', key: 'name' },
        { title: 'Yosh', dataIndex: 'age', key: 'age' },
        {
            title: 'Harakatlar',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleUpdate(record)}>Yangilash</Button>
                    <Button onClick={() => handleDelete(record)} type="danger">O'chirish</Button>
                </Space>
            ),
        },
    ];


    const [searchTerm, setSearchTerm] = useState('');

    const onSearch = (value) => {
        setSearchTerm(value);
        // Bu yerda siz izlash funksiyasini amalga oshirishingiz mumkin
        console.log('Izlash natijasi:', value);
    };
    return (
        <div className="reachStudents_box">
            <div className="reachStudents">
                <Button onClick={handleClearClick} type="primary"><IoArrowBackOutline /></Button>

                <Search
                    placeholder="Qidirish..."
                    onSearch={onSearch}
                    style={{ width: "60%" }}
                    enterButton={false} // Bu yerda `enterButton`ni false qilib, buttonni yashirish mumkin
                />
                <Button type="primary">darsni boshlash</Button>

                {/* Agar register tugmasini olib tashlamoqchi bo'lsangiz, quyidagi qatorni olib tashlang */}
                <Link to={`/register/${id}`}>
                    <Button type="primary">Qabul</Button>
                </Link>

            </div>

            <Table pagination={false} size="small" columns={columns} dataSource={students} />
        </div>
    )
};

export default StudentList;
