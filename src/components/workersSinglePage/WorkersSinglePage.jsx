import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  Table,
  Image,
  message,
  Row,
  // Col,
} from "antd";
import Selectt from "react-select";
import { useParams } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "./style.css";
import { IdCapitalize } from "../../hook/IDCapitalize";
import img1 from "./img/female.png";
import img2 from "./img/teacher.png";

// Mock data
const mockDataDoctors = {
  _id: "123",
  idNumber: "D001",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  address: "123 Main St, Springfield",
  specialization: "Cardiology",
  experience: 10,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const WorkersSinglePage = () => {
  const clinicId = "mockClinicId";

  const [componentDisabled, setComponentDisabled] = useState(true);
  const { id } = useParams();
  const dataDoctors = mockDataDoctors;
  const [random, setRandom] = useState();
  const [form] = Form.useForm();

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState({
    region: "",
    district: "",
    quarter: "",
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [quarters, setQuarters] = useState([]);

  const [extraClass, setExtraClass] = useState(false);
  const [extraClass2, setExtraClass2] = useState(false);
  const [extraClass3, setExtraClass3] = useState(false);

  useEffect(() => {
    // Simulate API call to get regions
    const mockRegions = [
      { value: "Region1", label: "Region 1", regionID: "1" },
      { value: "Region2", label: "Region 2", regionID: "2" },
    ];
    setRegions(mockRegions);
  }, []);

  const getDistricts = (regionID) => {
    // Simulate API call to get districts based on regionID
    const mockDistricts = [
      { value: "District1", label: "District 1", districtID: "1" },
      { value: "District2", label: "District 2", districtID: "2" },
    ];
    setDistricts(mockDistricts);
  };

  const getQuarters = (districtID) => {
    // Simulate API call to get quarters based on districtID
    const mockQuarters = [
      { value: "Quarter1", label: "Quarter 1", quarterID: "1" },
      { value: "Quarter2", label: "Quarter 2", quarterID: "2" },
    ];
    setQuarters(mockQuarters);
  };

  const onFinish = (values) => {
    const newInfo = {
      ...dataDoctors,
      ...values,
      address,
      phone,
    };
    // Simulate API call to update doctor information
    console.log("Updated Doctor Info:", newInfo);
    message.success("Ma'lumotlar muvaffaqiyatli o'zgartirildi");
  };

  const columns = [
    {
      title: "Xodim",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "info",
    },
  ];

  const createdDate = new Date(dataDoctors?.createdAt).toLocaleString();
  const updatedDate = new Date(dataDoctors?.updatedAt).toLocaleString();
  const data = [
    {
      key: "1",
      name: "Rasm",
      info: (
        <div className="ObjIng">
          <img
            src={`${dataDoctors?.lastName.endsWith("e") ? img2 : img1}`}
            alt="error"
          />
        </div>
      ),
    },
    {
      key: "2",
      name: "ID raqami",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {IdCapitalize(dataDoctors?.idNumber)}
        </div>
      ),
    },
    {
      key: "3",
      name: "Ismi",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {dataDoctors?.firstName?.toUpperCase()}
        </div>
      ),
    },
    {
      key: "4",
      name: "Familiya",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {dataDoctors?.lastName?.toUpperCase()}
        </div>
      ),
    },
    {
      key: "5",
      name: "Tug'ilgan sana",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {dataDoctors?.dateOfBirth}
        </div>
      ),
    },
    {
      key: "6",
      name: "Manzil",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {dataDoctors?.address}
        </div>
      ),
    },
    {
      key: "7",
      name: "Mutaxassislik",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {dataDoctors?.specialization}
        </div>
      ),
    },
    {
      key: "8",
      name: "Ilmiy daraja",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
          {dataDoctors?.experience === undefined
            ? "Darajasiz"
            : dataDoctors?.experience + " yil"}
        </div>
      ),
    },
    {
      key: "8",
      name: "Ilmiy unvon",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>{"Unvonsiz"}</div>
      ),
    },
    {
      key: "9",
      name: "Yaratilgan",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>{createdDate}</div>
      ),
    },
    {
      key: "10",
      name: "O'zgartirigan",
      info: (
        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>{updatedDate}</div>
      ),
    },
  ];

  return (
    <div className="userSingle-info">
      <div className="userSingle-info-box">
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={dataDoctors}
          {...formItemLayout}
          variant="filled"
          layout="vertical"
          autoComplete="off"
          style={{
            width: "330px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Form.Item
              label="Ismi"
              name="firstName"
              className="Form-Item"
              rules={[
                {
                  required: true,
                  message: "Ismi kiriting",
                },
              ]}
            >
              <Input
                disabled={true}
                style={{
                  width: "150px",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Familiya"
              name="lastName"
              className="Form-Item"
              rules={[
                {
                  required: true,
                  message: "Familiya kiriting",
                },
              ]}
            >
              <Input
                disabled={true}
                style={{
                  width: "150px",
                }}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="ID raqami"
            className="Form-Item"
            name="idNumber"
            rules={[
              {
                required: true,
                message: "ID raqami kiriting",
              },
            ]}
          >
            <Input
              disabled={true}
              style={{
                width: "310px",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Login"
            className="Form-Item"
            name="login"
            rules={[
              {
                required: true,
                message: "Login kiriting!",
              },
            ]}
          >
            <Input
              disabled={true}
              style={{
                width: "310px",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Telefon"
            name="phone"
            className="Form-Item"
            rules={[
              {
                required: true,
                message: "Telefon raqamingizni kiriting!",
              },
            ]}
          >
            <PhoneInput
              defaultCountry="uz"
              value={phone}
              placeholder="+998 xx xxx xx xx"
              style={{ width: "310px" }}
              inputStyle={{ width: "100%" }}
              onChange={(e) =>
                e.length === 13 && setPhone(e.replace("+998", ""))
              }
            />
          </Form.Item>
          <Row
            style={{
              gap: "5px",
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <Selectt
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: extraClass ? 150 : 100,
                }),
              }}
              onMenuOpen={() => setExtraClass(true)}
              onMenuClose={() => setExtraClass(false)}
              onChange={(e) => {
                getDistricts(e.regionID);
                setAddress((address) => ({
                  ...address,
                  region: e.value,
                }));
              }}
              options={regions}
            />
            <Selectt
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: extraClass2 ? 150 : 100,
                }),
              }}
              onMenuOpen={() => setExtraClass2(true)}
              onMenuClose={() => setExtraClass2(false)}
              onChange={(e) => {
                getQuarters(e.districtID);
                setAddress((address) => ({
                  ...address,
                  district: e.value,
                }));
              }}
              options={districts}
            />
            <Selectt
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: extraClass3 ? 150 : 100,
                }),
              }}
              onMenuOpen={() => setExtraClass3(true)}
              onMenuClose={() => setExtraClass3(false)}
              options={quarters}
              onChange={(e) =>
                setAddress((address) => ({
                  ...address,
                  quarter: e.value,
                }))
              }
            />
            {/* </Form.Item> */}
          </Row>

          {/* </Col> */}
          {/* </div> */}
          {/* </Col> */}
          {/* </div> */}
          <Checkbox
            style={{ marginTop: "10px" }}
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Parolni o'zgartirish
          </Checkbox>
          <Form.Item
            className="Form-Item"
            name="password"
            rules={[
              {
                required: true,
                message: "Parol kiriting",
              },
            ]}
          >
            <Input
              disabled={componentDisabled}
              style={{
                width: "310px",
              }}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Form.Item
              label="Tasdiqlash"
              className="Form-Item"
              name="password"
              style={{
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                  message: "Tasdiqlang!",
                },
              ]}
            >
              <Input
                placeholder="Parol tasdiqlang"
                disabled={componentDisabled}
                style={{
                  width: "310px",
                }}
              />
            </Form.Item>

            <Button
              style={{ width: "94%", marginTop: "34px" }}
              type="primary"
              htmlType="submit"
            >
              O'zgartirish
            </Button>
          </div>
        </Form>
        <div>
          <div
            style={{
              fontSize: "14px",
              marginTop: "10px",
            }}
            onClick={() => {
              setRandom(Date.now());
            }}
          >
            Rasim
          </div>
          <Image
            width={100}
            height={100}
            style={{
              border: "2px dotted gray",
              padding: "3px 3px 0px 3px",
              borderRadius: "5px",
            }}
            src={`${dataDoctors?.lastName.endsWith("a") ? img2 : img1
              }?${random}`}
            placeholder={
              <Image
                preview={false}
                src={`${dataDoctors?.lastName.endsWith("a") ? img2 : img1
                  }?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                width={100}
              />
            }
          />
        </div>
      </div>
      <Table
        style={{
          borderTop: "3px solid #d2d2d2",
          width: "50%",
          borderRadius: "5px",
        }}
        bordered={true}
        pagination={false}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>

  );
};

export default WorkersSinglePage;












// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Checkbox,
//   Table,
//   Image,
//   message,
//   Row,
//   // Col,
// } from "antd";
// import Selectt from "react-select";
// import { useParams } from "react-router-dom";
// import { PhoneInput } from "react-international-phone";
// import { useGetStoriesQuery } from "../../redux/clientStores";
// import { useGetClinicQuery } from "../../redux/clinicApi";
// import {
//   useGetAllDoctorsQuery,
//   useUpdateDoctorMutation,
// } from "../../redux/doctorApi";
// import LayoutWrapper from "../layout/Layout";
// import "./style.css";
// import { IdCapitalize } from "../../hook/IDCapitalize";
// import axios from "../../api";
// import img1 from "./img/doctor.png";
// import img2 from "./img/doctorWomen.png";

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 6,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 14,
//     },
//   },
// };

// const WorkersSinglePage = () => {
//   const clinicId = localStorage.getItem("doctorMongoId");

//   const [componentDisabled, setComponentDisabled] = useState(true);
//   const { data: clinics = [] } = useGetClinicQuery();
//   console.log(clinics.data);
//   let { data: allDoctors } = useGetAllDoctorsQuery();
//   let doctors = allDoctors?.data || [];
//   const { id } = useParams();
//   let dataDoctors = doctors?.find(
//     (i) => i?.idNumber === id && i?.clinicId === clinicId
//   );
//   console.log(dataDoctors, clinicId);
//   const [random, setRandom] = useState();
//   const [form] = Form.useForm();

//   const [phone, setPhone] = useState("");

//   const [address, setAddress] = useState({
//     region: "",
//     district: "",
//     quarter: "",
//   });

//   const [regions, setRegions] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [quarters, setQuarters] = useState([]);

//   const [extraClass, setExtraClass] = useState(false);
//   const [extraClass2, setExtraClass2] = useState(false);
//   const [extraClass3, setExtraClass3] = useState(false);

//   let headers = {
//     headers: {
//       authentication: `Bearer ${localStorage.token}`,
//     },
//   };

//   useEffect(() => {
//     axios
//       .get("/regions/getRegions", headers)
//       .then((res) => setRegions(res?.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const getDistricts = (regionID) => {
//     axios
//       .get(`/regions/getDistricts/${regionID}`, headers)
//       .then((res) => setDistricts(res.data))
//       .catch((err) => console.log(err));
//   };

//   const getQuarters = (districtID) => {
//     axios
//       .get(`/regions/getQuarters/${districtID}`, headers)
//       .then((res) => setQuarters(res.data))
//       .catch((err) => console.log(err));
//   };
//   // let { data: allClients } = useGetUsersQuery();
//   // let clients = allClients?.data || [];
//   let [updateDoctor] = useUpdateDoctorMutation();

//   // const usgbuArray = Object.entries(dataDoctors).map(([key, value]) => ({ [key]: value }));

//   // console.log(usgbuArray);

//   const { data: stories } = useGetStoriesQuery();
//   const dataStories = stories?.innerData || [];

//   let filterStores = dataStories?.filter(
//     (i) => i?.clientID === id && i?.view === true
//   );

//   // Agar userInfo lastname xususiyati oxirgi xarifini tekshirish

//   const doctorTypeCount = {};
//   filterStores.forEach((appointment) => {
//     const doctorType = appointment.doctorType;
//     if (doctorType) {
//       doctorTypeCount[doctorType] = (doctorTypeCount[doctorType] || 0) + 1;
//     }
//   });

//   const onFinish = (values) => {
//     const newInfo = {
//       ...dataDoctors,
//       ...values,
//       address,
//       phone,
//     };
//     updateDoctor({ id: dataDoctors?._id, body: newInfo })
//       .then((res) => {
//         if (res?.data?.success) {
//           message.success(res?.data?.message);
//         }
//       })
//       .catch((err) => console.log("err", err));
//   };

//   const columns = [
//     {
//       title: "Xodim",
//       dataIndex: "name",
//     },
//     {
//       title: "",
//       dataIndex: "info",
//     },
//   ];

//   const createdDate = new Date(dataDoctors?.createdAt).toLocaleString();
//   const updatedDate = new Date(dataDoctors?.updatedAt).toLocaleString();
//   const data = [
//     {
//       key: "1",
//       name: "Rasm",
//       info: (
//         <div className="ObjIng">
//           <img
//             src={`${dataDoctors?.lastName.endsWith("a") ? img2 : img1}`}
//             alt="error"
//           />
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       name: "ID raqami",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {IdCapitalize(dataDoctors?.idNumber)}
//         </div>
//       ),
//     },
//     {
//       key: "3",
//       name: "Ismi",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {dataDoctors?.firstName?.toUpperCase()}
//         </div>
//       ),
//     },
//     {
//       key: "4",
//       name: "Familiya",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {dataDoctors?.lastName?.toUpperCase()}
//         </div>
//       ),
//     },
//     {
//       key: "5",
//       name: "Tug'ilgan sana",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {dataDoctors?.dateOfBirth}
//         </div>
//       ),
//     },
//     {
//       key: "6",
//       name: "Manzil",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {dataDoctors?.address}
//         </div>
//       ),
//     },
//     {
//       key: "7",
//       name: "Mutaxassislik",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {dataDoctors?.specialization}
//         </div>
//       ),
//     },
//     {
//       key: "8",
//       name: "Ilmiy daraja",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>
//           {dataDoctors?.experience === undefined
//             ? "Darajasiz"
//             : dataDoctors?.experience + " yil"}
//         </div>
//       ),
//     },
//     {
//       key: "8",
//       name: "Ilmiy unvon",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>{"Unvonsiz"}</div>
//       ),
//     },
//     {
//       key: "9",
//       name: "Yaratilgan",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>{createdDate}</div>
//       ),
//     },
//     {
//       key: "10",
//       name: "O'zgartirigan",
//       info: (
//         <div style={{ fontSize: "13px", color: "#9e9e9e" }}>{updatedDate}</div>
//       ),
//     },
//   ];

//   return (
//     <LayoutWrapper>
//       <div className="userSingle-info">
//         <div className="userSingle-info-box">
//           <Form
//             form={form}
//             onFinish={onFinish}
//             initialValues={dataDoctors}
//             {...formItemLayout}
//             variant="filled"
//             layout="vertical"
//             autoComplete="off"
//             style={{
//               width: "330px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 gap: "10px",
//               }}
//             >
//               <Form.Item
//                 label="Ismi"
//                 name="firstName"
//                 className="Form-Item"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Ismi kiriting",
//                   },
//                 ]}
//               >
//                 <Input
//                   disabled={true}
//                   style={{
//                     width: "150px",
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Familiya"
//                 name="lastName"
//                 className="Form-Item"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Familiya kiriting",
//                   },
//                 ]}
//               >
//                 <Input
//                   disabled={true}
//                   style={{
//                     width: "150px",
//                   }}
//                 />
//               </Form.Item>
//             </div>
//             <Form.Item
//               label="ID raqami"
//               className="Form-Item"
//               name="idNumber"
//               rules={[
//                 {
//                   required: true,
//                   message: "ID raqami kiriting",
//                 },
//               ]}
//             >
//               <Input
//                 disabled={true}
//                 style={{
//                   width: "310px",
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label="Login"
//               className="Form-Item"
//               name="login"
//               rules={[
//                 {
//                   required: true,
//                   message: "Login kiriting!",
//                 },
//               ]}
//             >
//               <Input
//                 disabled={true}
//                 style={{
//                   width: "310px",
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label="Telefon"
//               name="phone"
//               className="Form-Item"
//               rules={[
//                 {
//                   required: true,
//                   message: "Telefon raqamingizni kiriting!",
//                 },
//               ]}
//             >
//               <PhoneInput
//                 defaultCountry="uz"
//                 value={phone}
//                 placeholder="+998 xx xxx xx xx"
//                 style={{ width: "310px" }}
//                 inputStyle={{ width: "100%" }}
//                 onChange={(e) =>
//                   e.length === 13 && setPhone(e.replace("+998", ""))
//                 }
//               />
//             </Form.Item>
//             <Row
//               style={{
//                 gap: "5px",
//                 display: "flex",
//                 flexWrap: "nowrap",
//               }}
//             >
//               <Selectt
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     width: extraClass ? 150 : 100,
//                   }),
//                 }}
//                 onMenuOpen={() => setExtraClass(true)}
//                 onMenuClose={() => setExtraClass(false)}
//                 onChange={(e) => {
//                   getDistricts(e.regionID);
//                   setAddress((address) => ({
//                     ...address,
//                     region: e.value,
//                   }));
//                 }}
//                 options={regions}
//               />
//               <Selectt
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     width: extraClass2 ? 150 : 100,
//                   }),
//                 }}
//                 onMenuOpen={() => setExtraClass2(true)}
//                 onMenuClose={() => setExtraClass2(false)}
//                 onChange={(e) => {
//                   getQuarters(e.districtID);
//                   setAddress((address) => ({
//                     ...address,
//                     district: e.value,
//                   }));
//                 }}
//                 options={districts}
//               />
//               <Selectt
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     width: extraClass3 ? 150 : 100,
//                   }),
//                 }}
//                 onMenuOpen={() => setExtraClass3(true)}
//                 onMenuClose={() => setExtraClass3(false)}
//                 options={quarters}
//                 onChange={(e) =>
//                   setAddress((address) => ({
//                     ...address,
//                     quarter: e.value,
//                   }))
//                 }
//               />
//               {/* </Form.Item> */}
//             </Row>

//             {/* </Col> */}
//             {/* </div> */}
//             {/* </Col> */}
//             {/* </div> */}
//             <Checkbox
//               style={{ marginTop: "10px" }}
//               checked={componentDisabled}
//               onChange={(e) => setComponentDisabled(e.target.checked)}
//             >
//               Parolni o'zgartirish
//             </Checkbox>
//             <Form.Item
//               className="Form-Item"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Parol kiriting",
//                 },
//               ]}
//             >
//               <Input
//                 disabled={componentDisabled}
//                 style={{
//                   width: "310px",
//                 }}
//               />
//             </Form.Item>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "10px",
//               }}
//             >
//               <Form.Item
//                 label="Tasdiqlash"
//                 className="Form-Item"
//                 name="password"
//                 style={{
//                   width: "100%",
//                 }}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Tasdiqlang!",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="Parol tasdiqlang"
//                   disabled={componentDisabled}
//                   style={{
//                     width: "310px",
//                   }}
//                 />
//               </Form.Item>

//               <Button
//                 style={{ width: "94%", marginTop: "34px" }}
//                 type="primary"
//                 htmlType="submit"
//               >
//                 O'zgartirish
//               </Button>
//             </div>
//           </Form>
//           <div>
//             <div
//               style={{
//                 fontSize: "14px",
//                 marginTop: "10px",
//               }}
//               onClick={() => {
//                 setRandom(Date.now());
//               }}
//             >
//               Rasim
//             </div>
//             <Image
//               width={100}
//               height={100}
//               style={{
//                 border: "2px dotted gray",
//                 padding: "3px 3px 0px 3px",
//                 borderRadius: "5px",
//               }}
//               src={`${
//                 dataDoctors?.lastName.endsWith("a") ? img2 : img1
//               }?${random}`}
//               placeholder={
//                 <Image
//                   preview={false}
//                   src={`${
//                     dataDoctors?.lastName.endsWith("a") ? img2 : img1
//                   }?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
//                   width={100}
//                 />
//               }
//             />
//           </div>
//         </div>
//         <Table
//           style={{
//             borderTop: "3px solid #d2d2d2",
//             width: "50%",
//             borderRadius: "5px",
//           }}
//           bordered={true}
//           pagination={false}
//           columns={columns}
//           dataSource={data}
//           size="small"
//         />
//       </div>
//     </LayoutWrapper>
//   );
// };
// export default WorkersSinglePage;
