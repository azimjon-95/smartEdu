import React, { useState } from 'react';
import { Table, Button, Space, Input, message, notification } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentsStateMutation } from '../../../context/studentsApi';
import { useGetAllRegistrationsQuery, useUpdateRegistrationMutation } from '../../../context/groupsApi';
import './style.css';
import '../../../components/table-Css/css/main.min.css';
import '../../../components/table-Css/css/bulma.min.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import moment from 'moment';
import { PhoneNumberFormat } from '../../../hook/NumberFormat';

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

            // Qo'shimcha amallar
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
                <Button onClick={onFinish} type="primary">Darsni boshlash</Button>

                <Link to={`/register/${id}`}>
                    <Button type="primary">Qabul</Button>
                </Link>
            </div>

            <section style={{ padding: "0", margin: "0" }} className="section">
                <div style={{ padding: "0", margin: "0" }} className="container">
                    <div className="b-table">
                        <div className="table-wrapper has-mobile-cards">
                            <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ism Familya</th>
                                        <th>Yoshi</th>
                                        <th>Tel</th>
                                        <th>Ote ona telefon raqami</th>
                                        <th>Harakatlar</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student?.map((item, index) => (
                                        <tr key={index}>

                                            <td data-label="ID">{index + 1}</td>
                                            <td data-label="Ism Familya">{item.firstName} {item.lastName}</td>
                                            <td data-label="Yoshi">{moment().diff(item.dateOfBirth, 'years')}</td>
                                            <td data-label="Tel" className="is-progress-cell">{PhoneNumberFormat(item.studentPhoneNumber)} </td>
                                            <td data-label="Ote ona telefon raqami" className="is-progress-cell">{PhoneNumberFormat(item.parentPhoneNumber)} </td>
                                            <td className="is-actions-cell">
                                                <div className="buttons is-right">
                                                    <button onClick={() => handleUpdate(item)} className="button is-small is-primary" type="button">
                                                        <span className="icon">
                                                            <i className="mdi mdi-pencil"></i>
                                                        </span>
                                                    </button>
                                                    <button onClick={() => handleDelete(item)} className="button is-small is-danger jb-modal" data-target="sample-modal" type="button">
                                                        <span className="icon">
                                                            <i className="mdi mdi-trash-can"></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentList;
