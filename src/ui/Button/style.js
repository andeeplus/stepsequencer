import styled from "styled-components";
import composers from "styles/composers"

const StyledButton = styled.button`
  ${composers.box}
  ${composers.text}
  cursor: pointer;
`;

StyledButton.defaultProps = {
  bg: "grey.2",
  borderRadius: 1,
  borderColor: "grey.5",
  borderStyle: "solid",
  borderWidt: "1px",
  fontSize: 0,
  px: 2,
  minHeight: '32px',
  minWidth: '90px'
};

export default StyledButton;