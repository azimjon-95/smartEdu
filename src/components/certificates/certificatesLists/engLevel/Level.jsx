import React from "react";
import './style.css';
import img from '../../../../assets/mainLogo.png';
import QRCode from "react-qr-code";

const Level = React.forwardRef((props, ref) => {

    const {
        name,
        surname,
        catigory,
        pdf_class,
        id,
        director,
        EduName, URL,
        uniqueId
    } = props.obj;

    let objResault = {
        1: "st",
        2: "nd",
        3: "rd",
        4: "th",
        5: "th",
    }


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
                            <i id="i">OF EXCELLENCE</i>
                            <h3 className="engID">№: {uniqueId}</h3>
                            {/* <h3 className="engID">№:  gsrdhtjyku</h3> */}

                            <p>This certificate is proudly awarded to</p>
                        </span>
                        <div className="LevBox">
                            <h1>{name} {surname}</h1>
                            <div className="lineLev">
                                <i>for successfully completing <b>{catigory}{catigory === "1" ? "st" : "" || catigory === "2" ? "nd" : "" || catigory === "3" ? "rd" : "" || catigory === "4" ? "th" : "" || catigory === "5" ? "th" : ""} level</b> of english <br /> course at "{`${EduName}`}"</i>
                                {/* <i>for successfully completing <b>{catigory}{catigory(objResault)} level</b> of english <br /> course at "ALGORITM TA'LIM"</i> */}
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
                                <p className="p6Lev">{director === "" ? "" : director}</p>
                            </div>

                        </div>


                        <img src={img} alt="" />
                    </div>
                </div>
            </div>

        </div>

    )
})

export default Level