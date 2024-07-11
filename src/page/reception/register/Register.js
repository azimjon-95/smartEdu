import React from 'react';
import { Form, Input, DatePicker, Button, Radio, Row, Col, notification } from 'antd';
import moment from 'moment';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateStudentMutation } from '../../../context/studentsApi';
import { useGetAllRegistrationsQuery, useUpdateRegistrationMutation } from '../../../context/groupsApi';

const { Item: FormItem } = Form;

const Register = () => {
    const { id } = useParams();
    const [updateRegistration] = useUpdateRegistrationMutation();
    const { data: registrations } = useGetAllRegistrationsQuery();
    const result = registrations?.filter((i) => i._id === id)[0];
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [createStudent, { isLoading }] = useCreateStudentMutation();

    const handleClearClick = () => {
        navigate(-1); // Tarixda bir sahifaga orqaga o'tish
    };

    const onFinish = async (values) => {
        try {
            values.groupId = result?._id;
            values.teacherId = result?.teacherId;
            console.log(values);
            await createStudent(values)
            let groupData = {
                ...result,
                studentsLength: result.tudentsLength + 1
            }

            // Room capacityni yangilash
            await updateRegistration({ id: result._id, groupData })

            notification.success({
                message: 'Muvaffaqiyatli',
                description: 'O‘quvchi muvaffaqiyatli ro‘yxatdan o‘tkazildi!',
            });
            form.resetFields();
            handleClearClick(); // O'quvchilar ro'yxatiga yoki boshqa sahifaga o'tish
        } catch (error) {
            notification.error({
                message: 'Xatolik',
                description: 'O‘quvchini ro‘yxatdan o‘tkazishda xatolik yuz berdi.',
            });
        }
    };



    return (
        <div style={{ maxWidth: '100%' }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button onClick={handleClearClick} type="primary"><IoArrowBackOutline /></Button>
                <h2>O'quvchilarni Qabul Qilish</h2>
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
                </Row>

                <Row gutter={16}>
                    <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={isLoading}>
                        Yuborish
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default Register;







