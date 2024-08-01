import React, { useContext, useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import axios from '../../api/api';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiDownload, FiChevronLeft, FiAlertCircle } from 'react-icons/fi'
import ReactJsCertificat from "../certificatesLists/reactJs/ReactJs";
import NodejsCertificat from "../certificatesLists/nodeJs/nodejsCertificat";
import JavaScriptCertificat from "../certificatesLists/javaScript/JavaScript";
import CssCertificat from "../certificatesLists/css/cssCertificat";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import RusTiliCertificat from "../certificatesLists/rus/RusTili";
import AdultCertificat from "../certificatesLists/english/Adult";
import Level from "../certificatesLists/engLevel/Level";
import LevelKids from "../certificatesLists/engKids/LevelKids";
import Foundation from "../certificatesLists/foundation/Foundation";


const ItPdf = () => {

  const { setIsLoading, setSensor } = useContext(AuthContext)
  const navigate = useNavigate();
  const componentRef = useRef();
  const [newCertificate, setNewCertificate] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [surname, setsurName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [catigory, setCatigory] = useState("");



  const view = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSensor(true)
    }, 1000);
    if (name === "" || surname === "" || teacherName === "" || courseName === "" || selectedFromDate === "") {
      toast.warn("Bo'sh joylarni to'ldiring!", {
        position: toast.POSITION.TOP_RIGHT
      });

    } else {
      setShow((prev) => !prev);
    }
    console.log(selectedFromDate)
  };

  const createCertificate = async () => {
    setNewCertificate(true);
    setIsLoading(true)

    await axios
      .post("certificate", {
        name: name,
        surname: surname,
        teachername: teacherName,
        courseName: courseName,
        givenDate: selectedFromDate,
        level: catigory
        // newArr: newArr
      })
      .then((res) => {
        navigate("/admin/historyPdf");
        console.log(res)
        setNewCertificate(null);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      }
      );
  };

  const FilterCertificate = () => {
    if (courseName === "nodejs") {
      return <NodejsCertificat obj={{
        name,
        surname,
        id,
        idD,
        director,
        URL,
        uniqueId,
        givenDate: selectedFromDate,
        pdf_class: "pdf_mainContainer",
      }} />
    } else if (courseName === "react") {
      return <ReactJsCertificat
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    }
    else if (courseName === "javascript") {
      return <JavaScriptCertificat
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    }
    else if (courseName === "css") {
      return <CssCertificat
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    } else if (courseName === "rus") {
      return < RusTiliCertificat
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    } else if (courseName === "eng") {
      // return < AdultCertificat
      return < LevelKids
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    }
    else if (courseName === "level") {
      return < Level
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          catigory,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    }
    else if (courseName === "foundation") {
      return < Foundation
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          catigory,
          givenDate: selectedFromDate,
          pdf_class: "pdf_mainContainer",
        }} />
    }
  }




  const PdfCertificate = () => {
    if (courseName === "nodejs") {
      return <NodejsCertificat ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
        }} />
    } else if (courseName === "react") {
      return <ReactJsCertificat ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
        }} />
    } else if (courseName === "javascript") {
      return <JavaScriptCertificat ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
        }} />
    } else if (courseName === "css") {
      return <CssCertificat
        ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          givenDate: selectedFromDate,
        }} />
    }
    else if (courseName === "eng") {
      // return <AdultCertificat
      return <LevelKids
        ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          catigory,
          givenDate: selectedFromDate,
        }} />
    }
    else if (courseName === "rus") {
      return <RusTiliCertificat
        ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          catigory,
          givenDate: selectedFromDate,
        }} />
    }
    else if (courseName === "level") {
      return <Level
        ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          catigory,
          givenDate: selectedFromDate,
        }} />
    }
    else if (courseName === "foundation") {
      return <Foundation
        ref={componentRef}
        obj={{
          name,
          surname,
          id,
          idD,
          director,
          URL,
          uniqueId,
          catigory,
          givenDate: selectedFromDate,
        }} />
    }
  }

  return (
    <>
      <div style={show ? { display: "block" } : { display: "none" }}>
        <div className="pdf_formMain">
          <h1 className="pdf_formMainTitle">
            SERTIFIKAT
          </h1>
          <p className="pdf_formMainDesc">
            <FiAlertCircle className="iconsM" />
            SERTIFIKAT yaratish uchun quyidagi ma'lumotlarni kiritish zarur! Sertifikatni ko'rish tugmasi orqali SERTIFIKAT ni namunasini ko'rasiz.
          </p>
          <div className="pdf_formContainer">
            <form className="pdf_form" onSubmit={view}>

              <div className="pdf_formFISH">
                <div className="pdf_formFISHitem">
                  <label htmlFor="">Ismi</label>
                  <input
                    type="text"
                    placeholder="Ismi"
                    className="pdf_inputFISH"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="pdf_formFISHitem">
                  <label htmlFor="">Familyasi</label>
                  <input
                    type="text"
                    placeholder="Familyasi"
                    className="pdf_inputFISH"
                    required
                    value={surname}
                    onChange={(e) => setsurName(e.target.value)}
                  />
                </div>
              </div>

              <div className="pdf_formFISH">
                <div className="pdf_formFISHitem">

                  <label htmlFor="">Darajasi</label>
                  <div className="RusEng">
                    <select className="pdf_inputFISHCat" onChange={(e) => setCourseName(e.target.value)} name="" id="">
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
                    <select
                      onChange={(e) => setCatigory(e.target.value)}
                      className={`pdf_inputFISHRus 
                        ${courseName == "rus"
                          ? "rusopen"
                          : "pdf_inputFISHRus"
                        }`}
                      name="" id=""
                    >
                      <option value="">Kategoriyani tanglang</option>
                      <option value="1">1-month</option>
                      <option value="2">2-month</option>
                      <option value="3">3-month</option>
                      <option value="4">4-month</option>
                    </select>
                    <select
                      onChange={(e) => setCatigory(e.target.value)}
                      className={`pdf_inputFISHEng 
                      ${courseName == "eng"
                          ? "engopen"
                          : "pdf_inputFISHEng"
                        }`}
                      name="" id=""
                    >
                      <option value="">Kategoriyani tanglang</option>
                      <option value="1">Kids 1rd level</option>
                      <option value="2">Kids 2rd level</option>
                      <option value="3">Kids 3rd level</option>
                      <option value="4">Kids 4rd level</option>
                      <option value="5">Kids 5rd level</option>
                    </select>
                    <select
                      onChange={(e) => setCatigory(e.target.value)}
                      className={`pdf_inputFISHEngLev 
                      ${courseName == "level"
                          ? "levopen"
                          : "pdf_inputFISHEngLev"
                        }`}
                      name="" id=""
                    >
                      <option value="">Kategoriyani tanglang</option>
                      <option value="1">1st level</option>
                      <option value="2">2nd level</option>
                      <option value="3">3rd level</option>
                      <option value="4">4th level</option>
                      <option value="5">5th level</option>
                    </select>
                  </div>
                </div>
                <div className="pdf_formFISHitem">
                  <label htmlFor="">Berilgan sanasi</label>
                  <input className="pdf_inputFISH"
                    onChange={(e) => setSelectedFromDate(e.target.value)}
                    type="date"
                  />


                </div>
              </div>

              <div className="pdf_formFISH">
                <div className="pdf_formFISHitem">
                  <input
                    type="text"
                    placeholder="Teacher name"
                    className="pdf_inputFISH"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                  />
                </div>
                <div className="pdf_formFISHitem">

                  <input className="pdf_viewBtn" type="submit" value="Sertifikatni ko'rish" />
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

      <div
        style={!show ? { display: "block" } : { display: "none" }}
        className="pdf_page"
      >
        <FilterCertificate />



        <div className="pdf_controllersWrapper">
          <button className="pdf_controllers" onClick={view}> <FiChevronLeft /> Orqaga</button>
          <button className="pdf_controllers" onClick={createCertificate}> {newCertificate ? <Loading /> : <FiSave />} Setifikatni qayd etish</button>
          <ReactToPrint
            trigger={() => <button className="pdf_controllers"> <FiDownload /> Yuklab olish</button>}
            content={() => componentRef.current}
          />
        </div>

        <div style={{ display: "none" }}>
          <PdfCertificate />

        </div>
      </div>
    </>
  );
};
export default ItPdf;