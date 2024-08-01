import React, { useState, useEffect, useContext } from "react";
import './style.css'
import Logo from '../../../assets/mainLogo.png';
import QRCode from "react-qr-code";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";


const CssCertificat = React.forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);


  const [zoom, setZoom] = useState(0.5);

  setTimeout(() => {
    setLoading(i => !i)
  }, 2000)

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
      ref={ref}
    >
      <div className="certificat_Container">
        <>
          <div className="box-1"></div>
          <div className="box-2">
            <div className="box-2_1"></div>
          </div>
          <div className="box-3"></div>
          <div className="box-4">
            <div className="box-4_1"></div>
          </div>
        </>
        <div className="certificat_Box">
          <h1 className="Title_cert">Sertifikat</h1>
          <div className="Nocss">№: {loading ? <span>Data is coming ...</span> : (uniqueId)}
            {/* {
                uniqueId ? <>{id ? id : uniqueId}</> :
                  <div className="Loadin">
                    <h3 className="Load">Loading</h3>
                    <h1 className="Load_1">.</h1>
                    <h1 className="Load_2">.</h1>
                    <h1 className="Load_3">.</h1>
                  </div>

              } */}
          </div>
          <b className="lastText">Ushbu sertifikat</b>
          <h1 className="NameCss">{surname}<br />{name}</h1>
          <p className="textcss">"Web dasturlash, HTML / CSS" kursini muvaffaqiyatli tamomlagani uchun berildi.</p>

          <div className="cssFooter">
            <div className="signatureBoxcss">
              <h4>Director</h4>
              <p>{director === "" ? "" : director}</p>
            </div>

            <div className="QRCode">
              <QRCode
                value={`${URL}/check/${(uniqueId)}`}
              />
            </div>
            <div className="stamp">
              Stamp
            </div>
          </div>
        </div>
        <>
          <div className="boxBottom-1"></div>
          <div className="boxBottom-2"></div>
          <div className="boxBottom-2_1"></div>
          <div className="boxBottom-3"></div>
          <div className="boxBottom-4"></div>
          <div className="boxBottom-4_1"></div>
          <div className="boxBottom-4_2"></div>
        </>
        <>
          <img className="Logo" src={Logo} alt="" />
        </>
        <>
          <div className="boxleft-1_box">
            <div className="boxleft-1"></div>
          </div>
          <div className="boxleft-1_box2">
            <div className="boxleft-1_2"></div>
          </div>

        </>
        <>
          <div className="boxRight-1_box">
            <div className="boxRight-1"></div>
          </div>
          <div className="boxRight-1_box3">
            <div className="boxRight-1_box2"></div>
          </div>
        </>
      </div>
    </div>
  );
});

export default CssCertificat;
