import React, { useState } from 'react';
import { Tabs, Button, Radio, Table, Form, Input, Select, message, Popconfirm } from 'antd';
import './style.css';
import { MdOutlineClear } from "react-icons/md";
import { useCreateRegistrationMutation, useGetAllRegistrationsQuery, useDeleteRegistrationMutation } from '../../../context/groupsApi'; // Import useDeleteRegistrationMutation
import { subjects } from '../../../utils/subjects';

const { Option, OptGroup } = Select;
const { Search } = Input;

const CreateCards = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    // Fetching the registrations data
    const { data: studentsData, error, isLoading, refetch } = useGetAllRegistrationsQuery(); // Add refetch to update data after delete
    const [createRegistration] = useCreateRegistrationMutation();
    const [deleteRegistration] = useDeleteRegistrationMutation(); // Initialize delete mutation

    const columns = [
        { title: 'Xona raqami', dataIndex: 'roomNumber', key: 'roomNumber' },
        { title: 'Fan nomi', dataIndex: 'subjects', key: 'subjects' },
        {
            title: 'Oquvchilar soni',
            dataIndex: 'roomCapacity',
            key: 'roomCapacity',
            render: (roomCapacity) => roomCapacity.length
        },
        { title: 'Dars vaqti', dataIndex: 'lessonTime', key: 'lessonTime' },
        { title: 'Ustoz', dataIndex: 'teachers', key: 'teachers' },
        {
            title: 'Jadval',
            dataIndex: 'schedule',
            key: 'schedule',
            render: (schedule) => {
                switch (schedule) {
                    case 'oddDays':
                        return "Toq kunlari";
                    case 'evenDays':
                        return "Juft kunlari";
                    case 'allDays':
                        return "Har kunlari";
                    default:
                        return schedule; // Return the original value if it's not one of the expected values
                }
            },
        },
        {
            title: 'Gruppa xolati',
            dataIndex: 'state',
            key: 'state',
            render: (state) => {
                let statusText = '';
                switch (state) {
                    case 'new':
                        statusText = "O'quvchilar yig'ilmoqda";
                        break;
                    case 'active':
                        statusText = 'Aktiv';
                        break;
                    case 'close':
                        statusText = 'Gruppa yopilgan';
                        break;
                    default:
                        statusText = state; // Default to state value if not handled
                        break;
                }
                return <span>{statusText}</span>;
            },
        },
        {
            title: "O'chirish",
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => (
                <Popconfirm
                    title="Haqiqatdan ham bu gruppini o'chirishni istaysizmi?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Ha"
                    cancelText="Yo'q"
                >
                    <Button type="primary" danger>
                        O'chirish
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const handleFormSubmit = async (values) => {
        const newStudent = {
            roomNumber: values.roomNumber,
            lessonTime: values.lessonTime,
            subjects: values.subject,
            teachers: values.teachers,
            state: "new",
            schedule: values.schedule,
        };

        try {
            await createRegistration(newStudent).unwrap();
            message.success('Yangi gruppa ochildi');
            setOpen(false); // Close the modal after successful registration
            refetch(); // Refetch data after successful registration
        } catch (error) {
            message.error('Failed to register student');
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await deleteRegistration(id).unwrap();
            setOpen(false)
            message.success('Gruppa muvaffaqiyatli o\'chirildi');
            refetch(); // Refetch data after successful deletion
        } catch (error) {
            message.error('Gruppa o\'chirishda xatolik yuz berdi');
        }
    };

    const onSearch = (value) => {
        setSearchTerm(value);
        console.log('Izlash natijasi:', value);
    };
    const operations = <Button onClick={() => setOpen(true)}>Gruppa ochish</Button>;

    const filteredData = studentsData?.filter(student =>
        student.roomNumber.toString().includes(searchTerm) ||
        student.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        student.lessonTime.includes(searchTerm) ||
        student.teachers.some(teacher => teacher.toLowerCase().includes(searchTerm.toLowerCase())) ||
        student.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const dataNew = filteredData?.filter((i) => i.state === "new");
    const dataActive = filteredData?.filter((i) => i.state === "active");

    return (
        <div className='TableGrups'>
            <div className={`OpenReg ${open ? "OpenRegAll" : "OpenReg"}`}>
                <h2 style={{ textAlign: "center" }}>Yangi gruppa ochish!</h2>

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
                        <Input placeholder='Xona raqamini kiriting' />
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
                        name="subject"
                        label="Fanni tanlang"
                        rules={[{ required: true, message: 'Iltimos, fanni tanlang!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Fanni tanlang"
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children?.toLowerCase().includes(input?.toLowerCase())
                            }
                        >
                            {subjects.map((group) => (
                                <OptGroup key={group.group} label={group.group}>
                                    {group.subjects.map((subject) => {
                                        if (typeof subject === 'string') {
                                            return (
                                                <Option key={subject} value={subject}>
                                                    {subject}
                                                </Option>
                                            );
                                        } else {
                                            return (
                                                <OptGroup key={subject.group} label={subject.group}>
                                                    {subject.subjects.map((sub) => (
                                                        <Option key={sub} value={sub}>
                                                            {sub}
                                                        </Option>
                                                    ))}
                                                </OptGroup>
                                            );
                                        }
                                    })}
                                </OptGroup>
                            ))}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="teachers"
                        label="Ustozlarni tanlang"
                        rules={[{ required: true, message: 'Ustozlarni tanlang!' }]}
                    >
                        <Select mode="multiple">
                            <Option value="Hurshida Rasulova">Hurshida Rasulova</Option>
                            <Option value="Azimjon Mamutaliev">Azimjon Mamutaliev</Option>
                            <Option value="Bahromjon Abdulhayev">Bahromjon Abdulhayev</Option>
                            {/* Add more teacher options as needed */}
                        </Select>

                    </Form.Item>
                    <Form.Item
                        name="schedule"
                        label="Jadvalni tanlang"
                        rules={[{ required: true, message: 'Jadvalni tanlang!' }]}
                    >
                        <Radio.Group>
                            <Radio value="oddDays">Toq kunlari</Radio>
                            <Radio value="evenDays">Juft kunlari</Radio>
                            <Radio value="allDays">Har kunlari</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                            Ro'yxatga yozish
                        </Button>
                        <Button type="primary" danger onClick={() => setOpen(!open)}><MdOutlineClear style={{ fontSize: "18px" }} /></Button>
                    </div>
                </Form>
            </div>

            <div className="reachStudents_box">
                <div className="reachStudents">
                    <Search
                        placeholder="Qidirish..."
                        onSearch={onSearch}
                        style={{ width: "60%" }}
                        enterButton={false}
                    />
                </div>

                <Tabs tabBarExtraContent={operations} >

                    <Tabs.TabPane
                        tab={`Yangi gruppalar`}
                        key={0}
                    >
                        <Table
                            dataSource={dataNew}
                            columns={columns}
                            pagination={false}
                            size="small"
                            loading={isLoading}
                            bordered={true}
                        />
                        {error && <div>Error fetching data</div>}

                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={` Aktiv gruppalar`}
                        key={1}
                    >
                        <Table
                            dataSource={dataActive}
                            columns={columns}
                            pagination={false}
                            size="small"
                            loading={isLoading}
                            bordered={true}
                        />
                        {error && <div>Error fetching data</div>}

                    </Tabs.TabPane>
                </Tabs>

            </div>
        </div>
    );
};

export default CreateCards;




