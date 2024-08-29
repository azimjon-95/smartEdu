import React from "react";
import './style.css';
import Iconca from '../../../../assets/order.png';
import alg from '../../../../assets/mainLogo.png';
import QRCode from "react-qr-code";


const Foundation = React.forwardRef((props, ref) => {


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
        EduName
    } = props.obj;
    return (
        <div
            className={pdf_class}

            ref={ref}
        >
            <div className='Container_Foun'>
                <div className='Container_Box'>
                    <h1>CERTIFICATE</h1>
                    <h3>OF APRECIATION</h3>
                    <h4>ID: {uniqueId}</h4>
                    <div className='founText'>This certificate proudly present:</div>

                    <div className="Foun_NameBox">
                        <h1>{surname} {name}</h1>
                    </div>
                    <p>For successfully completing the course <br />Foundations of Functional Programming in {`${EduName}`}</p>
                    <div className="QrFoun">
                        <div className="QRCodeFoun">
                            <QRCode
                                value={`${URL}/check/${uniqueId}`}
                            />
                        </div>
                    </div>

                    <b>Director {director === "" ? "" : director} _____________</b>
                </div>
                <div className="Foun_1"></div>
                <div className="Foun_2"></div>
                <div className="Foun_3"></div>
                <div className="Foun_4"></div>
                <div className="Foun_5"></div>
                <div className="Foun_6"></div>
                <img className='Iconca' src={Iconca} alt="" />
                <img className='alg' src={alg} alt="" />
            </div>
        </div>
    );
});

export default Foundation;
