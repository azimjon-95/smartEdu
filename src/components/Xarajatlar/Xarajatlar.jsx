import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, Button, Typography, Table, message, Tooltip } from 'antd';
import { UserOutlined, DollarOutlined, ClockCircleOutlined, FileDoneOutlined } from '@ant-design/icons';
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from 'react-icons/bs'; // Import the icons
import './Xarajat.css';
import { IoSearchSharp } from "react-icons/io5";
import axios from '../../api';
import 'antd/dist/reset.css';

const { Paragraph } = Typography;
const { Option } = Select;

const Xarajatlar = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [filterByDateRange, setFilterByDateRange] = useState(""); // New state for filter by date range

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Xarajatlarni olish
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/all-expenses');
      if (response && response.data && response.data.data) {
        setDataSource(response.data.data);
      } else {
        message.error('Ma\'lumotni olishda xatolik yuz berdi');
      }
    } catch (error) {
      message.error("Xarajatlarni olishda xatolik yuz berdi");
    }
  };

  // Xarajatni qo'shish
  const handleSubmit = async (values) => {
    const { amount, expenseType, description, name } = values;
    const newExpense = {
      name,
      amount: +amount,
      status: true,
      category: expenseType,
      decription: description || "",
      eduId: "someEduId", // Haqiqiy eduId ni qo'llang
    };

    try {
      const response = await axios.post('/api/create-expense', newExpense);
      if (response) {
        message.success(response.message);
        setDataSource(prevData => [...prevData, newExpense]);
        form.resetFields(); // Formani tozalash
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Xarajatni qo'shishda xatolik yuz berdi");
    }
  };

  // Jadval ustunlari
  const columns = [
    {
      title: 'Xarajat',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => {
        const formattedAmount = new Intl.NumberFormat('uz-UZ').format(text); // Format the amount
        return (
          <span className='Stayle'>
            {!record.status ? (
              <span style={{ color: 'green', marginLeft: '8px' }}>
                <BsArrowDownSquareFill />
              </span>
            ) : (
              <span style={{ color: 'red', marginLeft: '8px' }}>
                <BsArrowUpSquareFill />
              </span>
            )}
            {formattedAmount} so'm
          </span>
        );
      },
    },
    {
      title: 'Kim tomonidan',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span><UserOutlined /> {text}</span>,
    },
    {
      title: 'Xarajat turi',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <span><FileDoneOutlined /> {text}</span>,
    },
    {
      title: 'Izoh',
      dataIndex: 'decription',
      key: 'decription',
      render: (text) => (
        text ? (
          <span>{text}</span>
        ) : (
          <Tooltip title="Izoh kiritilmagan">
            <span>Izoh bor</span>
          </Tooltip>
        )
      ),
    },
    {
      title: 'Vaqt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span><ClockCircleOutlined /> {new Date(text).toLocaleString()}</span>,
    },
  ];

  // Filter by name and date range
  const filterData = dataSource.filter((i) => {
    const nameMatches = i.name.toLowerCase().includes(filterByName.toLowerCase());
    const amountMatches = String(i.amount).includes(filterByName);

    // Filter by date range
    let dateMatches = true;
    if (filterByDateRange) {
      const createdAt = new Date(i.createdAt);
      const now = new Date();
      switch (filterByDateRange) {
        case "day":
          dateMatches = createdAt.toDateString() === now.toDateString();
          break;
        case "week":
          const weekStart = new Date(now.setDate(now.getDate() - 7));
          dateMatches = createdAt >= weekStart;
          break;
        case "month":
          dateMatches = createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
          break;
        case "year":
          dateMatches = createdAt.getFullYear() === now.getFullYear();
          break;
        default:
          dateMatches = true;
      }
    }

    return (nameMatches || amountMatches) && dateMatches;
  });

  return (
    <div className="xarajatlar">
      <div className="Xarajat_left">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={<span><UserOutlined /> Ism familya</span>}
                rules={[{ required: true, message: 'Iltimos, ism familyangizni kiriting!' }]}
              >
                <Input placeholder="Ismingizni kiriting" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="expenseType"
                label={<span><DollarOutlined /> Xarajat turi</span>}
                rules={[{ required: true, message: 'Iltimos, xarajat turini tanlang!' }]}
              >
                <Select placeholder="Xarajat turini tanlang">
                  <Option value="komunal">Komunal to'lov</Option>
                  <Option value="ijara">Ijara</Option>
                  <Option value="soliq">Soliq</Option>
                  <Option value="oylik">Oylik ish haqi</Option>
                  <Option value="kitoblar">Kitoblar</Option>
                  <Option value="materiallar">Materiallar</Option>
                  <Option value="elektronika">Elektronika</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="amount"
                label={<span><UserOutlined /> Pull miqdori</span>}
                rules={[{ required: true, message: 'Iltimos, pul miqdorini kiriting!' }]}
              >
                <Input placeholder="Pul miqdorini kiriting" type="number" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="description"
                label={<span><FileDoneOutlined /> Izoh</span>}
              >
                <Input.TextArea placeholder="Xarajat haqida izoh yozing" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<FileDoneOutlined />}>
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="Xarajat_right">
        <div className="Xarajat_filter">
          <div className="xarajat-filter-box">
            <Input 
              type="search" 
              value={filterByName} 
              onChange={(e) => setFilterByName(e.target.value)} 
              placeholder="Xarajatlarni qidiring"
              prefix={<IoSearchSharp />}
              style={{
                borderRadius: "4px",
                width: "100%",
                color:"gray"
              }}
            />
          </div>
          <div className="xarajat-filter-box1">
            <Select
             

              value={filterByDateRange}
              onChange={(value) => setFilterByDateRange(value)}
              style={{ width: '100%' }}
              placeholder="Filtrlash"
            >
              
              <Option value="day">Kun bo'yicha</Option>
              <Option value="week">Hafta bo'yicha</Option>
              <Option value="month">Oy bo'yicha</Option>
              <Option value="year">Yil bo'yicha</Option>
              
            </Select>
          </div>
        </div>
        {dataSource.length > 0 ? (
          <Table
            columns={columns}
            dataSource={filterData}
            pagination={false}
            bordered
            size="small"
          />
        ) : (
          <Paragraph>Xarajatlarni to'ldiring.</Paragraph>
        )}
      </div>
    </div>
  );
};

export default Xarajatlar;

