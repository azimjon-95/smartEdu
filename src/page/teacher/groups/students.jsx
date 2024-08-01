import React, { useState } from 'react';
import { Table, Button, Space, Input, message, Modal, Tooltip, Dropdown, Row } from 'antd';
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentMutation } from '../../../context/studentsApi';
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
    const [updateStudentsState] = useUpdateStudentMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const student = data?.filter((i) => i.groupId === id);

    const handleDelete = async (record) => {
        Modal.confirm({
            title: 'Tasdiqlash',
            content: 'Siz haqiqatan ham ushbu talabani o\'chirmoqchimisiz?',
            okText: 'Ok',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await deleteStudent(record?._id);
                    message.success('Talaba muvaffaqiyatli o\'chirildi');
                } catch (error) {
                    message.warning('Talabani o\'chirishda xatolik yuz berdi');
                    console.error(error);
                }
            }
        });
    };

    const handleUpdate = (record) => {
        setCurrentStudent(record);
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            await updateStudentsState({ id: currentStudent._id, body: currentStudent });
            message.success('Talaba muvaffaqiyatli yangilandi');
            setIsModalVisible(false);
        } catch (error) {
            message.error('Talabani yangilashda xatolik yuz berdi');
            console.error(error);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
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
        const result = student?.find((i) => i._id === id);

        if (!result) {
            message.error('Talaba topilmadi');
            return;
        }

        try {
            const coinData = {
                ...result,
                coin: result.coin + value
            };

            await updateStudentsState({ id: result._id, body: coinData });

            message.success("Coin muvaffaqiyatli qo'shildi");
        } catch (error) {
            message.error('Coin yangilashda xatolik yuz berdi');
            console.error(error);
        }
    };

    const coinMenu = (id) => [
        {
            key: '2',
            label: (
                <Button onClick={() => handleCoinSelect(id, 2)} style={{ width: '100%' }}>
                    2 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            ),
        },
        {
            key: '5',
            label: (
                <Button onClick={() => handleCoinSelect(id, 5)} style={{ width: '100%' }}>
                    5 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            ),
        },
        {
            key: '10',
            label: (
                <Button onClick={() => handleCoinSelect(id, 10)} style={{ width: '100%' }}>
                    10 <GiTwoCoins style={{ color: 'gold', marginLeft: '8px' }} />
                </Button>
            )
        }
    ];

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
                                                    <span style={{ display: "flex", alignItems: "center", gap: "4px", width: "63px" }}><GiTwoCoins style={{ color: 'gold', fontSize: "20px" }} /> {NumberFormat(item.coin)} </span>
                                                    <Dropdown menu={{ items: coinMenu(item?._id) }}>
                                                        <Button>
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
                                                    <Tooltip title="O'chirish" color="red">
                                                        <Button
                                                            onClick={() => handleDelete(item)}
                                                            style={{ backgroundColor: 'red', borderColor: '#D2B9B7', color: '#000' }}
                                                            type="danger"
                                                        >
                                                            O'chirish
                                                        </Button>
                                                    </Tooltip>
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

            <Modal
                title="Talaba ma'lumotlarini yangilash"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                {currentStudent && (
                    <div>
                        <Row>

                            <Input
                                name="firstName"
                                label="Ism"
                                placeholder="Ism"
                                value={currentStudent.firstName}
                                onChange={handleInputChange}
                                style={{ marginBottom: '8px' }}
                            />
                            <Input
                                name="lastName"
                                label="Familiya"
                                placeholder="Familiya"
                                value={currentStudent.lastName}
                                onChange={handleInputChange}
                                style={{ marginBottom: '8px' }}
                            />
                            <Input
                                name="dateOfBirth"
                                label="Tug'ilgan sana"
                                placeholder="YYYY-MM-DD"
                                value={currentStudent.dateOfBirth}
                                onChange={handleInputChange}
                                style={{ marginBottom: '8px' }}
                            />
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Students;











