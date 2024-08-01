// import React, { useRef } from 'react';
// import ReactToPrint from 'react-to-print';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ComponentToPrint = React.forwardRef((props, ref) => (
//     <div ref={ref} style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '10px', width: '800px', margin: '0 auto' }}>
//         <h1 style={{ color: '#4A90E2' }}>Certificate of Achievement</h1>
//         <p>This is to certify that</p>
//         <h2 style={{ margin: '20px 0' }}>Azimjon Mamutaliev</h2>
//         <p>has successfully completed the course</p>
//         <h3 style={{ margin: '20px 0' }}>React and Node.js Development</h3>
//         <p style={{ marginTop: '40px' }}>Date: 30th July 2024</p>
//     </div>
// ));

// const Print = () => {
//     const componentRef = useRef();

//     const handlePrint = () => {
//         const input = componentRef.current;
//         html2canvas(input).then(canvas => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('landscape');
//             pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
//             const pdfOutput = pdf.output('blob');
//             saveAs(pdfOutput, 'certificate.pdf');

//             // Yuborish uchun backend endpointiga POST so'rov jo'natish
//             const formData = new FormData();
//             formData.append('file', pdfOutput, 'certificate.pdf');
//             fetch('http://localhost:5000/upload', {
//                 method: 'POST',
//                 body: formData,
//             }).then(response => {
//                 if (response.ok) {
//                     alert('PDF muvaffaqiyatli yuborildi!');
//                 } else {
//                     alert('Xatolik yuz berdi!');
//                 }
//             });
//         });
//     };

//     return (
//         <div>
//             <ReactToPrint
//                 trigger={() => <button>Print this!</button>}
//                 content={() => componentRef.current}
//                 onAfterPrint={handlePrint}
//             />
//             <ComponentToPrint ref={componentRef} />
//         </div>
//     );
// };

// export default Print;

// src/App.js
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useUploadPdfMutation } from '../../../context/apiSlice';
import ReactToPrint from 'react-to-print';

const Print = () => {
    const componentRef = useRef(null);
    const [uploadPdf, { isLoading, isError }] = useUploadPdfMutation();
    const [fullName, setFullName] = useState("")

    const handlePrint = async () => {
        const input = componentRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        const pdfOutput = pdf.output('blob');

        const formData = new FormData();
        formData.append('file', pdfOutput, 'certificate.pdf');

        try {
            await uploadPdf(formData).unwrap();
            alert('PDF muvaffaqiyatli yuborildi!');
        } catch (error) {
            alert('Xatolik yuz berdi!');
        }
    };

    return (
        <div>
            <div ref={componentRef} style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '10px', width: '800px', margin: '0 auto' }}>
                <h1 style={{ color: '#4A90E2' }}>Certificate of Achievement</h1>
                <p>This is to certify that</p>
                <h2 style={{ margin: '20px 0' }}>{fullName}</h2>
                <p>has successfully completed the course</p>
                <h3 style={{ margin: '20px 0' }}>React and Node.js Development</h3>
                <p style={{ marginTop: '40px' }}>Date: 30th July 2024</p>
            </div>

            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" name="" id="" />
            <ReactToPrint
                trigger={() => <button onClick={handlePrint} disabled={isLoading}>
                    {isLoading ? 'Yuklanmoqda...' : 'Upload and Send Certificate'}
                </button>}
                content={() => componentRef.current}
                onAfterPrint={handlePrint}
            />
            {isError && <p>Xatolik yuz berdi!</p>}
        </div>
    );
};

export default Print;
