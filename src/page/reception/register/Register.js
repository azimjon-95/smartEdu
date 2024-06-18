import React from 'react';
import { Form, Input, DatePicker, Button, Radio, Select, Row, Col } from 'antd';
import moment from 'moment';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const { Option, OptGroup } = Select;
const { Item: FormItem } = Form;

const subjects = [
    { group: 'Matematika', subjects: ['Algebra', 'Geometriya', 'Matematik analiz'] },
    { group: 'Fan', subjects: ['Fizika', 'Kimyo', 'Biologiya'] },
    { group: 'Ijtimoiy fanlar', subjects: ['Tarix', 'Geografiya', 'Sotsiologiya'] },
    {
        group: 'Tillar',
        subjects: [
            'Ingliz tili (Kattalarga)',
            'Ingliz tili (Bolalarga)',
            'Rus tili',
            'Fransuz tili',
            'Nemis tili',
            'Koreys tili'
        ]
    },
    { group: 'Adabiyot va Ona tili', subjects: ['Adabiyot', 'Ona tili'] },
    { group: 'Dasturlash', subjects: ['Webdasturlash'] },
    { group: 'Mental', subjects: ['Mental arifmetika'] },
];

const webDevelopmentSubjects = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const handleClearClick = () => {
        navigate(-1); // Navigate back one page in history
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button onClick={handleClearClick} type="primary"><IoArrowBackOutline /></Button>

                <h2 >O'quvchilarni Qabul Qilish</h2>
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem
                            name="firstName"
                            label="Ism"
                            rules={[{ required: true, message: 'Iltimos, ismingizni kiriting!' }]}
                        >
                            <Input placeholder="Ismingizni kiriting" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            name="lastName"
                            label="Familiya"
                            rules={[{ required: true, message: 'Iltimos, familiyangizni kiriting!' }]}
                        >
                            <Input placeholder="Familiyangizni kiriting" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            name="middleName"
                            label="Otasining ismi"
                            rules={[{ required: true, message: 'Iltimos, otangizning ismini kiriting!' }]}
                        >
                            <Input placeholder="Otasining ismini kiriting" />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem
                            name="dateOfBirth"
                            label="Tug'ilgan sana"
                            rules={[{ required: true, message: "Iltimos, tug'ilgan sanani kiriting!" }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Tug'ilgan sanani tanlang"
                                disabledDate={(current) => current && current > moment().endOf('day')}
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            name="address"
                            label="Manzil"
                            rules={[{ required: true, message: 'Iltimos, manzilingizni kiriting!' }]}
                        >
                            <Input placeholder="Manzilingizni kiriting" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            name="studentPhoneNumber"
                            label="O'quvchining telefon raqami"
                            rules={[
                                { required: true, message: 'Iltimos, o\'quvchining telefon raqamini kiriting!' },
                                { pattern: /^[0-9]+$/, message: 'Iltimos, to‘g‘ri telefon raqam kiriting!' },
                            ]}
                        >
                            <Input placeholder="Telefon raqamini kiriting" />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem
                            name="parentPhoneNumber"
                            label="Ota-onasining telefon raqami"
                            rules={[
                                { required: true, message: 'Iltimos, ota-onangizning telefon raqamini kiriting!' },
                                { pattern: /^[0-9]+$/, message: 'Iltimos, to‘g‘ri telefon raqam kiriting!' },
                            ]}
                        >
                            <Input placeholder="Telefon raqamini kiriting" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            name="gender"
                            label="Jinsi"
                            rules={[{ required: true, message: 'Iltimos, jinsingizni tanlang!' }]}
                        >
                            <Radio.Group>
                                <Radio value="male">Erkak</Radio>
                                <Radio value="female">Ayol</Radio>
                            </Radio.Group>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
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
                                <OptGroup label="Webdasturlash">
                                    {webDevelopmentSubjects.map((subject) => (
                                        <Option key={subject} value={subject.toLowerCase().replace(/ /g, '-')}>
                                            {subject}
                                        </Option>
                                    ))}
                                </OptGroup>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                        Yuborish
                    </Button>
                </Row >
            </Form>
        </div>
    );
};

export default Register;


