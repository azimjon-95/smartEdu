import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, message, Spin, Alert, Modal, Form, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useGetStudentQuery } from '../../../context/studentsApi';
import { useGetAllTeachersQuery, useDeleteTeacherMutation, useUpdateTeacherMutation } from '../../../context/teacherApi';
import './teachersTable.css';
import '../../../components/table-Css/css/main.min.css';
import '../../../components/table-Css/css/bulma.min.css';
import { UserAddOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import { useGetAllRegistrationsQuery } from '../../../context/groupsApi';
import LoadingSpinner from '../../../components/LoadingSpinner'; // Importing the LoadingSpinner component
import { PhoneNumberFormat } from '../../../hook/NumberFormat';
// import moment from 'moment';

const TeachersTable = () => {
    const { data: students } = useGetStudentQuery();
    const { data: registrations } = useGetAllRegistrationsQuery();
    const { data: teachers, error, isLoading, refetch } = useGetAllTeachersQuery();
    const [deleteTeacher] = useDeleteTeacherMutation();
    const [updateTeacher] = useUpdateTeacherMutation();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    // const [expandedRowKey, setExpandedRowKey] = useState(null);  // State to keep track of the expanded row key

    const studentCounts = useMemo(() => {
        const counts = new Map();
        students?.forEach(student => {
            const teacherIds = JSON.parse(student.teacherId);
            teacherIds.forEach(id => {
                counts.set(id, (counts.get(id) || 0) + 1);
            });
        });
        return counts;
    }, [students]);

    const groupsCounts = useMemo(() => {
        const counts = new Map();
        registrations?.forEach(student => {
            const teacherIds = JSON.parse(student.teacherId);
            teacherIds.forEach(id => {
                counts.set(id, (counts.get(id) || 0) + 1);
            });
        });
        return counts;
    }, [registrations]);

    // const handleDelete = async (id) => {
    //     try {
    //         await deleteTeacher(id);
    //         message.success('O‘qituvchi muvaffaqiyatli o‘chirildi');
    //         refetch();
    //     } catch (error) {
    //         message.error('O‘qituvchini o‘chirishda xato yuz berdi');
    //     }
    // };

    const handleEditSubmit = async (values) => {
        try {
            await updateTeacher({ id: editingTeacher._id, ...values });
            message.success('O‘qituvchi muvaffaqiyatli yangilandi');
            setIsEditModalVisible(false);
            refetch();
        } catch (error) {
            message.error('O‘qituvchini yangilashda xato yuz berdi');
        }
    };




    const onSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = teachers?.filter(s =>
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (isLoading) {
        return <div style={{ width: "100%", heght: "500px", display: "flex", justifyContent: "center" }}><Spin tip="Yuklanmoqda..." size="large" /></div>;
    }

    if (error) {
        return <Alert message="Xato" description={error.message} type="error" showIcon />;
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "20px", padding: "0 10px" }}>
                <Input
                    placeholder="Qidirish..."
                    onChange={onSearch}
                    style={{ width: "60%", margin: "auto" }}
                />
                <Link to="/createTeacher">
                    <Button><UserAddOutlined /></Button>
                </Link>
            </div>

            <section style={{ padding: "0", margin: "0" }} className="section">
                <div style={{ padding: "0", margin: "0" }} className="container">
                    <div className="b-table">
                        <div className="table-wrapper has-mobile-cards">
                            <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>FIO</th>
                                        <th>Telefon</th>
                                        <th>Fani</th>
                                        <th>Gruhlar soni</th>
                                        <th>O'quvchilar soni</th>
                                        <th>Batafsil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.map((item, index) => (
                                        <tr key={index}>
                                            <td data-label="FIO">{capitalizeFirstLetter(item.firstName)} {item.lastName}</td>
                                            <td data-label="Telefon">{PhoneNumberFormat(item.phone)}</td>
                                            <td data-label="Fani">{capitalizeFirstLetter(item.subject)}</td>
                                            <td data-label="Gruhlar soni">{groupsCounts.get(item._id) || 0}</td>
                                            <td data-label="O'quvchilar soni">{studentCounts.get(item._id) || 0}</td>
                                            <td data-label="Batafsil">
                                                <Link to={`/worker/${item._id}`} className="icon-link">
                                                    <i className="fas fa-info-circle"></i>
                                                </Link>
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
                title="O‘qituvchini tahrirlash"
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            handleEditSubmit(values);
                        })
                        .catch(info => {
                            console.log('Tasdiqlashda xato:', info);
                        });
                }}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="Ism"
                                rules={[{ required: true, message: 'Iltimos, ismingizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="middleName"
                                label="Otasining ismi"
                                rules={[{ required: true, message: 'Iltimos, otangizning ismini kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Familiya"
                                rules={[{ required: true, message: 'Iltimos, familiyangizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateOfBirth"
                                label="Tug‘ilgan sana"
                                rules={[{ required: true, message: 'Iltimos, tug‘ilgan sanangizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Jinsi"
                                rules={[{ required: true, message: 'Iltimos, jinsingizni tanlang' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="nationality"
                                label="Millati"
                                rules={[{ required: true, message: 'Iltimos, millatingizni tanlang' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="maritalStatus"
                                label="Oilaviy holati"
                                rules={[{ required: true, message: 'Iltimos, oilaviy holatingizni tanlang' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Manzili"
                                rules={[{ required: true, message: 'Iltimos, manzilingizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Telefon"
                                rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Elektron pochta"
                                rules={[{ required: true, message: 'Iltimos, elektron pochtangizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="subject"
                                label="Fani"
                                rules={[{ required: true, message: 'Iltimos, faningizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="salary"
                                label="Maoshi (Foizda)"
                                rules={[{ required: true, message: 'Iltimos, maoshingizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Login"
                                rules={[{ required: true, message: 'Iltimos, login kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Parol"
                                rules={[{ required: true, message: 'Iltimos, parol kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default TeachersTable;



// const calculateAge = (dateOfBirth) => {
//     const dob = new Date(dateOfBirth);
//     const diffMs = Date.now() - dob.getTime();
//     const ageDt = new Date(diffMs);
//     return Math.abs(ageDt.getUTCFullYear() - 1970);
// };

{/* <tbody>
<tr>
    <td>Tug‘ilgan sana:</td>
    <td>{new Date(record.dateOfBirth).toLocaleDateString()}</td>
</tr>
<tr>
    <td>Jinsi:</td>
    <td>{record.gender}</td>
</tr>
<tr>
    <td>Millati:</td>
    <td>{record.nationality}</td>
</tr>
<tr>
    <td>Oilaviy holati:</td>
    <td>{record.maritalStatus}</td>
</tr>
<tr>
    <td>Manzili:</td>
    <td>{record.address}</td>
</tr>
<tr>
    <td>Elektron pochta:</td>
    <td>{record.email}</td>
</tr>
<tr>
    <td>Maoshi (Foizda):</td>
    <td>{record.salary}</td>
</tr>
<tr>
    <td>Login:</td>
    <td>{record.username}</td>
</tr>
{/* <tr>
    <td>Parol:</td>
    <td>{record.password}</td>
</tr> */}
{/* <tr>
    <td colSpan="2">
        <Space size="middle">
            <Button type="link" onClick={() => handleEdit(record)}>Tahrirlash</Button>
            <Button type="link" danger onClick={() => handleDelete(record._id)}>O‘chirish</Button>
        </Space>
    </td>
</tr> */}
// </tbody > * /}