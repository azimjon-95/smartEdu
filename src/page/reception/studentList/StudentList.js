import React, { useState } from 'react';
import { Col, Button, notification, Input, message, Modal, Row } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentMutation } from '../../../context/studentsApi';
import './style.css';  // Ensure this file contains the necessary styles
import '../../../components/table-Css/css/main.min.css';
import '../../../components/table-Css/css/bulma.min.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { useUpdateRegistrationMutation, useGetAllRegistrationsQuery } from '../../../context/groupsApi'
import { PhoneNumberFormat } from '../../../hook/NumberFormat';
import moment from 'moment';

const { Search } = Input;

const StudentList = () => {
    const { data } = useGetStudentQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    const { data: getGroups } = useGetAllRegistrationsQuery();
    const [updateRegistration] = useUpdateRegistrationMutation();
    const [updateStudentsState] = useUpdateStudentMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);


    const navigate = useNavigate();
    const { id } = useParams();

    const student = data?.filter((i) => i.groupId === id);

    const handleDelete = async (record) => {
        const studentData = getGroups?.find((i) => i._id === record.groupId);
        Modal.confirm({
            title: 'Tasdiqlash',
            content: 'Siz haqiqatan ham ushbu talabani o\'chirmoqchimisiz?',
            okText: 'Ok',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    // Talabani o'chirish
                    await deleteStudent(record._id);

                    // Guruhdagi talabalar sonini yangilash
                    const updatedGroupData = {
                        ...studentData,
                        studentsLength: studentData?.studentsLength - 1,
                    };

                    let res = await updateRegistration({ id: studentData?._id, body: updatedGroupData });
                    message.success('Talaba muvaffaqiyatli o\'chirildi');
                } catch (error) {
                    message.error('Talabani o\'chirishda xatolik yuz berdi');
                    console.error(error);
                }
            },
        });
    };

    const handleUpdate = (record) => {
        setCurrentStudent(record);
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            await updateStudentsState({ id: currentStudent._id, body: currentStudent });
            message.success('Talaba muvaffaqiyatli yangilandi');
            setIsModalVisible(false);
        } catch (error) {
            message.error('Talabani yangilashda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
    };


    const handleClearClick = () => {
        navigate(-1);
    };


    const onSearch = (value) => {
        console.log('Izlash natijasi:', value);
    };

    const onFinish = async () => {
        try {
            await updateRegistration({ id: currentStudent._id, body: { ...currentStudent, state: 'active' } });
            await updateStudentsState({ groupId: currentStudent._id, body: { state: 'active' } });
            notification.success({
                message: 'Muvaffaqiyatli',
                description: 'Guruh muvaffaqiyatli ravishda aktivlashtirildi.',
            });
            navigate("/activeGroups");
            handleClearClick();
        } catch (error) {
            notification.error({
                message: 'Xatolik',
                description: 'Guruhni aktivlashtirishda xatolik yuz berdi.',
            });
            console.error(error);
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
                                        <th>Ota-ona telefon raqami</th>
                                        <th>Harakatlar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student?.map((item, index) => (
                                        <tr key={index}>
                                            <td data-label="ID">{index + 1}</td>
                                            <td data-label="Ism Familya">{item.firstName} {item.lastName}</td>
                                            <td data-label="Yoshi">{moment().diff(item.dateOfBirth, 'years')}</td>
                                            <td data-label="Tel">{PhoneNumberFormat(item.studentPhoneNumber)}</td>
                                            <td data-label="Ota-ona telefon raqami">{PhoneNumberFormat(item.parentPhoneNumber)}</td>
                                            <td data-label="Harakatlar">
                                                <Button onClick={() => handleUpdate(item)} type="primary" size="small">
                                                    Yangilash
                                                </Button>
                                                <Button onClick={() => handleDelete(item)} type="danger" size="small">
                                                    O'chirish
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                title="Talaba ma'lumotlarini yangilash"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                {currentStudent && (
                    <div>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Input
                                    name="firstName"
                                    placeholder="Ism"
                                    value={currentStudent.firstName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="lastName"
                                    placeholder="Familiya"
                                    value={currentStudent.lastName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="dateOfBirth"
                                    placeholder="YYYY-MM-DD"
                                    value={currentStudent.dateOfBirth}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Input
                                    name="studentPhoneNumber"
                                    placeholder="Talaba telefon raqami"
                                    value={currentStudent.studentPhoneNumber}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="parentPhoneNumber"
                                    placeholder="Ota-ona telefon raqami"
                                    value={currentStudent.parentPhoneNumber}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="address"
                                    placeholder="Manzil"
                                    value={currentStudent.address}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Input
                                    name="gender"
                                    placeholder="Jinsi"
                                    value={currentStudent.gender}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="lessonTime"
                                    placeholder="Dars vaqti"
                                    value={currentStudent.lessonTime}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="middleName"
                                    placeholder="Otasining ismi"
                                    value={currentStudent.middleName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Input
                                    name="teacherFullName"
                                    placeholder="O'qituvchi"
                                    value={currentStudent.teacherFullName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default StudentList;
