import React, { useState, useContext, useEffect } from "react";
import './style.css';
import img from '../../../assets/mainLogo.png';
import QRCode from "react-qr-code";

const LevelKids = React.forwardRef((props, ref) => {


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
        catigory
    } = props.obj;
    return (
        <div
            className={pdf_class}
            ref={ref}
        >

            <div className="containerLev">
                <div className="rama1">
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </div>
                <div className="rama2">
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </div>

                <div className="line"></div>

                <div className="poa" style={{ position: "absolute" }}>
                    <div className="TextLev">

                        <span style={{ textAlign: "center" }}>
                            <h1 className='TitleLev'>CERTIFICATE</h1>
                            <i id="i">OF EXELLENCE</i>
                            <h3 className="engID">№:{uniqueId}</h3>

                            <p>This certificate is proudly awarded to</p>
                        </span>
                        <div className="LevBox">
                            <h1>{name} {surname}</h1>
                            <div className="lineLev">
                                <i>for successfully completing  <b> KIDS {catigory}rd level </b> of <br /> english  course at "ALGORITM TA'LIM"</i>
                            </div>
                        </div>
                        <div className="boxEngLevQr">

                            <div className="QRCodeEnLev">
                                <QRCode
                                    value={`${URL}/check/${uniqueId}`}
                                />
                            </div>

                            <div className="line2Lev">
                                <b>Director</b>
                                <p className="p6Lev">Sh.Usmanov</p>
                            </div>

                        </div>


                        <img src={img} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
})

export default LevelKids