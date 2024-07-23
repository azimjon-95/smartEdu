import React, { useState } from 'react';
import { Table, Button, Space, Input, message, notification } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentsStateMutation } from '../../../context/studentsApi';
import { useGetAllRegistrationsQuery, useUpdateRegistrationMutation } from '../../../context/groupsApi';
import './style.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import moment from 'moment';

const { Search } = Input;

const StudentList = () => {
    const { data } = useGetStudentQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    const [updateRegistration] = useUpdateRegistrationMutation();
    const { data: registrations } = useGetAllRegistrationsQuery();
    const [updateStudentsState] = useUpdateStudentsStateMutation();

    const navigate = useNavigate();
    const { id } = useParams();
    const result = registrations?.filter((i) => i._id === id)[0];

    // data ni studentlarga o'tkazamiz
    const student = data?.filter((i) => i.groupId === id)

    // O'quvchini o'chirish
    const handleDelete = async (record) => {
        console.log(record._id);
        try {
            await deleteStudent(record?._id);
            message.success(`Talaba muvaffaqiyatli o'chirildi`);
        } catch (error) {
            message.warning('Talabani o\'chirishda xatolik yuz berdi');
            console.error(error);
        }
    };

    // O'quvchini yangilash
    const handleUpdate = (record) => {
        console.log('Yangilash tugmasi bosildi:', record);
    };

    const handleClearClick = () => {
        navigate(-1);
    };

    // Table uchun ustunlar
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Ism Familya',
            key: 'name',
            render: (text, record) => `${record.firstName} ${record.lastName}`
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
        console.log('Izlash natijasi:', value);
    };


    const onFinish = async () => {
        try {
            const groupData = {
                ...result,
                state: 'active',
            };

            // Guruhni yangilash
            const registrationResponse = await updateRegistration({ id: result?._id, body: groupData });
            console.log(registrationResponse);

            notification.success({
                message: 'Muvaffaqiyatli',
                description: 'Guruh muvaffaqiyatli ravishda aktivlashdi.',
            });


            await updateStudentsState(result.groupId)
                .then((res) => { console.log(res) })
                .catch((err) => { console.log(err) })



            // Qo'shimcha amallar
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
                <Button onClick={onFinish} type="primary">Darsni boshlash</Button>

                <Link to={`/register/${id}`}>
                    <Button type="primary">Qabul</Button>
                </Link>
            </div>

            <Table pagination={false} size="small" columns={columns} dataSource={student} />
        </div>
    );
};

export default StudentList;
