import React from "react";
import './style.css'
import logo from '../../../assets/mainLogo.png';
import QRCode from "react-qr-code";

const RusTiliCertificat = React.forwardRef((props, ref) => {

  const {
    name,
    surname,
    idD,
    id,
    pdf_class,
    courseName,
    catigory,
    director,
    givenDate,
    URL
  } = props.obj;
  return (


    <div
      className={pdf_class}
      ref={ref}
    >
      <div className="certificat_ContainerRus">
        <div className="decoration">
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru"></div>
          <div className="boxru1"></div>
          <div className="boxru2"></div>
          <img className="ruLOG" src={logo} alt="" />

        </div>
        <div className="texts">

          <h1 className="serRu">ПОХВАЛЬНЫЙ <br /> ЛИСТ</h1>
          <h3 className="engID">№: {uniqueId}</h3>

          <p>Выдан:</p>


          <div className="contentru">
            <h1>{name} {surname}</h1>
          </div>
          <p className="titleru">За активное посещение занятий и достижение уроке русского <br /> языка в течение {catigory}-х месяцев  в учебном центре<br /> "{`${EduName}`}"</p>
          <div className="boxEngQr">
            <div className="line2">
              <b>Director</b>
              <p className="p6">{director === "" ? "" : director}</p>
            </div>
            <div className="QRCoderu">
              <QRCode
                value={`${URL}/check/${uniqueId}`}
              />
            </div>

          </div>





        </div>
      </div>
    </div>


  )
})

export default RusTiliCertificat;
