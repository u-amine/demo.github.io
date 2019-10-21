import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { pdfjs } from "react-pdf";
import styled from 'styled-components';

import Invoice from './Invoice';

import { errorServer, loadingMessage } from '../../constants/content.json';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const INVOICES_QUERY = gql`
  query {
    invoices
  }
`;

const KeyFigureTitle = styled.p`
  margin-top: 5%;
  margin-bottom: 2%;
`;

const Invoices = () => {
  const { data, error, loading } = useQuery(INVOICES_QUERY);
  let invoices = [];
  if (loading) {
    return <KeyFigureTitle className="box">{loadingMessage}</KeyFigureTitle>
  }
  if (error) {
    return <KeyFigureTitle className="box">{errorServer}</KeyFigureTitle>
  }
  if (data) {
    invoices = data.invoices;
  }
  return (
    <div>
      {
        invoices && invoices.length > 0 ? (
          invoices.map((item) => (
            <Invoice title={item} id="#987087686375" />
          ))
        ) : <KeyFigureTitle className="box">{errorServer}</KeyFigureTitle>
      }
    </div>
  )
}

export default Invoices;
