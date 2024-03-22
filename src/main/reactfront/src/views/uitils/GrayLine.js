import React from 'react';
import PropTypes from 'prop-types'; // prop-types 패키지 import

const GrayLine = ({ marginTop, marginBottom }) => {
  return (
    <div className="gray-line" style={{ borderTop: '1px solid #ccc', marginTop: marginTop, marginBottom: marginBottom }}>
    </div>
  );
};

// props의 유효성을 검사하는 코드 추가
GrayLine.propTypes = {
  marginTop: PropTypes.string.isRequired,
  marginBottom: PropTypes.string.isRequired
};

export default GrayLine;
