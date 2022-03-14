import React from "react";
import PropTypes from "prop-types";

const PieChart = (props) => {
  const { dataset } = props;
  return <p>future chart</p>;
};

PieChart.Proptypes = {
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
    })
  ),
};
export default PieChart;
