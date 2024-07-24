import React, { useState, useEffect } from 'react';
import { Avatar, Space, Layout, Menu, Button, Popover, Modal } from 'antd';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from "react-icons/gi";
import {
    DollarOutlined, MenuFoldOutlined, LogoutOutlined, MenuUnfoldOutlined, TeamOutlined, FileTextOutlined, UserAddOutlined, UserOutlined
} from '@ant-design/icons';
import { useGetBalansQuery } from '../../context/balansApi.js';
import logo from '../../assets/logo.png';
import collapsedLogo from '../../assets/collapsedLogo.jpg'; // Yangi rasm
import './style.css';
import Snowfall from '../snowFall/Snowfall';
import { NumberFormat, PhoneNumberFormat } from '../../hook/NumberFormat.js';

const { Sider, Content } = Layout;

const CustomLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const { data: balans, isLoading, error } = useGetBalansQuery();

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
                setSelectedKey('1');
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

    return (
        <Layout style={{ minHeight: '100vh', overflow: "hidden", background: "#048e38" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div style={{ overflow: "hidden" }} className={collapsed ? "mainLogoNone" : "mainLogo"}>
                    <Snowfall />
                    <img width={collapsed ? 45 : 190} src={collapsed ? collapsedLogo : logo} alt="Logo" />
                </div>
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
                    <Menu.Item key="1" icon={<FileTextOutlined />}>
                        <Link to="/reports">Qabul Bo'limi</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to="/activeGroups">Aktiv Guruhlar</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserAddOutlined />}>
                        <Link to="/createCards">Guruh Ochish</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link to="/getTeacher">Ustozlar</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<DollarOutlined />}>
                        <Link to="/payController">To'lovlar</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <div className="MainNavbar">
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
                    <Snowfall />

                    <Space style={{ zIndex: 3 }} wrap size={16}>
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
                </Content>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
