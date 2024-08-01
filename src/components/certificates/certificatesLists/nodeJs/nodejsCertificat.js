import React, { useContext, useEffect, useState } from "react";
import './style.css'
import Logo from '../../../assets/mainLogo.png';
import QRCode from "react-qr-code";


const NodejsCertificat = React.forwardRef((props, ref) => {

  const {
    name,
    surname,
    id,
    idD,
    pdf_class,
    givenDate,
    director,
    URL,
    uniqueId,
    EduName, teacherName
  } = props.obj;
  return (

    <div
      className={pdf_class}
      ref={ref}
    >
      <div className="Node_Container">
        <>
          <div className="Nodebox-1"></div>
          <div className="Nodebox-2"></div>
          <div className="Nodebox-2_1"></div>
          <div className="Nodebox-3"></div>
          <div className="Nodebox-4"></div>
          <div className="Nodebox-4_1"></div>
          <div className="Nodebox-4_2"></div>
          <div className="Nodebox-4_text">
            Node: "{`${EduName}`}" is a private
            education center. This certificate is
            valid and certifies that the following
            student has fully completed the 9-month
            Web Programming training course.
          </div>
        </>

        <div className="certificat_BoxNode">
          <h1 className="Title_Node">Certificate</h1>
          <h1 className="item_Node">of completion</h1>
          <h3 className="NoId">№: {uniqueId}</h3>
          <h3 className="Nogiven">is given to</h3>
          <h1 className="Namenode">{surname} <br /> {name}</h1>
          <p className="textnode">for successfully completing the "Web programming: <br /> Front-end/Backend" course</p>
          <p className="listnode">He/she can work professionally with Web-development <br /> strategies.<br /> Functional Front-end: Html, Css, JavaScript, React.Js <br /> Functional Backend: Node.Js, Express.js, MongoDB, MySql
          </p>
          <div className="nodeFooter">
            <div className="signat">
              <div className="signatureBoxNo">
                <h4>Director</h4>
                <p>{director === "" ? "" : director}</p>
              </div>

              <div className="signatureBoxNo">
                <h4>Software Engineer</h4>
                <p>{teacherName}</p>
              </div>
            </div>

            <div className="QRCode">
              <QRCode
                value={`${URL}/check/${uniqueId}`}
              />
            </div>
            <div className="stamp">
              Stamp
            </div>
          </div>



        </div>


        <>
          <div className="boxBottomNode-1"></div>
          <div className="boxBottomNode-2"></div>
          <div className="boxBottomNode-2_1"></div>
          <div className="boxBottomNode-3"></div>
          <div className="boxBottomNode-4"></div>
          <div className="boxBottomNode-4_1"></div>
          <div className="boxBottomNode-4_2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <>
            <img className="LogoNode" src={Logo} alt="" />
          </>

          <div className="boxBottomNode-5"></div>
          <div className="boxBottomNode-6"></div>
        </>
      </div>
    </div>

  );
});

export default NodejsCertificat;
