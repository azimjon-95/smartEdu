import React, { useState, useEffect } from 'react';
import './style.css';
import { FaMoneyBillWave, FaUserGraduate, FaArrowUp, FaArrowDown, FaCalendarAlt } from 'react-icons/fa';
import { GiTakeMyMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { useGetStudentQuery } from '../../../context/studentsApi';
import { useGetBalansQuery } from '../../../context/balansApi.js';
import { Tooltip, DatePicker, Modal } from 'antd';
import moment from 'moment';

function PortfolioPerformance() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const dataArray = [
        {
            _id: "669fef115c31a18fd74b238f",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 1000000,
            studentFeesTime: "22:55:17",
            month: "июль",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-23T17:57:37.629Z",
            __v: 0
        },
        {
            _id: "669fef285c31a18fd74b2399",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 2000000,
            studentFeesTime: "22:55:17",
            month: "июль",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-23T17:58:00.491Z",
            __v: 0
        },
        {
            _id: "669fef7d5c31a18fd74b23a0",
            fullName: "Azimjon Mamutaliyev",
            studentId: "669fe69f70f2aeb021f360b9",
            studentFees: 50000,
            studentFeesTime: "22:55:17",
            month: "июль",
            subject: [
                "Biologiya"
            ],
            studentFeesDate: "2024-07-23T17:59:25.248Z",
            __v: 0
        },
        {
            _id: "66a1317c42b042659dd9ae2c",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 500000,
            studentFeesTime: "21:29:25",
            month: "июль",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-24T16:53:16.292Z",
            __v: 0
        },
        {
            _id: "66a4dd65e1f8adf49c08c24f",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 500000,
            studentFeesTime: "11:42:14 AM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-27T11:43:33.984Z",
            __v: 0
        },
        {
            _id: "66a55061507c0b2c033f22e7",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 500000,
            studentFeesTime: "12:34:06 AM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-27T19:54:09.223Z",
            __v: 0
        },
        {
            _id: "66a5506a507c0b2c033f22f1",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 500000,
            studentFeesTime: "12:34:06 AM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-27T19:54:18.773Z",
            __v: 0
        },
        {
            _id: "66a5f60552ce99940882bd1a",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 500000,
            studentFeesTime: "12:37:21 PM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-28T07:40:53.113Z",
            __v: 0
        },
        {
            _id: "66a66e9ad24e7d54ce9d3e90",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 5000000,
            studentFeesTime: "4:13:56 PM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-07-28T16:15:22.520Z",
            __v: 0
        },
        {
            _id: "66a6new1",
            fullName: "New Student 1",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 150000,
            studentFeesTime: "10:00:00 AM",
            month: "July",
            subject: [
                "Math"
            ],
            studentFeesDate: "2024-07-29T10:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new2",
            fullName: "New Student 2",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 250000,
            studentFeesTime: "11:00:00 AM",
            month: "July",
            subject: [
                "Physics"
            ],
            studentFeesDate: "2024-07-29T11:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new3",
            fullName: "New Student 3",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 350000,
            studentFeesTime: "12:00:00 PM",
            month: "July",
            subject: [
                "Chemistry"
            ],
            studentFeesDate: "2024-07-29T12:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new4",
            fullName: "New Student 4",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 450000,
            studentFeesTime: "1:00:00 PM",
            month: "July",
            subject: [
                "English"
            ],
            studentFeesDate: "2024-07-29T13:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new5",
            fullName: "New Student 5",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 550000,
            studentFeesTime: "2:00:00 PM",
            month: "July",
            subject: [
                "History"
            ],
            studentFeesDate: "2024-07-29T14:00:00.000Z",
            __v: 0
        },
        // -------------
        {
            _id: "66a6new2",
            fullName: "New Student 2",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 250000,
            studentFeesTime: "11:00:00 AM",
            month: "July",
            subject: [
                "Physics"
            ],
            studentFeesDate: "2024-07-28T11:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new3",
            fullName: "New Student 3",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 350000,
            studentFeesTime: "12:00:00 PM",
            month: "July",
            subject: [
                "Chemistry"
            ],
            studentFeesDate: "2024-07-28T12:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new4",
            fullName: "New Student 4",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 450000,
            studentFeesTime: "1:00:00 PM",
            month: "July",
            subject: [
                "English"
            ],
            studentFeesDate: "2024-07-28T13:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new5",
            fullName: "New Student 5",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 550000,
            studentFeesTime: "2:00:00 PM",
            month: "July",
            subject: [
                "History"
            ],
            studentFeesDate: "2024-07-28T14:00:00.000Z",
            __v: 0
        },
        // -------------
        {
            _id: "66a6new2",
            fullName: "New Student 2",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 250000,
            studentFeesTime: "11:00:00 AM",
            month: "July",
            subject: [
                "Physics"
            ],
            studentFeesDate: "2024-06-28T11:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new3",
            fullName: "New Student 3",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 350000,
            studentFeesTime: "12:00:00 PM",
            month: "July",
            subject: [
                "Chemistry"
            ],
            studentFeesDate: "2024-06-28T12:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new4",
            fullName: "New Student 4",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 450000,
            studentFeesTime: "1:00:00 PM",
            month: "July",
            subject: [
                "English"
            ],
            studentFeesDate: "2024-06-28T13:00:00.000Z",
            __v: 0
        },
        {
            _id: "66a6new5",
            fullName: "New Student 5",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 550000,
            studentFeesTime: "2:00:00 PM",
            month: "July",
            subject: [
                "History"
            ],
            studentFeesDate: "2024-06-28T14:00:00.000Z",
            __v: 0
        },
        // ---------------
        {
            _id: "66a5f60552ce99940882bd1a",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 500000,
            studentFeesTime: "12:37:21 PM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-05-28T07:40:53.113Z",
            __v: 0
        },
        {
            _id: "66a66e9ad24e7d54ce9d3e90",
            fullName: "rgererer reertertert",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 5000000,
            studentFeesTime: "4:13:56 PM",
            month: "July",
            subject: [
                "Webdasturlash"
            ],
            studentFeesDate: "2024-05-28T16:15:22.520Z",
            __v: 0
        },
        {
            _id: "66a6new1",
            fullName: "New Student 1",
            studentId: "669fe10f56dae4dc9702852c",
            studentFees: 150000,
            studentFeesTime: "10:00:00 AM",
            month: "July",
            subject: [
                "Math"
            ],
            studentFeesDate: "2024-05-29T10:00:00.000Z",
            __v: 0
        },
    ];


    const { data } = useGetStudentQuery();
    const { data: balans } = useGetBalansQuery();

    const mainData = data?.filter((s) => s.state === "active");
    const totalIndebtedness = mainData?.reduce((acc, student) => acc + student.indebtedness.debtorPay, 0);
    const formatMoney = (amount) => {
        if (amount >= 1_000_000) {
            return `${(amount / 1_000_000)}M so'm`;
        } else if (amount >= 1_000) {
            return `${(amount / 1_000)}K so'm`;
        } else {
            return `${amount?.toLocaleString('uz-UZ')} so'm`;
        }
    };

    useEffect(() => {
        setSelectedMonth(months[currentMonthIndex]);
    }, [currentMonthIndex, months]);

    const filteredPayments = data?.filter(payment => {
        const paymentDate = new Date(payment.studentFeesDate);
        const paymentMonth = months[paymentDate.getMonth()];
        return paymentMonth === selectedMonth;
    });


    // ----------------------------------------------
    const [currentDate, setCurrentDate] = useState(moment()); // Hozirgi sanani olish
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        filterData();
    }, [currentDate]);

    const filterData = () => {
        const filtered = dataArray.filter(item =>
            moment(item.studentFeesDate).isSame(currentDate, 'month')
        );
        setFilteredData(filtered);
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => moment(prevDate).add(1, 'month'));
    };

    const handlePrevMonth = () => {
        setCurrentDate(prevDate => moment(prevDate).subtract(1, 'month'));
    };
    const todayMoney = filteredData?.reduce((acc, payment) => acc + payment.studentFees, 0);

    //----------------------------------------------
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCurrentMonthIndex(date.month());
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="portfolio-performance-main">
            <p>O'quv markaz samaradorligi</p>
            <div className="portfolio-performance">
                <div className="portfolio-performance-item">
                    <div className="portfolio-performance-item-icon">
                        <FaMoneyBillWave />
                    </div>
                    <Tooltip title={`${todayMoney?.toLocaleString('uz-UZ')} so'm`}>
                        <div className="performance-item">
                            <p>Bugungi tushumlar</p>
                            <h3>{formatMoney(todayMoney)}</h3>
                            <div className="daromar-statistikasi">
                                <div className="daromad-btns">
                                    <button
                                        onClick={handlePrevMonth}
                                        disabled={currentMonthIndex === 0}
                                    >
                                        <FaArrowDown />
                                    </button>
                                    <p>{selectedMonth}</p>
                                    <button
                                        onClick={handleNextMonth}
                                        disabled={currentMonthIndex === months.length - 1}
                                    >
                                        <FaArrowUp />
                                    </button>
                                    <button onClick={showModal}>
                                        <FaCalendarAlt />
                                    </button>
                                    <Modal title="Select Date" open={isModalVisible} onCancel={handleCancel} footer={null}>
                                        <DatePicker
                                            onChange={(date) => handleDateChange(date)}
                                            picker="month"
                                            defaultValue={moment()}
                                            allowClear={false}
                                        />
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                </div>
                <div className="portfolio-performance-item">
                    <div className="portfolio-performance-item-icon icon-color1">
                        <GrMoney />
                    </div>
                    <Tooltip title={`${balans?.map(item => item.balans)?.reduce((acc, item) => acc + item, 0)?.toLocaleString('uz-UZ')} so'm`}>
                        <div className="performance-item">
                            <p>Umumiy balans</p>
                            <h3>
                                {balans?.map((item) => (
                                    <div key={item._id}>
                                        {item.balans === 0 ? "" : `${formatMoney(item.balans)}`}
                                    </div>
                                ))}
                            </h3>
                            <p>O'sish tezligi: 14,1%</p>
                        </div>
                    </Tooltip>
                </div>
                <div className="portfolio-performance-item">
                    <div className="portfolio-performance-item-icon icon-color2">
                        <FaUserGraduate />
                    </div>
                    <div className="performance-item">
                        <p>Aktiv o'quvchilar</p>
                        <h3>{mainData?.length}</h3>
                        <p>7,35% o'sib ketdi</p>
                    </div>
                </div>
                <div className="portfolio-performance-item">
                    <div className="portfolio-performance-item-icon icon-color3">
                        <GiTakeMyMoney />
                    </div>
                    <Tooltip title={`${totalIndebtedness?.toLocaleString('uz-UZ')} so'm`}>
                        <div className="performance-item">
                            <p>Jami qarzdorlik</p>
                            <h3>{totalIndebtedness === 0 ? "" : formatMoney(totalIndebtedness)}</h3>
                            <p>7,35% o'sib ketdi</p>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default PortfolioPerformance;

