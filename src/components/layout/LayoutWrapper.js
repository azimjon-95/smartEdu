import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TeamOutlined, FileTextOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';

const { Sider, Header, Content } = Layout;

const CustomLayout = () => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState('1');

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
            default:
                setSelectedKey('1');
                break;
        }
    }, [location.pathname]);

    return (
        <Layout style={{ minHeight: '100vh', overflow: "hidden" }}>
            <Sider collapsible>
                <img width={200} src={logo} alt="" />
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
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
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

