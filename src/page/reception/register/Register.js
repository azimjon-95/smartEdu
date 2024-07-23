import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Radio, Row, Col, notification } from 'antd';
import moment from 'moment';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateStudentMutation } from '../../../context/studentsApi';
import { useGetAllRegistrationsQuery, useUpdateRegistrationMutation } from '../../../context/groupsApi';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const { Item: FormItem } = Form;

const Register = () => {
    const { id } = useParams();

    const [updateRegistration] = useUpdateRegistrationMutation();
    const { data: registrations } = useGetAllRegistrationsQuery();
    const result = registrations?.filter((i) => i._id === id)[0];
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [createStudent, { isLoading }] = useCreateStudentMutation();
    const [phoneStudent, setPhoneStudent] = useState("");
    const [phoneParents, setPhoneParents] = useState("");

    const handleClearClick = () => {
        navigate(-1); // Tarixda bir sahifaga orqaga o'tish
    };

    console.log(result);
    const onFinish = async (values) => {
        try {
            values.groupId = result?._id;
            values.teacherId = result?.teacherId;
            values.subject = result.subjects;
            values.payForLesson = result?.mothlyPay;
            values.lessonTime = result?.lessonTime;
            values.lessonDate = result?.schedule;
            values.teacherFullName = result?.teachers;
            values.studentPhoneNumber = phoneStudent;
            values.parentPhoneNumber = phoneParents;

            let res = await createStudent(values);
            console.log(res);
            let groupData = {
                ...result,
                studentsLength: (result?.studentsLength || 0) + 1 // 0 dan boshlanishini ta'minlash
            };

            // updateRegistration ni chaqirish
            let res2 = await updateRegistration({ id: result?._id, body: groupData });

            // Yangi result ni qayta olish
            if (res2.success) { // Assuming res2 has a success property
                result = res2.updatedGroupData; // Updating the result with the updated group data
            }

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

                        <Form.Item label="O'quvchining telefon raqami" name="studentPhoneNumber">
                            <PhoneInput
                                defaultCountry="uz"
                                value={phoneStudent}
                                onChange={(e) => e.length === 13 && setPhoneStudent(e)}
                                inputStyle={{ width: "100%" }}
                                className="PhoneInput"
                                placeholder="+998 xx xxx-xx-xx"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>

                        <Form.Item label="Ota-onasining telefon raqami" name="parentPhoneNumber">
                            <PhoneInput
                                defaultCountry="uz"
                                value={phoneParents}
                                onChange={(e) => e.length === 13 && setPhoneParents(e)}
                                inputStyle={{ width: "100%" }}
                                className="PhoneInput"
                                placeholder="+998 xx xxx-xx-xx"
                            />
                        </Form.Item>
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







