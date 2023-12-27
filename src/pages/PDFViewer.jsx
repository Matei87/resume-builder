import React, { useEffect, useState, useCallback } from 'react';
import { pdfjs, Document, Page, Outline } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;

const PDFViewer = ({ children }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);

  const onDocumentLoadSuccess = useCallback((document) => {
    const { numPages: nextNumPages } = document;
    setNumPages(nextNumPages);
    setPageNumber(1);
  }, []);

  const onItemClick = useCallback(
    ({ pageNumber: nextPageNumber }) => setPageNumber(nextPageNumber),
    []
  );

  const changePage = useCallback(
    (offset) =>
      setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset),
    []
  );

  const previousPage = useCallback(() => changePage(-1), [changePage]);

  const nextPage = useCallback(() => changePage(1), [changePage]);

  useEffect(() => {
    const child = React.Children.only(children);

    pdf(child)
      .toBlob()
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      });
  }, [children]);

  return (
    <Document
      file={pdfUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      onItemClick={onItemClick}
      className='document'
    >
      <Outline className='custom-classname-outline' onItemClick={onItemClick} />
      <Page renderMode='svg' pageNumber={pageNumber} />
      <div className='Test__container__content__controls'>
        <button disabled={pageNumber <= 1} onClick={previousPage} type='button'>
          &lsaquo;
        </button>
        &nbsp;
        <span className='pages'>
          {`Page ${pageNumber || (numPages ? 1 : '--')} / ${numPages || '--'}`}
        </span>
        &nbsp;
        <button
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          type='button'
        >
          &rsaquo;
        </button>
      </div>
    </Document>
  );
};

export default PDFViewer;
