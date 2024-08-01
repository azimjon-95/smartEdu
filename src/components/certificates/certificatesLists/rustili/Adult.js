import React, { useState, useContext } from "react";
import './style.css'
import QRCode from "react-qr-code";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

const AdultCertificatRus = React.forwardRef((props, ref) => {

    const [rusId, setRusID] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/certificate/checkaddindex/rus`);
                setRusID(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const [zoom, setZoom] = useState(0.44);
    const {
        name,
        surname,
        catigory,
        idD,
        id,
        pdf_class,
        givenDate,
        URL,
        director,
        EduName
    } = props.obj;
    console.log(uniqueId)

    return (
        <div
            className={pdf_class}
            ref={ref}
        >
            <div class="containerRuAD">
                <div class="contentRuAD">
                    <img src="./img/bg (2).png" alt="" />
                    <div class="textRuAD">
                        <span>
                            <br />
                            <h1>Сертификат</h1>
                            <h4 className="IdAD">№:  {loading ? <span>Data is coming ...</span> : (id ? id : rusId)}</h4>
                            <h3>Выдан</h3>
                        </span>
                        <span className="bjD">
                            <div className="nameAD">
                                <h2>{name} {surname}</h2>
                            </div>
                            <p>За окончания программы русского языка в учебном центре <br />
                                {`${EduName}`}
                            </p>
                        </span>

                        <div className="boxADRU">

                            <div className="QRCodeEn">
                                <QRCode
                                    value={`${URL}/check/${id ? id : rusId}`}
                                />
                            </div>
                            <div className="lineAD">
                                <b>Director</b>
                                <p className="p6">{director === "" ? "" : director}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="boxes">
                    <div class="face1">
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                    </div>
                    <div class="face2">
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                        <div class="boxAD"></div>
                    </div>
                </div>

                <div class="ark1"></div>
                <div class="ark2"></div>

                <span class="podpis">
                    <p>Директор: Ш.Усманов</p> <input type="text" />
                </span>
            </div>
        </div>
    );
});

export default AdultCertificatRus;
