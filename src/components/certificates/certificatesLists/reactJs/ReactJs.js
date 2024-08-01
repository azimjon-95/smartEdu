import React, { useEffect, useState } from "react";
import './style.css'
import Logo from '../../../assets/mainLogo.png';
import Logoreact from './logo512.png'
import Logoreact1 from './logo512.png'
import Logoreact2 from './logo512.png'
import QRCode from "react-qr-code";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import axios from "../../../api/api";

const ReactJsCertificat = React.forwardRef((props, ref) => {

  const [reactId, setreactID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/certificate/checkaddindex/react`);
        setreactID(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const {
    name,
    surname,
    teacherName,
    idD,
    id,
    pdf_class,
    givenDate,
    URL,
    director,
    EduName
  } = props.obj;

  return (


    <div
      className={pdf_class}
      ref={ref}
    >
      <div className="React_Container">
        <>
          <div className="Reactbox-1"></div>
          <div className="Reactbox-2"></div>
          <div className="Reactbox-3"></div>
          <div className="Reactbox-4"></div>
          <div className="Reactbox-5"></div>
          <div className="Reactbox-4_text">
            React: "{`${EduName}`}" is a private
            education institution. This certificate is
            valid and certifies that the following
            student has fully completed the 9-month
            Web Programming training course.
          </div>
        </>

        <div className="certificat_BoxReact">
          <h1 className="Title_React">Certificate <br /> of completion</h1>
          <h3 className="ReId">ID:   {loading ? <span>Data is coming ...</span> : (id ? id : reactId)}</h3>
          <h3 className="Regiven">is given to</h3>
          <h1 className="NameRe">{surname} <br /> {name}</h1>
          <p className="textRe">for successfully completing the "Web programming" <br /> course
          </p>
          <p className="listnode">He/she can work professionally with Web-develpment <br /> strategies. Functional Frontend: Html, Css,<br />  JavaScript, React.Js
          </p>
          <div className="reFooter">
            <div className="signatRe">
              <div className="signatureReact-1">
                <h4>Director</h4>
                <p>{director === "" ? "" : director}</p>
              </div>

              <div className="signatureReact-2">
                <h4>Software Engineer</h4>
                <p>{teacherName}</p>
              </div>
            </div>

            <div className="QRCode">
              <QRCode
                value={`${URL}/check/${id ? id : reactId}`}
              />
            </div>
            <div className="stamp">
              Stamp
            </div>
          </div>


        </div>


        <>
          <div className="ReactboxBottom-1"></div>
          <div className="ReactboxBottom-2"></div>
          <div className="ReactboxBottom-3"></div>
          <div className="ReactboxBottom-4"></div>
          <div className="ReactboxBottom-5"></div>
          <div className="ReactboxBottom-6"></div>


          <>
            <img className="LogoNode" src={Logo} alt="" />
            <img className="LogoLogo" src={Logoreact} alt="" />
            <img className="LogoLogo1" src={Logoreact1} alt="" />
            <img className="LogoLogo2" src={Logoreact2} alt="" />
          </>

        </>
      </div >
    </div >
  );
});

export default ReactJsCertificat;
