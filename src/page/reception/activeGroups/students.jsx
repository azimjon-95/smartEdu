import React, { useState } from 'react';
import { Table, Button, Space, Input, message, notification, Dropdown, Menu } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentsStateMutation } from '../../../context/studentsApi';
import { useGetAllRegistrationsQuery, useUpdateRegistrationMutation } from '../../../context/groupsApi';
import './style.css';  // Ensure this file contains the necessary styles
import '../../../components/table-Css/css/main.min.css';
import '../../../components/table-Css/css/bulma.min.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import moment from 'moment';
import { GiTwoCoins } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import { NumberFormat } from '../../../hook/NumberFormat';

const { Search } = Input;

const Students = () => {
    const { data } = useGetStudentQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    const [updateStudentsState] = useUpdateStudentsStateMutation();

    const navigate = useNavigate();
    const { id } = useParams();


    const student = data?.filter((i) => i.groupId === id);

    const handleDelete = async (record) => {
        try {
            await deleteStudent(record?._id);
            message.success('Talaba muvaffaqiyatli o\'chirildi');
        } catch (error) {
            message.warning('Talabani o\'chirishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleUpdate = (record) => {
        console.log('Yangilash tugmasi bosildi:', record);
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


    const handleCoinSelect = async (id, value) => {
        const result = student.filter((i) => i._id === id);

        if (!result) {
            message.error('Talaba topilmadi');
            return;
        }

        try {
            const coinData = {
                coin: result?.coin + value // coinni yangilash
            };

            await updateStudentsState({ id: result?._id, body: coinData }); // sintaksisni to'g'irlash

            message.success('Coin muvaffaqiyatli yangilandi');
        } catch (error) {
            message.error('Davomat olib tashishda xatolik yuz berdi');
            console.error(error);
        }
    };

    const coinMenu = (id) => (
        <Menu>
            <Menu.Item key="2">
                <Button onClick={() => handleCoinSelect(id, 2)} style={{ width: '100%' }}>
                    2 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            </Menu.Item>
            <Menu.Item key="5">
                <Button onClick={() => handleCoinSelect(id, 5)} style={{ width: '100%' }}>
                    5 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            </Menu.Item>
            <Menu.Item key="10">
                <Button onClick={() => handleCoinSelect(id, 10)} style={{ width: '100%' }}>
                    10 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            </Menu.Item>
        </Menu>
    );

    const onSearch = (value) => {
        console.log('Izlash natijasi:', value);
    };


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

            {/* <Table pagination={false} size="small" columns={columns} dataSource={student} /> */}
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
                                        <th>Ballar</th>
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

                                            <td data-label="Ballar" className="is-progress-cell">
                                                <Space size="middle">
                                                    <span>{NumberFormat(item.coin)} <GiTwoCoins style={{ color: 'gold' }} /></span>
                                                    <Dropdown overlay={coinMenu(item?._id)}>
                                                        <Button >
                                                            Coins<MdArrowDropDown />
                                                        </Button>
                                                    </Dropdown>
                                                </Space>
                                            </td>

                                            <td data-label="Davomat" className="is-progress-cell">
                                                <Space size="middle">
                                                    <Button onClick={() => handleAddAttendance(item?._id)} type="primary">Sababli</Button>
                                                    <Button onClick={() => handleRemoveAttendance(item?._id)} className="red-button">Sababsiz</Button>
                                                </Space>
                                            </td>

                                            <td data-label="Harakatlar" className="is-actions-cell">
                                                <Space size="middle">
                                                    <Button onClick={() => handleUpdate(item)}>Yangilash</Button>
                                                    <Button
                                                        onClick={() => handleDelete(item)}
                                                        style={{ backgroundColor: 'red', borderColor: '#D2B9B7', color: '#000' }}
                                                        type="danger"
                                                    >
                                                        O'chirish
                                                    </Button>
                                                </Space>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Students;
