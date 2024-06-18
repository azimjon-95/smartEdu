import React, { useState } from 'react';
import { Card, Button, Table, Form, Input, Select, message } from 'antd';
import './style.css'
import { MdOutlineClear } from "react-icons/md";
import axios from 'axios';

const { Option } = Select;
const { Search } = Input;

const CreateCards = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false)
    const [studentsData, setStudentsData] = useState([
        { id: 1, name: 'John', surname: 'Doe', age: 25, attendance: 'Mavjud' },
        { id: 2, name: 'Jane', surname: 'Smith', age: 22, attendance: 'Yo\'q' },
        // Kerak bo'lgan ma'lumotlarni qo'shib yuboring
    ]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Ism', dataIndex: 'name', key: 'name' },
        { title: 'Familiya', dataIndex: 'surname', key: 'surname' },
        { title: 'Yoshi', dataIndex: 'age', key: 'age' },
        { title: 'Chakira', dataIndex: 'attendance', key: 'attendance' },
    ];

    const handleFormSubmit = async (values) => {
        // Yangi talaba obyektini yaratish
        const newStudent = {
            id: studentsData.length + 1,
            name: values.name,
            surname: values.surname,
            age: values.age,
            attendance: values.attendance,
        };

        try {
            await axios.post('http://localhost:5000/api/students', values);
            message.success('Student registered successfully');
        } catch (error) {
            message.error('Failed to register student');
        }




    };



    const onSearch = (value) => {
        setSearchTerm(value);
        // Bu yerda siz izlash funksiyasini amalga oshirishingiz mumkin
        console.log('Izlash natijasi:', value);
    };
    return (
        <div className='TableGrups'>
            <div className={`OpenReg ${open ? "OpenRegAll" : "OpenReg"}`}>
                <h2 style={{ textAlign: "center" }}>Yangi gruppaochish!</h2>

                <Form
                    name="registerForm"
                    onFinish={handleFormSubmit}
                    layout="vertical"
                    style={{ padding: "10px" }}
                >
                    <Form.Item
                        name="roomNumber"
                        label="Hona raqami"
                        rules={[{ required: true, message: 'Hona raqamini tanlang!' }]}
                    >
                        <Select>
                            <Option value="101">101</Option>
                            <Option value="102">102</Option>
                            <Option value="103">103</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="lessonTime"
                        label="Dars vaqti"
                        rules={[{ required: true, message: 'Dars vaqtini tanlang!' }]}
                    >
                        <Select>
                            <Option value="08:00-10:00">08:00-10:00</Option>
                            <Option value="10:00-12:00">10:00-12:00</Option>
                            <Option value="13:30-15:30">13:30-15:30</Option>
                            <Option value="15:30-17:30">15:30-17:30</Option>
                            {/* Add more class time options as needed */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="subjects"
                        label="Fanlarni tanlang"
                        rules={[{ required: true, message: 'Fanlarni tanlang!' }]}
                    >
                        <Select mode="multiple">
                            <Option value="Math">Math</Option>
                            <Option value="Science">Science</Option>
                            <Option value="History">History</Option>
                            {/* Add more subject options as needed */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="teachers"
                        label="Ustozlarni tanlang"
                        rules={[{ required: true, message: 'Ustozlarni tanlang!' }]}
                    >
                        <Select mode="multiple">
                            <Option value="Mr. Smith">Mr. Smith</Option>
                            <Option value="Ms. Johnson">Ms. Johnson</Option>
                            <Option value="Mr. Brown">Mr. Brown</Option>
                            {/* Add more teacher options as needed */}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Ro'yxatga yozish
                        </Button>
                        <Button type="primary" danger onClick={() => setOpen(!open)}><MdOutlineClear style={{ fontSize: "18px" }} /></Button>
                    </Form.Item>

                </Form>
            </div>


            <div className="reachStudents_box">
                <div className="reachStudents">
                    <Search
                        placeholder="Qidirish..."
                        onSearch={onSearch}
                        style={{ width: "60%" }}
                        enterButton={false} // Bu yerda `enterButton`ni false qilib, buttonni yashirish mumkin
                    />
                    <Button onClick={() => setOpen(true)}>Gruppa ochish</Button>
                </div>
                <Table
                    dataSource={studentsData}
                    columns={columns}
                    pagination={false} size="small"
                />


            </div>
        </div>
    );
};

export default CreateCards;
