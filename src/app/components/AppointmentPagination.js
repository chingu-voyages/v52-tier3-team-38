import { Pagination } from "react-bootstrap"
export const AppointmentPagination = ({total, current, onChangePage}) => {
  let items = [];

  if (current > 1) {
    items.push(<Pagination.Prev key="prev" onChangePage={() => page - 1}/>)
  }


  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item key={page} data-page={page} active={page === current} onChangePage={page}>
        {page}
      </Pagination.Item>
    )
  }

  if (current < total) {
    items.push(<Pagination.Next key="next" onChangePage={() => page + 1}/>)
  }

  return (
    <Pagination>{items}</Pagination>
  )
}