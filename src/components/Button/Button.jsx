import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

const Button = ({ onClick }) => (
  <StyledButton type="button" onClick={() => onClick()}>
    Load more
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
