import React from "react";
import PropTypes from "prop-types";
import { Container, Pagination } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const ProductPagination = ({ totalPages, activePage, setActivePage }) => {
  const history = useHistory();
  return (
    <Container textAlign="center" style={{ margin: "2em" }}>
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        onPageChange={(e, data) => {
          data.activePage === 1
            ? history.push("/")
            : history.push(`/?page=${data.activePage}`);
          setActivePage(data.activePage);
        }}
      />
    </Container>
  );
};
ProductPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
};

export default ProductPagination;
