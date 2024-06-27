// Layout.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { UsergroupAddOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';
const { Sider, Header, Content } = Layout;

const CustomLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh', overflow: "hidden" }}>
            <Sider collapsible>
                <img width={200} src={logo} alt="" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<FileTextOutlined />}>
                        <Link to="/reports">Qabul bo'limi</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to="/activeGroups">Aktiv Gruxlar</Link>
                    </Menu.Item>

                    <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
                        <Link to="/createCards">Gruppa ochish</Link>
                    </Menu.Item>

                    <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
                        <Link to="/getTeacher">Ustozni ishga qabul qilish</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content >
                    <div style={{ padding: 15, }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;



