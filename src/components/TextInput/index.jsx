import P from 'prop-types';
import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      onChange={handleChange}
      value={searchValue}
      type="search"
      className="search-input"
      placeholder="Digite algo"
    />
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired
};
