import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Space, Layout, Menu, Button, Popover } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from "react-icons/gi";
import { FileDoneOutlined, CreditCardOutlined, DollarOutlined, MenuFoldOutlined, LogoutOutlined, MenuUnfoldOutlined, TeamOutlined, FileTextOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useGetBalansQuery } from '../../context/balansApi.js';
import logo from '../../assets/logo.png';
import collapsedLogo from '../../assets/collapsedLogo.jpg';
import './style.css';
import Snowfall from '../snowFall/Snowfall';
import { NumberFormat } from '../../hook/NumberFormat.js';

const { Sider, Content } = Layout;

const CustomLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const { data: balans, isLoading, error } = useGetBalansQuery();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [activeItem, setActiveItem] = useState(null);
    const teacherType = localStorage.getItem("teacherType");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuRef = useRef(null);

    useEffect(() => {
        const menu = menuRef.current;

        let isDown = false;
        let startX;
        let scrollLeft;

        const mouseDownHandler = (e) => {
            isDown = true;
            menu.classList.add('active');
            startX = e.pageX - menu.offsetLeft;
            scrollLeft = menu.scrollLeft;
        };

        const mouseLeaveHandler = () => {
            isDown = false;
            menu.classList.remove('active');
        };

        const mouseUpHandler = () => {
            isDown = false;
            menu.classList.remove('active');
        };

        const mouseMoveHandler = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - menu.offsetLeft;
            const walk = (x - startX) * 3; // Scroll-fast
            menu.scrollLeft = scrollLeft - walk;
        };

        const touchStartHandler = (e) => {
            isDown = true;
            menu.classList.add('active');
            startX = e.touches[0].pageX - menu.offsetLeft;
            scrollLeft = menu.scrollLeft;
        };

        const touchEndHandler = () => {
            isDown = false;
            menu.classList.remove('active');
        };

        const touchMoveHandler = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - menu.offsetLeft;
            const walk = (x - startX) * 3; // Scroll-fast
            menu.scrollLeft = scrollLeft - walk;
        };

        if (menu) {
            menu.addEventListener('mousedown', mouseDownHandler);
            menu.addEventListener('mouseleave', mouseLeaveHandler);
            menu.addEventListener('mouseup', mouseUpHandler);
            menu.addEventListener('mousemove', mouseMoveHandler);
            menu.addEventListener('touchstart', touchStartHandler);
            menu.addEventListener('touchend', touchEndHandler);
            menu.addEventListener('touchmove', touchMoveHandler);
        }

        return () => {
            if (menu) {
                menu.removeEventListener('mousedown', mouseDownHandler);
                menu.removeEventListener('mouseleave', mouseLeaveHandler);
                menu.removeEventListener('mouseup', mouseUpHandler);
                menu.removeEventListener('mousemove', mouseMoveHandler);
                menu.removeEventListener('touchstart', touchStartHandler);
                menu.removeEventListener('touchend', touchEndHandler);
                menu.removeEventListener('touchmove', touchMoveHandler);
            }
        };
    }, []);

    useEffect(() => {
        const pathnameToKeyMap = {
            '/reports': '1',
            '/activeGroups': '2',
            '/createCards': '3',
            '/getTeacher': '4',
            '/payController': '5'
        };
        setSelectedKey(pathnameToKeyMap[location.pathname] || '1');
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("doctorMongoId");
        navigate("/login"); // Change to navigate to login page
    };

    const content = (
        <div style={{ display: "flex", alignItems: "start", flexDirection: "column" }}>
            <Button type="link" icon={<UserOutlined />} onClick={() => navigate('/single_page')}>
                Profil
            </Button>
            <Button style={{ color: "red", borderTop: ".5px solid #cfcfcf", borderRadius: '0px' }} type="link" icon={<LogoutOutlined />} onClick={handleLogout}>
                Chiqish
            </Button>
        </div>
    );

    const menuItems = [
        { key: '1', icon: <FileTextOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/reports">{isMobile ? "Qabul" : "Qabul Bo'limi"}</Link> },
        { key: '2', icon: <TeamOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/activeGroups">{isMobile ? "Guruhlar" : "Aktiv Guruhlar"}</Link> },
        { key: '3', icon: <UserAddOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/createCards">{isMobile ? "Yangi Guruh" : "Guruh Ochish"}</Link> },
        { key: '4', icon: <UserOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/getTeacher">{isMobile ? "Ustozlar" : "Ustozlar"}</Link> },
        { key: '5', icon: <DollarOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/payController">{isMobile ? "To'lov" : "To'lovlar"}</Link> },
        {
            key: '6',
            icon: <FileDoneOutlined style={isMobile ? { fontSize: '22px' } : {}} />,
            label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/payController">
                {isMobile ? "Sertifikat" : "Sertifikat bo'limi"}
            </Link>
        },
        {
            key: '7',
            icon: <CreditCardOutlined style={isMobile ? { fontSize: '22px' } : {}} />,
            label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/expenses">
                {isMobile ? "Xarajat" : "Xarajatlar"}
            </Link>
        }
    ];

    const menuTeacher = [
        { key: '1', icon: <TeamOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/groups">{isMobile ? "Guruhlar" : "Guruhlar"}</Link> },
        { key: '2', icon: <UserOutlined style={isMobile ? { fontSize: '22px' } : {}} />, label: <Link style={{ textDecoration: "none", color: "#b8b8b8" }} to="/students">{isMobile ? "Ustozlar" : "Ustozlar"}</Link> },
    ];

    const handleClick = (item) => {
        setActiveItem(item);
    };

    const renderMobileMenuItems = (items) => {
        return items.map((item) => (
            <div
                key={item.key}
                onClick={() => handleClick(item)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50px',
                    padding: "0 4px",
                    borderRadius: " 7px",
                    zIndex: 10,
                    backgroundColor: activeItem?.key === item.key ? 'dodgerblue' : '',
                    cursor: 'pointer',
                    color: activeItem?.key === item.key ? "#e9e9e9" : "",

                }}
                className="mobileBottom_menu"
            >
                <span>{item.icon}</span>
                <span style={{ fontSize: '13px', textDecoration: 'none' }}>{item.label}</span>
            </div >
        ));
    };

    return (
        <Layout style={{ minHeight: '100vh', overflow: "hidden", background: "#048e38" }}>
            <Sider trigger={null} collapsible collapsed={collapsed} className={`custom-sider ${collapsed ? 'ant-layout-sider-collapsed' : ''}`}>
                <div className="demo-logo-vertical" />
                <div style={{ overflow: "hidden" }} className={collapsed ? "mainLogoNone" : "mainLogo"}>
                    <Snowfall />
                    <img width={collapsed ? 45 : 190} src={collapsed ? collapsedLogo : logo} alt="Logo" />
                </div>
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline"
                    items={teacherType === 'owner' ? menuItems : menuTeacher}
                />
            </Sider>

            <Layout className="site-layout">
                <div className="MainNavbar">
                    {!isMobile && (
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '22px' }} /> : <MenuFoldOutlined style={{ fontSize: '22px' }} />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '22px',
                                width: 64,
                                height: 64,
                                zIndex: 10
                            }}
                        />
                    )}
                    <Snowfall />
                    <Space className="Space_mobile" style={{ zIndex: 3 }} wrap size={16}>
                        <Link style={{ textDecoration: "none", color: "#333", zIndex: 3 }} to="/balans">
                            <div className="allBalans">
                                <div style={{ display: "flex", alignItems: "center", gap: "3px", justifyContent: "center", fontSize: '12px', lineHeight: "10px", textAlign: "center" }}><GiTakeMyMoney /> Balans</div>
                                {isLoading && <div>Yuklanmoqda...</div>}
                                {error && <div>Xatolik yuz berdi: {error.message}</div>}
                                {!isLoading && !error && (
                                    <>
                                        {balans?.map((item) => (
                                            <div key={item._id}>
                                                {item.balans === 0 ? "" : `${NumberFormat(item.balans)} so'm`}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </Link>
                        <Popover content={content} trigger="click">
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Popover>
                    </Space>
                </div>
                <Content>
                    <div style={{ padding: 5 }}>
                        <Outlet />
                    </div>
                    {isMobile && (
                        <>
                            <br />
                            <br />
                            <br />
                        </>
                    )}
                </Content>
            </Layout>


            {isMobile && (
                <div
                    ref={menuRef}
                    className='MenuMobile menu-horizontal'>
                    {teacherType === 'owner'
                        ? renderMobileMenuItems(menuItems)
                        : renderMobileMenuItems(menuTeacher)
                    }
                </div>
            )}
        </Layout>
    );
};

export default CustomLayout;



