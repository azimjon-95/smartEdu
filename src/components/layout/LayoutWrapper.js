import React, { useState, useEffect } from 'react';
import { Avatar, Space, Layout, Menu, Button, Popover } from 'antd';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from "react-icons/gi";
import { DollarOutlined, MenuFoldOutlined, LogoutOutlined, MenuUnfoldOutlined, TeamOutlined, FileTextOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useGetBalansQuery } from '../../context/balansApi.js';
import logo from '../../assets/logo.png';
import collapsedLogo from '../../assets/collapsedLogo.jpg';
import './style.css';
import Snowfall from '../snowFall/Snowfall';
import { NumberFormat } from '../../hook/NumberFormat.js';

const { Header, Sider, Content } = Layout;

const CustomLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const { data: balans, isLoading, error } = useGetBalansQuery();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        switch (location.pathname) {
            case '/reports':
                setSelectedKey('1');
                break;
            case '/activeGroups':
                setSelectedKey('2');
                break;
            case '/createCards':
                setSelectedKey('3');
                break;
            case '/getTeacher':
                setSelectedKey('4');
                break;
            case '/payController':
                setSelectedKey('5');
                break;
            default:
                break;
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("doctorMongoId");
        navigate("/");
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
        { key: '1', icon: <FileTextOutlined style={isMobile ? { fontSize: '25px' } : {}} />, label: <Link style={{ textDecoration: "none" }} to="/reports">Qabul Bo'limi</Link> },
        { key: '2', icon: <TeamOutlined style={isMobile ? { fontSize: '25px' } : {}} />, label: <Link style={{ textDecoration: "none" }} to="/activeGroups">Aktiv Guruhlar</Link> },
        { key: '3', icon: <UserAddOutlined style={isMobile ? { fontSize: '25px' } : {}} />, label: <Link style={{ textDecoration: "none" }} to="/createCards">Guruh Ochish</Link> },
        { key: '4', icon: <UserOutlined style={isMobile ? { fontSize: '25px' } : {}} />, label: <Link style={{ textDecoration: "none" }} to="/getTeacher">Ustozlar</Link> },
        { key: '5', icon: <DollarOutlined style={isMobile ? { fontSize: '25px' } : {}} />, label: <Link style={{ textDecoration: "none" }} to="/payController">To'lovlar</Link> },
    ];

    const renderMobileMenuItems = (items) => {
        return items.map((item) => (
            <Menu.Item key={item.key} >
                <div style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60px"
                        // backgroundColor: "#ff5733"
                    }
                }
                    className="mobileBottom_menu"
                >
                    <span>{item.icon}</span>
                    <span style={{ fontSize: "13px", textDecoration: "none" }}>{item.label}</span>
                </div>
            </Menu.Item>
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
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={menuItems} />
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
                        <NavLink style={{ textDecoration: "none", color: "#333", zIndex: 3 }} to="/balans">
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
                        </NavLink>
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
                        </>
                    )}
                </Content>
            </Layout>

            {isMobile && (
                <div className='MenuMobile'>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[selectedKey]}
                    >
                        {renderMobileMenuItems(menuItems)}
                    </Menu>
                </div>
            )}

        </Layout>
    );
};

export default CustomLayout;




