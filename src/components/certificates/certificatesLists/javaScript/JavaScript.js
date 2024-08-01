import React, { useState } from "react";
import './style.css'
import Logo from '../../../assets/mainLogo.png'
import QRCode from "react-qr-code";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

const JavaScriptCertificat = React.forwardRef((props, ref) => {


  const {
    name,
    surname,
    id,
    idD,
    director,
    URL,
    uniqueId,
    pdf_class,
    givenDate,
  } = props.obj;
  return (
    <div
      className={pdf_class}

      ref={ref}
    >
      <div className="Js_Container">

        <>
          <div className="Jsbox-1"></div>
          <div className="Jsbox-2"></div>
          <div className="Jsbox-3"></div>
          <div className="Jsbox-4"></div>
          <div className="boxTopJs-5">
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

        </>

        <div className="certificat_BoxJs">
          <h1 className="Title_Js">Certificate</h1>
          <h3 className="NoIdjs">№: {uniqueId}</h3>
          <h3 className="Nogiven">Ushbu sertifikat</h3>
          <h1 className="NameJs">{surname}<br />{name}</h1>
          <p className="textjs">"Web dasturlash: JavaScript kursini <br /> muvaffaqiyatli tamomlagani uchun <br /> berildi.</p>
          <div className="JsFooter">

            <div className="signatureBoxJs">
              <h4>Director</h4>
              <p>{director === "" ? "" : director}</p>
            </div>

            <div className="QRCodejs">
              <QRCode
                value={`${URL}/check/${uniqueId}`}
              />
            </div>
            <div className="stampjs">
              Stamp
            </div>
          </div>


        </div>


        <>
          <div className="JsboxBottom-1"></div>
          <div className="JsboxBottom-2"></div>
          <div className="JsboxBottom-3"></div>
          <div className="JsboxBottom-4"></div>
          <div className="JsboxBottom-5"></div>
          <div className="boxBottomJs-5">
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
        </>
      </div>
    </div>
  );
});

export default JavaScriptCertificat;
