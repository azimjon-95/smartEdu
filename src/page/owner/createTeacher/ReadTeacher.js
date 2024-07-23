import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Input, message, Spin, Alert, Modal, Form, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useGetStudentQuery } from '../../../context/studentsApi';
import { useGetAllTeachersQuery, useDeleteTeacherMutation, useUpdateTeacherMutation } from '../../../context/teacherApi';
import './teachersTable.css';
import { UserAddOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import { useGetAllRegistrationsQuery } from '../../../context/groupsApi';

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
    const [expandedRowKey, setExpandedRowKey] = useState(null);  // State to keep track of the expanded row key

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

    const handleDelete = async (id) => {
        try {
            await deleteTeacher(id);
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
                    {capitalizeFirstLetter(record.firstName)}{capitalizeFirstLetter(record.middleName)}{capitalizeFirstLetter(record.lastName)}
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
            render: (subject) => capitalizeFirstLetter(subject),
        },
        {
            title: "Gruhlar soni",
            render: (record) => groupsCounts.get(record._id) || 0,
        },
        {
            title: "O'quvchilar soni",
            render: (record) => studentCounts.get(record._id) || 0,
        },
    ];

    const onSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = teachers?.filter(s =>
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {/* <tr>
                        <td>Parol:</td>
                        <td>{record.password}</td>
                    </tr> */}
                    <tr>
                        <td colSpan="2">
                            <Space size="middle">
                                <Button type="link" onClick={() => handleEdit(record)}>Tahrirlash</Button>
                                <Button type="link" danger onClick={() => handleDelete(record._id)}>O‘chirish</Button>
                            </Space>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };
    const handleExpand = (expanded, record) => {
        setExpandedRowKey(expanded ? record._id : null);
    };

    if (isLoading) {
        return <div style={{ width: "100%", heght: "500px", display: "flex", justifyContent: "center" }}><Spin tip="Yuklanmoqda..." size="large" /></div>;
    }

    if (error) {
        return <Alert message="Xato" description={error.message} type="error" showIcon />;
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
            <Table
                columns={columns}
                dataSource={filteredData}
                bordered={true}
                rowKey="_id"
                expandable={{
                    expandedRowRender,
                    rowExpandable: record => record.firstName !== 'Not Expandable',
                    expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
                    onExpand: handleExpand,
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






// import React, { useState } from 'react';
// import { Table, Button, Space, Row, Col, Modal, Form, Input, message, Spin, Alert } from 'antd';
// import { Link } from 'react-router-dom';
// // import { useGetStudentQuery } from '../../../context/studentsApi';
// import { useGetAllTeachersQuery, useDeleteTeacherMutation, useUpdateTeacherMutation } from '../../../context/teacherApi'; // Ensure the correct path
// import './teachersTable.css';
// import { UserAddOutlined } from '@ant-design/icons';
// import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';

// const TeachersTable = () => {
//     // const { data: students } = useGetStudentQuery();
//     const { data: teachers, error, isLoading, refetch } = useGetAllTeachersQuery();
//     const [deleteTeacher] = useDeleteTeacherMutation();
//     const [updateTeacher] = useUpdateTeacherMutation();
//     const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//     const [editingTeacher, setEditingTeacher] = useState(null);
//     const [form] = Form.useForm();
//     const [searchTerm, setSearchTerm] = useState('');


//     const handleDelete = async (id) => {
//         try {
//             await deleteTeacher(id);
//             message.success('O‘qituvchi muvaffaqiyatli o‘chirildi');
//             refetch();
//         } catch (error) {
//             message.error('O‘qituvchini o‘chirishda xato yuz berdi');
//         }
//     };

//     const handleEdit = (record) => {
//         setEditingTeacher(record);
//         form.setFieldsValue(record);
//         setIsEditModalVisible(true);
//     };

//     const handleEditSubmit = async (values) => {
//         try {
//             await updateTeacher({ id: editingTeacher._id, ...values });
//             message.success('O‘qituvchi muvaffaqiyatli yangilandi');
//             setIsEditModalVisible(false);
//             refetch();
//         } catch (error) {
//             message.error('O‘qituvchini yangilashda xato yuz berdi');
//         }
//     };

//     const calculateAge = (dateOfBirth) => {
//         const dob = new Date(dateOfBirth);
//         const diffMs = Date.now() - dob.getTime();
//         const ageDt = new Date(diffMs);
//         return Math.abs(ageDt.getUTCFullYear() - 1970);
//     };

//     const columns = [
//         {
//             title: 'FIO',
//             dataIndex: 'firstName',
//             key: 'firstName',
//             render: (text, record) => (
//                 <Space size="middle">
//                     {capitalizeFirstLetter(record.firstName)} {capitalizeFirstLetter(record.middleName)} {capitalizeFirstLetter(record.lastName)}
//                 </Space>
//             )
//         },
//         {
//             title: 'Yoshi',
//             dataIndex: 'dateOfBirth',
//             key: 'dateOfBirth',
//             render: (dateOfBirth) => calculateAge(dateOfBirth),
//         },
//         {
//             title: 'Telefon',
//             dataIndex: 'phone',
//             key: 'phone',
//         },
//         {
//             title: 'Fani',
//             dataIndex: 'subject',
//             key: 'subject',
//             render: (subject) => capitalizeFirstLetter(subject),
//         },
//         {
//             title: "Gruxlar soni",
//             dataIndex: 'groupsCount',
//             key: 'groupsCount',
//             render: (text, record) => record.groupsCount,
//         },
//         {
//             title: "O'quvchilar soni",
//             dataIndex: 'studentsCount',
//             key: 'studentsCount',
//             render: (text, record) => record.studentsCount,
//         },
//     ];

//     const onSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredData = teachers?.map(teacher => {
//         const studentCount = students?.filter(student => student.teacherId.includes(teacher._id)).length || 0;
//         const groupsCount = [...new Set(students?.filter(student => student.teacherId.includes(teacher._id)).map(student => student.groupId))].length || 0;
//         return { ...teacher, studentsCount: studentCount, groupsCount: groupsCount };
//     }).filter(teacher =>
//         teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         teacher.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         teacher.phone.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const expandedRowRender = (record) => {
//         return (
//             <table className="expanded-table">
//                 <tbody>
//                     <tr>
//                         <td>Tug‘ilgan sana:</td>
//                         <td>{new Date(record.dateOfBirth).toLocaleDateString()}</td>
//                     </tr>
//                     <tr>
//                         <td>Jinsi:</td>
//                         <td>{record.gender}</td>
//                     </tr>
//                     <tr>
//                         <td>Millati:</td>
//                         <td>{record.nationality}</td>
//                     </tr>
//                     <tr>
//                         <td>Oilaviy holati:</td>
//                         <td>{record.maritalStatus}</td>
//                     </tr>
//                     <tr>
//                         <td>Manzili:</td>
//                         <td>{record.address}</td>
//                     </tr>
//                     <tr>
//                         <td>Elektron pochta:</td>
//                         <td>{record.email}</td>
//                     </tr>
//                     <tr>
//                         <td>Maoshi (Foizda):</td>
//                         <td>{record.salary}</td>
//                     </tr>
//                     <tr>
//                         <td>Login:</td>
//                         <td>{record.username}</td>
//                     </tr>
//                     <tr>
//                         <td>Parol:</td>
//                         <td>{record.password}</td>
//                     </tr>
//                     <tr>
//                         <td colSpan="2">
//                             <Space size="middle">
//                                 <Button type="link" onClick={() => handleEdit(record)}>Tahrirlash</Button>
//                                 <Button type="link" danger onClick={() => handleDelete(record._id)}>O‘chirish</Button>
//                             </Space>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         );
//     };

//     if (isLoading) {
//         return <Spin tip="Yuklanmoqda..." size="large" />;
//     }

//     if (error) {
//         return <Alert message="Xato" description={error.message} type="error" showIcon />;
//     }

//     return (
//         <>
//             <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "20px", padding: "0 10px" }}>
//                 <Input
//                     placeholder="Qidirish..."
//                     onChange={onSearch}
//                     style={{ width: "60%", margin: "auto" }}
//                 />
//                 <Link to="/createTeacher">
//                     <Button><UserAddOutlined /></Button>
//                 </Link>
//             </div>
//             <Table
//                 columns={columns}
//                 dataSource={filteredData}
//                 bordered={true}
//                 rowKey="_id"
//                 expandable={{
//                     expandedRowRender,
//                     rowExpandable: record => record.firstName !== 'Not Expandable',
//                 }}
//                 pagination={false}
//                 size="small"
//             />
//             <Modal
//                 title="O‘qituvchini tahrirlash"
//                 open={isEditModalVisible}
//                 onCancel={() => setIsEditModalVisible(false)}
//                 onOk={() => {
//                     form
//                         .validateFields()
//                         .then(values => {
//                             handleEditSubmit(values);
//                         })
//                         .catch(info => {
//                             console.log('Tasdiqlashda xato:', info);
//                         });
//                 }}
//                 width={800}
//             >
//                 <Form form={form} layout="vertical">
//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="firstName"
//                                 label="Ism"
//                                 rules={[{ required: true, message: 'Iltimos, ismingizni kiriting' }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="middleName"
//                                 label="Otasining ismi"
//                                 rules={[{ required: true, message: 'Iltimos, otangizning ismini kiriting' }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="lastName"
//                                 label="Familiya"
//                                 rules={[{ required: true, message: 'Iltimos, familiyangizni kiriting' }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="phone"
//                                 label="Telefon"
//                                 rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting' }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="subject"
//                                 label="Fan"
//                                 rules={[{ required: true, message: 'Iltimos, fanni kiriting' }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="salary"
//                                 label="Maosh (foizda)"
//                                 rules={[{ required: true, message: 'Iltimos, maoshingizni kiriting' }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Modal>
//         </>
//     );
// };

// export default TeachersTable;
