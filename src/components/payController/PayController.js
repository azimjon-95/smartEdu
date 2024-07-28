import React, { useState } from "react";
import { Input, Table, Button, Select } from "antd";
import {
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../../context/studentsApi";
import { useCreatePaymentMutation } from "../../context/payStudentsApi";
import {
  SearchOutlined,
  DollarOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import "./style.css";
import { NumberFormat, PhoneNumberFormat } from "../../hook/NumberFormat";

const { Option } = Select;

const PayController = () => {
  const { data } = useGetStudentQuery();
  const [updateStudent] = useUpdateStudentMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  console.log(data);
  const mainData = data?.filter((s) => s.state === "active");
  // Unikal o'qituvchilar nomlarini yig'ish
  const teacherNames = Array.from(
    new Set(mainData?.flatMap((student) => student.teacherFullName))
  );

  // O'qituvchi tanlanganda ma'lumotlarni olish
  const handleTeacherChange = (value) => {
    setSelectedTeacher(value);
  };

  // Tanlangan o'qituvchiga qarab o'quvchilarni filtrlash
  const filteredStudents = mainData?.filter((student) => {
    const matchesTeacher = selectedTeacher
      ? student.teacherFullName.includes(selectedTeacher)
      : true;
    const matchesSearchTerm =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentPhoneNumber.includes(searchTerm) ||
      student.studentPhoneNumber.includes(searchTerm);
    return matchesTeacher && matchesSearchTerm;
  });

  const totalIndebtedness = filteredStudents?.reduce(
    (acc, student) => acc + student.indebtedness.debtorPay,
    0
  );
  const handlePayment = async (studentId) => {
    try {
      const student = mainData?.find((student) => student._id === studentId);
      if (student) {
        // Prepare payment data
        const AllData = {
          fullName: `${student.firstName} ${student.lastName}`,
          studentId: student._id,
          studentFees: paymentAmount,
          subject: student.subject,
        };
        await createPayment(AllData)
          .then((res) => console.log(res))
          .catch((res) => console.log(res));

        const Data = {
          ...student,
          indebtedness: {
            ...student.indebtedness,
            debtorPay: student.indebtedness.debtorPay - paymentAmount,
          },
        };

        await updateStudent({ id: student?._id, body: Data })
          .then((res) => console.log(res))
          .catch((res) => console.log(res));

        // To'lov miqdorini tozalash
        setPaymentAmount(0);
        // Tanlangan o'quvchini tozalash
        setSelectedStudent(null);
        // Input qiymatini tozalash
        setInputValue("");
      }
    } catch (error) {
      console.error("Payment failed: ", error);
    }
  };

  const handleInputChange = (e, record) => {
    setInputValue(e.target.value);
    setPaymentAmount(Number(e.target.value));
    setSelectedStudent(record._id);
  };

  const columns = [
    {
      title: "Ismi va Familiyasi",
      key: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Telefon raqami",
      dataIndex: "studentPhoneNumber",
      key: "studentPhoneNumber",
      render: (text, record) => (
        <span>{PhoneNumberFormat(record.studentPhoneNumber)} </span>
      ),
    },
    {
      title: "Ota-onaning telefon raqami",
      dataIndex: "parentPhoneNumber",
      key: "parentPhoneNumber",
      render: (text, record) => (
        <span>{PhoneNumberFormat(record.parentPhoneNumber)} </span>
      ),
    },
    {
      title: "Ustozi",
      dataIndex: "teacherFullName",
      key: "teacherFullName",
    },
    {
      title: "Fani",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Qarzdorlik",
      dataIndex: "indebtedness",
      key: "indebtedness",
      render: (text, record) =>
        record.indebtedness.debtorPay === 0
          ? 0
          : `${NumberFormat(record.indebtedness.debtorPay)} so'm`,
    },
    {
      title: "To'lov",
      key: "payment",
      render: (text, record) => (
        <div className="payment-container">
          <Input
            style={{ width: "100px" }}
            type="number"
            placeholder="To'lov miqdori"
            value={selectedStudent === record._id ? inputValue : ""}
            onChange={(e) => handleInputChange(e, record)}
          />
          <Button
            type="primary"
            onClick={() => handlePayment(record._id)}
            disabled={!paymentAmount || selectedStudent !== record._id}
          >
            To'lash
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <h2 className="pay-controller-title">To'lov bo'limi</h2>
      <div className="total-card">
        <div className="search_bar">
          <Input
            placeholder="O'quvchilarni qidirish"
            style={{ width: "100%" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <Select
            style={{ width: 200 }}
            placeholder="O'qituvchini tanlang"
            onChange={handleTeacherChange}
            value={selectedTeacher}
          >
            <Option value={null}>Barchasi</Option>
            {teacherNames?.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </div>
        <p className="total-text">
          <DollarOutlined style={{ marginRight: 5 }} />
          Jami qarzdorlik:{" "}
          {totalIndebtedness === 0
            ? ""
            : `${NumberFormat(totalIndebtedness)} so'm`}
        </p>
        <p className="total-text">
          <UsergroupDeleteOutlined style={{ marginRight: 5 }} />
          Jami qarzdorlar: {filteredStudents?.length}
        </p>
      </div>
      <Table
        pagination={false}
        size="small"
        columns={columns}
        dataSource={filteredStudents}
        rowKey="_id"
      />
    </>
  );
};

export default PayController;
