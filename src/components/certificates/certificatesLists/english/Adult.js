import React, { useState } from "react";
import './style.css'
import logo from '../../../assets/mainLogo.png';
import QRCode from "react-qr-code";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";



const AdultCertificat = React.forwardRef((props, ref) => {

  const [zoom, setZoom] = useState(0.5);

  const {
    name,
    surname,
    id,
    idD,
    pdf_class,
    givenDate,
    director,
    URL,
    uniqueId
  } = props.obj;

  return (
    <div
      className={pdf_class}
      style={pdf_class && { transform: `scale(${zoom}) translate(-50%)` }}
      ref={ref}
    >
      <div className="certificat_ContainerEng">
        <div className="containerEng">
          <h1 className="cert">CERTIFICATE</h1>
          <p className="p1">OF ACHIEVEMENT</p>
          <h3 className="engID">№: {uniqueId}</h3>
          <p className="p2">This certificate is proundly presented to</p>
          <div className="line">
            <h3>{name} {surname}</h3>
          </div>

          <p className="p3">For active attendance in the lessons and achieving high resultin {catigory}-month</p>


          <div className="boxEngQr">

            <div className="QRCodeEn">
              <QRCode
                value={`${URL}/check/${uniqueId}`}
              />
            </div>

            <div className="line2">
              <b>Director</b>
              <p className="p6">{director === "" ? "" : director}</p>
            </div>

          </div>

        </div>
        <>
          <img className="engLOG" src={logo} alt="" />
          <div className="box1"></div>
          <div className="box2"></div>
          <div className="box3"></div>
          <div className="box4"></div>
          <div className="box5"></div>

          <div className="box6"></div>
          <div className="box7"></div>
          <div className="box8"></div>
          <div className="box9"></div>
          <div className="box10"></div>
          <div className="box11"></div>
          <div className="box12"></div>
          <div className="box13"></div>
          <div className="box14"></div>


          <div className="box15"></div>
          <div className="box16"></div>

          <div className="box17"></div>
          <div className="box18"></div>
        </>
      </div>

    </div>
  );
});

export default AdultCertificat;
