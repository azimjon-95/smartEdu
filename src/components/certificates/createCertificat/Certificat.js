import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './style.css';
import { jsPDF } from 'jspdf';
import { message, Select } from 'antd';
import ReactToPrint from 'react-to-print';
import axios from '../../../api';
import { FiAlertCircle } from 'react-icons/fi';
import ReactJsCertificat from "../certificatesLists/reactJs/ReactJs";
import NodejsCertificat from "../certificatesLists/nodeJs/nodejsCertificat";
import { FiUploadCloud, FiArrowLeft, FiLoader } from 'react-icons/fi';
import JavaScriptCertificat from "../certificatesLists/javaScript/JavaScript";
import CssCertificat from "../certificatesLists/css/cssCertificat";
import RusTiliCertificat from "../certificatesLists/rus/RusTili";
import LevelKids from "../certificatesLists/engKids/LevelKids";
import Level from "../certificatesLists/engLevel/Level";
import Foundation from "../certificatesLists/foundation/Foundation";
import { useGetAllTeachersQuery } from '../../../context/teacherApi';
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
const { Option } = Select;
const certificateComponents = {
    react: ReactJsCertificat,
    nodejs: NodejsCertificat,
    javascript: JavaScriptCertificat,
    css: CssCertificat,
    eng: LevelKids,
    level: Level,
    rus: RusTiliCertificat,
    foundation: Foundation,
};

const Print = () => {
    const componentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(true);
    const { data: teachers } = useGetAllTeachersQuery();
    const [teacherFullName, setTeacherFullName] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        courseName: "",
        catigory: "",
        selectedFromDate: "",
        teacherName: "",
        directorFullName: "",
        uniqueId: "",
        EduName: "",
        URL: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const filteredData = teachers?.filter(s => s.teacherType === "teacher");
    console.log(filteredData);

    const handlePrint = async () => {
        setIsLoading(true);
        try {
            const input = componentRef.current;
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            const pdfOutput = pdf.output('blob');

            const formDataToSend = new FormData();
            formDataToSend.append('file', pdfOutput, `${formData.name}_${formData.surname}.pdf`);
            formDataToSend.append('fullName', `${formData.name} ${formData.surname}`);
            formDataToSend.append('date', formData.selectedFromDate);
            formDataToSend.append('teacherFullName', teacherFullName);
            formDataToSend.append('directorFullName', formData.directorFullName);
            formDataToSend.append('level', formData.courseName);

            const response = await axios.post('/api/bot/upload', formDataToSend);

            if (response.status === 200) {
                message.success('PDF muvaffaqiyatli yuborildi!');
            } else {
                throw new Error('Serverga yuborishda xatolik yuz berdi!');
            }
        } catch (error) {
            message.warning(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderCertificate = (Component, isForPrint) => (
        <Component
            ref={componentRef}
            obj={{ ...formData, pdf_class: "pdf_mainContainer" }}
        />
    );

    const CertificateComponent = certificateComponents[formData.courseName];

    return (
        <div>
            {show ? (
                <div className="pdf_formMain">
                    <h1 className="pdf_formMainTitle">SERTIFIKAT</h1>
                    <p className="pdf_formMainDesc">
                        <FiAlertCircle className="iconsM" />
                        SERTIFIKAT yaratish uchun quyidagi ma'lumotlarni kiritish zarur! Sertifikatni ko'rish tugmasi orqali SERTIFIKAT ni namunasini ko'rasiz.
                    </p>
                    <div className="pdf_formContainer">
                        <form className="pdf_form">
                            <div className="pdf_formFISH">
                                <div className="pdf_formFISHitem">
                                    <label htmlFor="name">Ismi</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Ismi"
                                        className="pdf_inputFISH"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="pdf_formFISHitem">
                                    <label htmlFor="surname">Familyasi</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Familyasi"
                                        className="pdf_inputFISH"
                                        required
                                        value={formData.surname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="pdf_formFISH">
                                <div className="pdf_formFISHitem">
                                    <label htmlFor="courseName">Darajasi</label>
                                    <div className="RusEng">
                                        <select
                                            name="courseName"
                                            className="pdf_inputFISHCat"
                                            onChange={handleChange}
                                            value={formData.courseName}
                                        >
                                            <option value="">Kategoriya tanglang!</option>
                                            <option value="foundation">Foundation</option>
                                            <option value="css">CSS</option>
                                            <option value="javascript">JAVASCRIPT</option>
                                            <option value="react">REACTJS</option>
                                            <option value="nodejs">NODEJS</option>
                                            <option value="eng">Eng kids</option>
                                            <option value="level">Eng adult</option>
                                            <option value="rus">Rus tili</option>
                                        </select>
                                        {(formData.courseName === "rus" || formData.courseName === "eng" || formData.courseName === "level") && (
                                            <select
                                                name="catigory"
                                                className={`pdf_inputFISH${formData.courseName.charAt(0).toUpperCase() + formData.courseName.slice(1)}Cat`}
                                                onChange={handleChange}
                                                value={formData.catigory}
                                            >
                                                <option value="">Kategoriyani tanglang</option>
                                                <option value="1">{formData.courseName === "rus" ? "1-month" : formData.courseName === "eng" ? "Kids 1rd level" : "1st level"}</option>
                                                <option value="2">{formData.courseName === "rus" ? "2-month" : formData.courseName === "eng" ? "Kids 2rd level" : "2nd level"}</option>
                                                <option value="3">{formData.courseName === "rus" ? "3-month" : formData.courseName === "eng" ? "Kids 3rd level" : "3rd level"}</option>
                                                <option value="4">{formData.courseName === "rus" ? "4-month" : formData.courseName === "eng" ? "Kids 4rd level" : "4th level"}</option>
                                                {formData.courseName === "eng" && <option value="5">Kids 5rd level</option>}
                                                {formData.courseName === "level" && <option value="5">5th level</option>}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="pdf_formFISHitem">
                                    <label htmlFor="selectedFromDate">Berilgan sanasi</label>
                                    <input
                                        className="pdf_inputFISH"
                                        type="date"
                                        name="selectedFromDate"
                                        value={formData.selectedFromDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="pdf_formFISH">
                                <div className="pdf_formFISHitem">

                                    <Select
                                        showSearch
                                        className="pdf_inputFISH"
                                        placeholder="Ustozni tanlang"
                                        optionFilterProp="children"
                                        onChange={(value, option) => {
                                            setTeacherFullName(value); // Ustozning ismi va familiyasini saqlash
                                        }}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')?.toLowerCase().includes(input?.toLowerCase())
                                        }
                                        style={{ width: '100%' }}
                                    >
                                        {filteredData?.map((teacher) => (
                                            <Option
                                                key={teacher._id}
                                                value={`${teacher.firstName} ${teacher.lastName}`}
                                                label={`${teacher.subject}: ${teacher.firstName} ${teacher.lastName}`}
                                            >
                                                {`${capitalizeFirstLetter(teacher.subject)}: ${capitalizeFirstLetter(teacher.firstName)} ${teacher.lastName}`}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="pdf_formFISHitem">
                                    <button type="button" className="pdf_viewBtn" onClick={() => setShow(false)}>
                                        Sertifikatni ko'rish
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="pdf_page">
                    {CertificateComponent && renderCertificate(CertificateComponent, false)}
                    <div className="pdf_controllersWrapper">
                        <ReactToPrint
                            trigger={() => (
                                <button onClick={handlePrint} disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <FiLoader style={{ marginRight: '5px' }} className="spin" />
                                        </>
                                    ) : (
                                        <>
                                            <FiUploadCloud style={{ marginRight: '5px' }} />
                                        </>
                                    )}
                                </button>
                            )}
                            content={() => componentRef.current}
                        />
                        <button onClick={() => setShow(true)}>
                            <FiArrowLeft style={{ marginRight: '5px' }} />
                        </button>
                    </div>
                    <div style={{ display: "none" }}>
                        {CertificateComponent && renderCertificate(CertificateComponent, true)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Print;










// import React, { useRef, useState } from 'react';
// import html2canvas from 'html2canvas';
// import './style.css';
// import { jsPDF } from 'jspdf';
// import { message } from 'antd';
// import ReactToPrint from 'react-to-print';
// import axios from '../../../api';
// import { FiAlertCircle } from 'react-icons/fi';
// import ReactJsCertificat from "../certificatesLists/reactJs/ReactJs";
// import NodejsCertificat from "../certificatesLists/nodeJs/nodejsCertificat";
// import JavaScriptCertificat from "../certificatesLists/javaScript/JavaScript";
// import CssCertificat from "../certificatesLists/css/cssCertificat";
// import RusTiliCertificat from "../certificatesLists/rus/RusTili";
// import LevelKids from "../certificatesLists/engKids/LevelKids";
// import Level from "../certificatesLists/engLevel/Level";
// import Foundation from "../certificatesLists/foundation/Foundation";

// const certificateComponents = {
//     react: ReactJsCertificat,
//     nodejs: NodejsCertificat,
//     javascript: JavaScriptCertificat,
//     css: CssCertificat,
//     eng: LevelKids,
//     level: Level,
//     rus: RusTiliCertificat,
//     foundation: Foundation,
// };

// const Print = () => {
//     const componentRef = useRef(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [show, setShow] = useState(true);
//     const [formData, setFormData] = useState({
//         name: "",
//         surname: "",
//         courseName: "",
//         catigory: "",
//         selectedFromDate: "",
//         teacherName: "",
//         directorFullName: "",
//         uniqueId: "",
//         EduName: "",
//         URL: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handlePrint = async () => {
//         setIsLoading(true);
//         try {
//             const input = componentRef.current;
//             const canvas = await html2canvas(input);
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('landscape');
//             pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
//             const pdfOutput = pdf.output('blob');

//             const formDataToSend = new FormData();
//             formDataToSend.append('file', pdfOutput, `${formData.name}_${formData.surname}.pdf`);
//             formDataToSend.append('fullName', `${formData.name} ${formData.surname}`);
//             formDataToSend.append('date', formData.selectedFromDate);
//             formDataToSend.append('teacherFullName', formData.teacherName);
//             formDataToSend.append('directorFullName', formData.directorFullName);
//             formDataToSend.append('level', formData.courseName);

//             const response = await axios.post('/api/bot/upload', formDataToSend);

//             if (response.status === 200) {
//                 message.success('PDF muvaffaqiyatli yuborildi!');
//             } else {
//                 throw new Error('Serverga yuborishda xatolik yuz berdi!');
//             }
//         } catch (error) {
//             message.warning(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const renderCertificate = (Component, isForPrint) => (
//         <Component
//             ref={isForPrint ? componentRef : null}
//             obj={{ ...formData, pdf_class: "pdf_mainContainer" }}
//         />
//     );

//     const CertificateComponent = certificateComponents[formData.courseName];

//     return (
//         <div>
//             {show ? (
//                 <div className="pdf_formMain">
//                     <h1 className="pdf_formMainTitle">SERTIFIKAT</h1>
//                     <p className="pdf_formMainDesc">
//                         <FiAlertCircle className="iconsM" />
//                         SERTIFIKAT yaratish uchun quyidagi ma'lumotlarni kiritish zarur! Sertifikatni ko'rish tugmasi orqali SERTIFIKAT ni namunasini ko'rasiz.
//                     </p>
//                     <div className="pdf_formContainer">
//                         <form className="pdf_form">
//                             <div className="pdf_formFISH">
//                                 <div className="pdf_formFISHitem">
//                                     <label htmlFor="name">Ismi</label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder="Ismi"
//                                         className="pdf_inputFISH"
//                                         required
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="pdf_formFISHitem">
//                                     <label htmlFor="surname">Familyasi</label>
//                                     <input
//                                         type="text"
//                                         name="surname"
//                                         placeholder="Familyasi"
//                                         className="pdf_inputFISH"
//                                         required
//                                         value={formData.surname}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="pdf_formFISH">
//                                 <div className="pdf_formFISHitem">
//                                     <label htmlFor="courseName">Darajasi</label>
//                                     <div className="RusEng">
//                                         <select
//                                             name="courseName"
//                                             className="pdf_inputFISHCat"
//                                             onChange={handleChange}
//                                             value={formData.courseName}
//                                         >
//                                             <option value="">Kategoriya tanglang!</option>
//                                             <option value="foundation">Foundation</option>
//                                             <option value="css">CSS</option>
//                                             <option value="javascript">JAVASCRIPT</option>
//                                             <option value="react">REACTJS</option>
//                                             <option value="nodejs">NODEJS</option>
//                                             <option value="eng">Eng kids</option>
//                                             <option value="level">Eng adult</option>
//                                             <option value="rus">Rus tili</option>
//                                         </select>
//                                         {(formData.courseName === "rus" || formData.courseName === "eng" || formData.courseName === "level") && (
//                                             <select
//                                                 name="catigory"
//                                                 className={`pdf_inputFISH${formData.courseName.charAt(0).toUpperCase() + formData.courseName.slice(1)}Cat`}
//                                                 onChange={handleChange}
//                                                 value={formData.catigory}
//                                             >
//                                                 <option value="">Kategoriyani tanglang</option>
//                                                 <option value="1">{formData.courseName === "rus" ? "1-month" : formData.courseName === "eng" ? "Kids 1rd level" : "1st level"}</option>
//                                                 <option value="2">{formData.courseName === "rus" ? "2-month" : formData.courseName === "eng" ? "Kids 2rd level" : "2nd level"}</option>
//                                                 <option value="3">{formData.courseName === "rus" ? "3-month" : formData.courseName === "eng" ? "Kids 3rd level" : "3rd level"}</option>
//                                                 <option value="4">{formData.courseName === "rus" ? "4-month" : formData.courseName === "eng" ? "Kids 4rd level" : "4th level"}</option>
//                                                 {formData.courseName === "eng" && <option value="5">Kids 5rd level</option>}
//                                                 {formData.courseName === "level" && <option value="5">5th level</option>}
//                                             </select>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="pdf_formFISHitem">
//                                     <label htmlFor="selectedFromDate">Berilgan sanasi</label>
//                                     <input
//                                         className="pdf_inputFISH"
//                                         type="date"
//                                         name="selectedFromDate"
//                                         value={formData.selectedFromDate}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="pdf_formFISH">
//                                 <div className="pdf_formFISHitem">
//                                     <input
//                                         type="text"
//                                         name="teacherName"
//                                         placeholder="Teacher name"
//                                         className="pdf_inputFISH"
//                                         required
//                                         value={formData.teacherName}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="pdf_formFISHitem">
//                                     <button type="button" className="pdf_viewBtn" onClick={() => setShow(false)}>
//                                         Sertifikatni ko'rish
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="pdf_page">
//                     {CertificateComponent && renderCertificate(CertificateComponent, false)}
//                     <div className="pdf_controllersWrapper">
//                         <ReactToPrint
//                             trigger={() => (
//                                 <button onClick={handlePrint} disabled={isLoading}>
//                                     {isLoading ? 'Yuklanmoqda...' : 'Upload and Send Certificate'}
//                                 </button>
//                             )}
//                             content={() => componentRef.current}
//                         />
//                     </div>
//                     <div style={{ display: "none" }}>
//                         {CertificateComponent && renderCertificate(CertificateComponent, true)}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Print;