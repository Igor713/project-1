import P from 'prop-types';
import './styles.css';

export const Button = ({ text, onClick, disabled }) => (
  <button
    className='button-pagination'
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.protoTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool
};
