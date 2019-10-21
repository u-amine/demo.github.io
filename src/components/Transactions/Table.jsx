import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import { useTable, usePagination } from 'react-table';
import { errorServer } from '../../constants/content.json';

import check from '../../media/tick.png';


const Styles = styled.div`
  table {
    border-spacing: 0;
    width: 100%;

    th {
      color: ${props => props.theme.greyColor};
      font-weight: 300;
      border-bottom: 1px solid #ddd;
    },

    td {
      margin: 0;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #ddd;
      :last-child {
        border-right: 0;
      }
    }
  }
`

const StyledPagination = styled.div`
  float: right;
  padding: 2rem;
  select {
    position: relative;
    top: 4px;
  };
  span {
    color: ${props => props.theme.greyColor};
    margin-right: 10px;
    margin-left: 10px;
    font-size: 15px;
    position: relative;
    top: 10px;
  }
`

const StyledError = styled.span`
  padding: 10px;
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2, pageSize: 5 },
    },
    usePagination,
  );
  // Render the UI for your table
  return (
    <>
      <table className="table" pageSize={5} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length > 0 ?
            page.map(
              (row, i) =>
                prepareRow(row) || (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
            ) :
            <StyledError>{errorServer}</StyledError>
          }
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <StyledPagination>
        <span>
          Rows per page:
        </span>
        <div class="select">
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <span>
          { pageIndex * pageSize + 1 }
          {' - '}
          {(pageIndex + 1) * pageSize}
          {' of '}
          {data.length}
        </span>
        <button className="button pagination-previous" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
        <button className="button pagination-next" onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
      </StyledPagination>
    </>
  )
}


const TransactionsTable = (props) => {
  const { data, error, loading } = useQuery(props.query);
  let transactions = [];
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'Date'
      },
      {
        Header: 'Category',
        accessor: 'Category'
      },
      {
        Header: 'Duration',
        accessor: 'Duration'
      },
      {
        Header: 'Price',
        accessor: 'Price'
      },
      {
        Header: 'Validated',
        Cell: ({ row }) => <img alt="" className="validationImg" src={check}/>
      },
    ],
    []
  )
  if (error) {
    transactions = [];
  }
  if (data && data.getTransactions) {
    transactions = data.getTransactions;
  }
  return (
    <Styles>
      <Table columns={columns} data={transactions} />
    </Styles>
  )
};

export default TransactionsTable;
