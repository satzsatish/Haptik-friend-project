import React from 'react';
import Styled from './Pagination.module.css';
const Pagination = ({listPerPage,totalPage,paginate}) => {
  const pageNum=[];
  for(let i=1; i<=Math.ceil(totalPage/listPerPage); i++){
    pageNum.push(i);
  }
  return (
    <div>
    <ul className={Styled.paginationList}>
    {
    pageNum.map(num => {
      return <li key={num}>
      <a onClick={()=>paginate(num)} href="!#">{num}</a>
      </li>
    })
    }
    </ul>
    </div>
  )
}
export default Pagination;
