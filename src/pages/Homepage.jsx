import React from 'react';
import PDFViewer from './PDFViewer';
import MyDocument from './MyDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';

// Create Document Component

const Homepage = () => {
  //   const pdfRef = useRef();

  //   const downloadPDF = async () => {
  //     const doc = new jsPDF('p', 'mm', 'a4');
  //     const data = await document.querySelector('#pdf');
  //     // doc.html(pdfRef.current, {
  //     //     doc.save('resume.pdf')

  //     // });
  //     doc.html(data).then((l) => {
  //       console.log(l);
  //       doc.save('resume.pdf');
  //     });

  //     console.log(123, data);
  //   };

  return (
    <div>
      <h1>react-pdf sample page</h1>
      <PDFDownloadLink
        document={<MyDocument />}
        fileName='resume.pdf'
        className='link'
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            'Loading document...'
          ) : (
            <button className='button'>Download</button>
          )
        }
      </PDFDownloadLink>

      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default Homepage;
