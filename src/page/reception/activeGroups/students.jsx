import React, { useState } from 'react';
import { Table, Button, Space, Input, message, notification, Dropdown, Menu } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentsStateMutation } from '../../../context/studentsApi';
import { useGetAllRegistrationsQuery, useUpdateRegistrationMutation } from '../../../context/groupsApi';
import './style.css';  // Ensure this file contains the necessary styles
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import moment from 'moment';
import { GiTwoCoins } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";

const { Search } = Input;

const Students = () => {
    const { data } = useGetStudentQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    const [updateRegistration] = useUpdateRegistrationMutation();
    const { data: registrations } = useGetAllRegistrationsQuery();
    const [updateStudentsState] = useUpdateStudentsStateMutation();

    const navigate = useNavigate();
    const { id } = useParams();
    const result = registrations?.find((i) => i._id === id);

    const student = data?.filter((i) => i.groupId === id);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCoins, setSelectedCoins] = useState(0);
    const [attendanceData, setAttendanceData] = useState({});

    const handleDelete = async (record) => {
        try {
            await deleteStudent(record?._id);
            message.success('Talaba muvaffaqiyatli o\'chirildi');
        } catch (error) {
            message.warning('Talabani o\'chirishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleUpdate = (record) => {
        console.log('Yangilash tugmasi bosildi:', record);
    };

    const handleAddAttendance = async () => {
        if (!selectedStudent) {
            message.warning('O\'quvchi tanlanmagan');
            return;
        }

        try {
            const updatedData = {
                ...attendanceData,
                [selectedStudent._id]: (attendanceData[selectedStudent._id] || 0) + selectedCoins,
            };
            setAttendanceData(updatedData);
            console.log('Davomat qo\'shildi:', selectedStudent, 'Coins:', selectedCoins);

            message.success('Davomat muvaffaqiyatli qo\'shildi');
        } catch (error) {
            message.error('Davomat qo\'shishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleRemoveAttendance = async () => {
        if (!selectedStudent) {
            message.warning('O\'quvchi tanlanmagan');
            return;
        }

        try {
            const updatedData = {
                ...attendanceData,
                [selectedStudent._id]: Math.max((attendanceData[selectedStudent._id] || 0) - selectedCoins, 0),
            };
            setAttendanceData(updatedData);
            console.log('Davomat olib tashlandi:', selectedStudent, 'Coins:', selectedCoins);

            message.success('Davomat muvaffaqiyatli olib tashlandi');
        } catch (error) {
            message.error('Davomat olib tashishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleClearClick = () => {
        navigate(-1);
    };

    const handleCoinChange = (e) => {
        const value = Math.max(Number(e.target.value) || 0, 0);
        setSelectedCoins(value);
    };

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
    };

    const handleCoinSelect = (value) => {
        setSelectedCoins(value);
    };

    const coinMenu = (
        <Menu>
            <Menu.Item key="2">
                <Button onClick={() => handleCoinSelect(2)} style={{ width: '100%' }}>
                    2 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            </Menu.Item>
            <Menu.Item key="5">
                <Button onClick={() => handleCoinSelect(5)} style={{ width: '100%' }}>
                    5 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            </Menu.Item>
            <Menu.Item key="10">
                <Button onClick={() => handleCoinSelect(10)} style={{ width: '100%' }}>
                    10 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            </Menu.Item>
        </Menu>
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Ism Familya',
            key: 'name',
            render: (text, record) => (
                <a onClick={() => handleStudentSelect(record)}>{`${record.firstName} ${record.lastName}`}</a>
            )
        },
        {
            title: 'Yoshi',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date) => {
                const age = moment().diff(date, 'years');
                return `${age} yosh`;
            }
        },
        { title: 'Tel', dataIndex: 'studentPhoneNumber', key: 'studentPhoneNumber' },
        {
            title: 'Coins',
            key: 'coins',
            render: () => (
                <Space size="middle">
                    <span>{selectedCoins} <GiTwoCoins style={{ color: 'gold' }} /></span>
                    <Dropdown overlay={coinMenu}>
                        <Button>
                             Coins<MdArrowDropDown />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
        {
            title: 'Davomat',
            key: 'attendance',
            render: () => (
                <Space size="middle">
                    <Button onClick={handleAddAttendance} type="primary">Sababli</Button>
                    <Button onClick={handleRemoveAttendance} className="red-button">Sababsiz</Button>
                </Space>
            ),
        },
        {
            title: 'Harakatlar',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleUpdate(record)}>Yangilash</Button>
                    <Button 
                        onClick={() => handleDelete(record)} 
                        style={{ backgroundColor: 'red', borderColor: '#D2B9B7', color: '#000' }} 
                        type="danger"
                    >
                        O'chirish
                    </Button>
                </Space>
            ),
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const onSearch = (value) => {
        setSearchTerm(value);
        console.log('Izlash natijasi:', value);
    };

    const onFinish = async () => {
        try {
            const groupData = {
                ...result,
                state: 'active',
            };

            const registrationResponse = await updateRegistration({ id: result?._id, body: groupData });
            console.log(registrationResponse);

            const studentData = {
                state: 'active',
            };
            await updateStudentsState({ groupId: result?._id, body: studentData })
                .then((res) => { console.log(res) })
                .catch((err) => { console.log(err) });

            notification.success({
                message: 'Muvaffaqiyatli',
                description: 'Guruh muvaffaqiyatli ravishda aktivlashdi.',
            });

            navigate("/activeGroups");
            handleClearClick();
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Xatolik',
                description: 'Guruhni aktivlashtirishda xatolik yuz berdi.',
            });
        }
    };

    return (
        <div className="reachStudents_box">
            <div className="reachStudents">
                <Button onClick={handleClearClick} type="primary"><IoArrowBackOutline /></Button>

                <Search
                    placeholder="Qidirish..."
                    onSearch={onSearch}
                    style={{ width: "60%" }}
                    enterButton={false}
                />

                <Link to={`/register/${id}`}>
                    <Button type="primary">Qabul</Button>
                </Link>
            </div>

            <Table pagination={false} size="small" columns={columns} dataSource={student} />
        </div>
    );
};

export default Students;
