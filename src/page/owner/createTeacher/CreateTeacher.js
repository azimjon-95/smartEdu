import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import { useCreateTeacherMutation } from '../../../context/teacherApi'; // Ensure the correct path
import { subjects } from '../../../utils/subjects';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PhoneInput } from "react-international-phone";

const { Option, OptGroup } = Select;
const nationalityOptions = [
    'O‘zbekiston', 'Rossiya', 'AQSH', 'Birlashgan Qirollik', 'Germaniya', 'Fransiya', 'Xitoy', 'Yaponiya', 'Boshqa'
];

const genderOptions = ['Erkak', 'Ayol'];

const RegisterPage = () => {
    const navigate = useNavigate();
    const [createTeacher] = useCreateTeacherMutation();
    const [form] = Form.useForm();
    const [phone, setPhone] = useState("");

    const onFinish = async (values) => {
        try {
            values.teacherType = "owner";
            values.phone = phone;
            const response = await createTeacher(values);
            console.log('Ro‘yxatdan o‘tish muvaffaqiyatli:', response);
            navigate("/getTeacher");
            form.resetFields(); // Reset form fields after successful submission
        } catch (error) {
            console.error('Ro‘yxatdan o‘tish muvaffaqiyatsiz:', error);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigate one step back in the browser history
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="firstName"
                        label="Ism"
                        rules={[{ required: true, message: 'Iltimos, ismingizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="middleName"
                        label="Otasining ismi"
                        rules={[{ required: true, message: 'Iltimos, otangizning ismini kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="lastName"
                        label="Familiya"
                        rules={[{ required: true, message: 'Iltimos, familiyangizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="dateOfBirth"
                        label="Tug‘ilgan sana"
                        rules={[{ required: true, message: 'Iltimos, tug‘ilgan sanangizni kiriting' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="gender"
                        label="Jinsi"
                        rules={[{ required: true, message: 'Iltimos, jinsingizni tanlang' }]}
                    >
                        <Select placeholder="Jinsingizni tanlang">
                            {genderOptions.map(gender => (
                                <Option key={gender} value={gender}>{gender}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="nationality"
                        label="Millat"
                        rules={[{ required: true, message: 'Iltimos, millatingizni tanlang' }]}
                    >
                        <Select placeholder="Millatingizni tanlang">
                            {nationalityOptions.map(nationality => (
                                <Option key={nationality} value={nationality}>{nationality}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="maritalStatus"
                        label="Oilaviy holat"
                        rules={[{ required: true, message: 'Iltimos, oilaviy holatingizni tanlang' }]}
                    >
                        <Select placeholder="Oilaviy holatingizni tanlang">
                            <Option value="Single">Yolg‘iz</Option>
                            <Option value="Married">Turmush qurgan</Option>
                            <Option value="Divorced">Ajrashgan</Option>
                            <Option value="Widowed">Beva</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="address"
                        label="Manzil"
                        rules={[{ required: true, message: 'Iltimos, yashash manzilingizni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Telefon raqami" name="studentPhoneNumber">
                        <PhoneInput
                            defaultCountry="uz"
                            value={phone}
                            onChange={(e) => e.length === 13 && setPhone(e)}
                            inputStyle={{ width: "100%" }}
                            className="PhoneInput"
                            placeholder="+998 xx xxx-xx-xx"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
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
                                                <Option key={subject} value={subject.toLowerCase().replace(/ /g, '-')}>
                                                    {subject}
                                                </Option>
                                            );
                                        } else {
                                            return (
                                                <OptGroup key={subject.group} label={subject.group}>
                                                    {subject.subjects.map((sub) => (
                                                        <Option key={sub} value={sub.toLowerCase().replace(/ /g, '-')}>
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
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="email"
                        label="Elektron pochta"
                        rules={[{ required: true, message: 'Iltimos, elektron pochtangizni kiriting' }, { type: 'email', message: 'Elektron pochta manzili noto‘g‘ri!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
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
                <Col span={8}>
                    <Form.Item
                        name="salary"
                        label="Maosh (Foizda)"
                        rules={[{ required: true, message: 'Iltimos, maoshni kiriting' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="password"
                        label="Parol"
                        rules={[{ required: true, message: 'Iltimos, parolingizni kiriting' }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="confirm"
                        label="Parolni tasdiqlang"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Iltimos, parolni tasdiqlang' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Kiritilgan parollar mos kelmaydi!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ width: "100%", gap: "10px", display: "flex" }}>
                <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                    Ro‘yxatdan o‘tish
                </Button>
                <Button type="primary" danger onClick={handleBack} icon={<ArrowLeftOutlined />}>
                    Orqaga
                </Button>
            </div>
        </Form>
    );
};

export default RegisterPage;
