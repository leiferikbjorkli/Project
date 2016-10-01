import React, { PropTypes } from 'react';

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function Arrow({ direction, size, onClick }) {
  return (
    <span
      className={`arrow arrow--${direction} arrow--${size}`}
      onClick={onClick}
    />
  );
}
