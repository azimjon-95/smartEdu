import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { useGetAllTeachersQuery, useDeleteTeacherMutation, useUpdateTeacherMutation } from '../../../context/teacherApi'; // Ensure the correct path
import './teachersTable.css';

const TeachersTable = () => {
    const { data: teachers, error, isLoading } = useGetAllTeachersQuery();
    const [deleteTeacher] = useDeleteTeacherMutation();
    const [updateTeacher] = useUpdateTeacherMutation();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [form] = Form.useForm();

    const handleDelete = async (id) => {
        try {
            await deleteTeacher(id).unwrap();
            message.success('Teacher deleted successfully');
        } catch (error) {
            message.error('Failed to delete teacher');
        }
    };

    const handleEdit = (record) => {
        setEditingTeacher(record);
        form.setFieldsValue(record);
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = async (values) => {
        try {
            await updateTeacher({ id: editingTeacher.id, ...values }).unwrap();
            message.success('Teacher updated successfully');
            setIsEditModalVisible(false);
        } catch (error) {
            message.error('Failed to update teacher');
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
                    {record.firstName}{record.lastName}{record.middleName}
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
            title: 'Fanni',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
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
                        <td>Millat:</td>
                        <td>{record.nationality}</td>
                    </tr>
                    <tr>
                        <td>Oilaviy holat:</td>
                        <td>{record.maritalStatus}</td>
                    </tr>
                    <tr>
                        <td>Manzil:</td>
                        <td>{record.address}</td>
                    </tr>
                    <tr>
                        <td>Elektron pochta:</td>
                        <td>{record.email}</td>
                    </tr>
                    <tr>
                        <td>Maosh (Foizda):</td>
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
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
            />
            <Modal
                title="Edit Teacher"
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            handleEditSubmit(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="firstName"
                        label="Ism"
                        rules={[{ required: true, message: 'Iltimos, ismingizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="middleName"
                        label="Otasining ismi"
                        rules={[{ required: true, message: 'Iltimos, otangizning ismini kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Familiya"
                        rules={[{ required: true, message: 'Iltimos, familiyangizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dateOfBirth"
                        label="Tug‘ilgan sana"
                        rules={[{ required: true, message: 'Iltimos, tug‘ilgan sanangizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Jinsi"
                        rules={[{ required: true, message: 'Iltimos, jinsingizni tanlang' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nationality"
                        label="Millat"
                        rules={[{ required: true, message: 'Iltimos, millatingizni tanlang' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="maritalStatus"
                        label="Oilaviy holat"
                        rules={[{ required: true, message: 'Iltimos, oilaviy holatingizni tanlang' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Manzil"
                        rules={[{ required: true, message: 'Iltimos, yashash manzilingizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Telefon"
                        rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Fan"
                        rules={[{ required: true, message: 'Iltimos, fanni tanlang!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Elektron pochta"
                        rules={[{ required: true, message: 'Iltimos, elektron pochtangizni kiriting' }, { type: 'email', message: 'Elektron pochta manzili noto‘g‘ri!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Foydalanuvchi nomi"
                        rules={[{ required: true, message: 'Iltimos, foydalanuvchi nomingizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="salary"
                        label="Maosh (Foizda)"
                        rules={[{ required: true, message: 'Iltimos, maoshni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TeachersTable;


