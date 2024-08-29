import React, { useState } from 'react';
import { Col, Button, Space, Input, message, Modal, Menu, Dropdown, Row } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentMutation } from '../../../context/studentsApi';
import './style.css';  // Ensure this file contains the necessary styles
import '../../../components/table-Css/css/main.min.css';
import '../../../components/table-Css/css/bulma.min.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import moment from 'moment';
import { useUpdateRegistrationMutation, useGetAllRegistrationsQuery } from '../../../context/groupsApi'

import { DownOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import { PhoneNumberFormat } from '../../../hook/NumberFormat';


const { Search } = Input;

const Students = () => {
    const { data } = useGetStudentQuery();
    const { data: getGroups } = useGetAllRegistrationsQuery();
    const [updateRegistration] = useUpdateRegistrationMutation();
    const [deleteStudent] = useDeleteStudentMutation();
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

                    await updateRegistration({ id: studentData?._id, body: updatedGroupData });
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

    const handleAddAttendance = async (id) => {
        if (!id) {
            message.warning('O\'quvchi tanlanmagan');
            return;
        }

        try {
            message.success('Davomat muvaffaqiyatli qo\'shildi');
        } catch (error) {
            message.error('Davomat qo\'shishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleRemoveAttendance = async (id) => {
        if (!id) {
            return;
        }

        try {
            message.success('Davomat muvaffaqiyatli olib tashlandi');
        } catch (error) {
            message.error('Davomat olib tashishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleClearClick = () => {
        navigate(-1);
    };


    const onSearch = (value) => {
        console.log('Izlash natijasi:', value);
    };


    const renderActionsMenu = (record) => (
        <Menu>
            <Menu.Item icon={<EditOutlined />} onClick={() => handleUpdate(record)}>
                Yangilash
            </Menu.Item>
            <Menu.Item icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                O'chirish
            </Menu.Item>
            <Menu.Item icon={<EyeOutlined />}>
                <Link to={`/student/${record._id}`}>Yagona sahifa</Link>
            </Menu.Item>
        </Menu>
    );

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
                                        <th>Telefon raqami</th>
                                        <th>Telefon raqami</th>
                                        <th>Davomat</th>
                                        <th>Harakatlar</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student?.map((item, index) => (
                                        <tr key={index}>
                                            <td data-label="ID">{index + 1}</td>
                                            <td data-label="Ism Familya">{capitalizeFirstLetter(item.firstName)} {capitalizeFirstLetter(item.lastName)}</td>
                                            <td data-label="Yoshi">{moment().diff(item.dateOfBirth, 'years')}</td>

                                            <td data-label="Telefon raqami" className="is-progress-cell">{PhoneNumberFormat(item.studentPhoneNumber)}</td>
                                            <td data-label="Telefon raqami" className="is-progress-cell">{PhoneNumberFormat(item.parentPhoneNumber)}</td>
                                            <td data-label="Davomat" className="is-progress-cell">
                                                <Space size="middle">
                                                    <Button onClick={() => handleAddAttendance(item?._id)} type="primary">Sababli</Button>
                                                    <Button onClick={() => handleRemoveAttendance(item?._id)} className="red-button">Sababsiz</Button>
                                                </Space>
                                            </td>
                                            <td className="is-actions-cell">
                                                <Dropdown overlay={renderActionsMenu(item)} trigger={['click']}>
                                                    <Button type="primary">
                                                        Harakatlar <DownOutlined />
                                                    </Button>
                                                </Dropdown>
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
                        <Row gutter={[16, 16]} className="responsive-row">
                            <Col span={8}>
                                <Input
                                    name="firstName"
                                    label="Ism"
                                    placeholder="Ism"
                                    value={currentStudent.firstName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="lastName"
                                    label="Familiya"
                                    placeholder="Familiya"
                                    value={currentStudent.lastName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="dateOfBirth"
                                    label="Tug'ilgan sana"
                                    placeholder="YYYY-MM-DD"
                                    value={currentStudent.dateOfBirth}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} className="responsive-row">
                            <Col span={8}>
                                <Input
                                    name="studentPhoneNumber"
                                    label="Talaba telefon raqami"
                                    placeholder="Telefon raqami"
                                    value={currentStudent.studentPhoneNumber}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="parentPhoneNumber"
                                    label="Ota-ona telefon raqami"
                                    placeholder="Telefon raqami"
                                    value={currentStudent.parentPhoneNumber}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="address"
                                    label="Manzil"
                                    placeholder="Manzil"
                                    value={currentStudent.address}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} className="responsive-row">
                            <Col span={8}>
                                <Input
                                    name="gender"
                                    label="Jinsi"
                                    placeholder="Jinsi"
                                    value={currentStudent.gender}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="lessonTime"
                                    label="Dars vaqti"
                                    placeholder="Dars vaqti"
                                    value={currentStudent.lessonTime}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="middleName"
                                    label="Otasining ismi"
                                    placeholder="Otasining ismi"
                                    value={currentStudent.middleName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '8px' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} className="responsive-row">
                            <Col span={8}>
                                <Input
                                    name="teacherFullName"
                                    label="O'qituvchi"
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

export default Students;












// address: "SDF"
// dateOfBirth:"2024-07-04T19:00:00.000Z"
// firstName: "dxvbcfvbn"
// gender: "male"
// groupId: "669f55f13b4c607b2621542f"
// lastName: "cvb nbnm"
// lessonDate: "oddDays"
// lessonTime: "08:00-10:00"
// middleName: "vgbn"
// parentPhoneNumber: "978263223"
// payForLesson: 50000
// studentPhoneNumber: "936766741"
// teacherFullName: ['Azimjon Mamutaliyev']
