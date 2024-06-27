import React, { useState } from 'react';
import { Table, Button, Space, Row, Col, Modal, Form, Input, message, Spin, Alert } from 'antd';
import { useGetAllTeachersQuery, useDeleteTeacherMutation, useUpdateTeacherMutation } from '../../../context/teacherApi'; // Ensure the correct path
import './teachersTable.css';

const TeachersTable = () => {
    const { data: teachers, error, isLoading, refetch } = useGetAllTeachersQuery();
    const [deleteTeacher] = useDeleteTeacherMutation();
    const [updateTeacher] = useUpdateTeacherMutation();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [form] = Form.useForm();
    console.log(teachers);
    const handleDelete = async (id) => {
        try {
            let res = await deleteTeacher(id);
            console.log(res);
            message.success('O‘qituvchi muvaffaqiyatli o‘chirildi');
            refetch();
        } catch (error) {
            message.error('O‘qituvchini o‘chirishda xato yuz berdi');
        }
    };

    const handleEdit = (record) => {
        setEditingTeacher(record);
        form.setFieldsValue(record);
        setIsEditModalVisible(true);
    };

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

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const diffMs = Date.now() - dob.getTime();
        const ageDt = new Date(diffMs);
        return Math.abs(ageDt.getUTCFullYear() - 1970);
    };

    const columns = [
        {
            title: 'FIO',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text, record) => (
                <Space size="middle">
                    {record.firstName} {record.middleName} {record.lastName}
                </Space>
            )
        },
        {
            title: 'Yoshi',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (dateOfBirth) => calculateAge(dateOfBirth),
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Fani',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Amallar',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>Tahrirlash</Button>
                    <Button type="link" danger onClick={() => handleDelete(record._id)}>O‘chirish</Button>
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        return (
            <table className="expanded-table">
                <tbody>
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
                    <tr>
                        <td>Parol:</td>
                        <td>{record.password}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    if (isLoading) {
        return <Spin tip="Yuklanmoqda..." size="large" />;
    }

    if (error) {
        return <Alert message="Xato" description={error.message} type="error" showIcon />;
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={teachers}
                rowKey="id"
                expandable={{
                    expandedRowRender,
                    rowExpandable: record => record.firstName !== 'Not Expandable',
                }}
                pagination={false}
                size="small"
            />
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
                                rules={[{ required: true, message: 'Iltimos, yashash manzilingizni kiriting' }]}
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
                                name="subject"
                                label="Fani"
                                rules={[{ required: true, message: 'Iltimos, fanni tanlang!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Elektron pochta"
                                rules={[
                                    { required: true, message: 'Iltimos, elektron pochtangizni kiriting' },
                                    { type: 'email', message: 'Elektron pochta manzili noto‘g‘ri!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Foydalanuvchi nomi"
                                rules={[{ required: true, message: 'Iltimos, foydalanuvchi nomingizni kiriting' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="salary"
                                label="Maoshi (Foizda)"
                                rules={[{ required: true, message: 'Iltimos, maoshni kiriting' }]}
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
