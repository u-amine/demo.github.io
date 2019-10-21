import React, { useState } from 'react';
import styled from 'styled-components';

import { Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';

const KeyFigureTitle = styled.p`
  margin-top: 5%;
  margin-bottom: 2%;
`;

const StyledButton = styled.a`
  background-color: ${props => props.white ? "" : props.theme.mainColor}};
  color: ${props => props.white ? props.theme.mainColor : "#fff" }};
  margin-top: 3%;
  margin-left: ${props => props.white ? "3%" : "0%"};
  :hover {
    background-color: ${props => props.theme.mainColorLight};
    color: #fff;
  };
  :focus {
    outline: 0;
    color: #fff;
  }
`;

const StyledRadio = styled.div`
  margin-top: 30px;
  margin-left: ${props => props.white ? "3%" : "0%"};
`

const StyledTitle = styled.p`
  font-size: ${props => props.theme.title.font};
  font-weight: ${props => props.theme.title.weight};
`;

const StyledSubTitle = styled.div`
  color: ${props => props.theme.greyColor};
  font-size: 15px;
  margin-top: 2%;
`;
const DeleteButton = styled.button`
  z-index: 10
`;


const Invoice = (props) => {
  const [showPdf, displayPdf] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setnumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setnumPages(numPages);
  }
  // remove .pdf from the name
  const title = props.title.split('.');
  title.pop();
  return (
    <KeyFigureTitle className="box animated fadeIn">
      <StyledTitle>
        {title.join('.')}
      </StyledTitle>
      <StyledSubTitle>
        {props.id}
      </StyledSubTitle>
      {
        showPdf ? (
          <div className="columns is-centered">
            <div className="column is-8 animated fadeIn">
              <DeleteButton className="delete is-pulled-right" onClick={() => displayPdf(!showPdf)}></DeleteButton>
              <Document
                          file={`http://localhost:9000/download?file=${props.title}`}
                          onLoadSuccess={onDocumentLoadSuccess}
                          loading={"Loading document"}
                          >
                          <Page pageNumber={pageNumber} />
                      </Document>
                      <div className="is-pulled-right">
                        <p>Page {pageNumber} of {numPages}</p>
                        <button className="button pagination-previous" onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>{'<'}</button>
                        <button className="button pagination-next" onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numPages}>{'>'}</button>
                      </div>
            </div>
          </div>
        ) : null
      }
      <div className="columns">
        <div className="column is-9">
          <StyledButton className="button" href={`http://localhost:9000/download?file=${props.title}`}>DOWNLOAD INVOICE</StyledButton>
          <StyledButton className="button" white="gery" onClick={() => displayPdf(!showPdf)}>DETAILS</StyledButton>
        </div>
        <StyledRadio className="column is-3">
          <div className="field">
            <input className="is-checkradio" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="checked" disabled/>
            <label for="exampleCheckbox">SENT</label>
              <input className="is-checkradio" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="" disabled/>
              <label for="exampleCheckbox">PAID</label>
          </div>
        </StyledRadio>
      </div>
    </KeyFigureTitle>
  )
}

export default Invoice;
