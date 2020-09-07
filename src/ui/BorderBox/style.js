import styled, { css } from "styled-components";
import Box from "../Box";

const BorderBox = styled(Box)`
  box-sizing: border-box;
  cursor: ${(props) => props.cursor};
  ${(props) =>
    props.css &&
    css`
      ${props.css}
    `}
`;

BorderBox.defaultProps = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "gray.2",
  borderRadius: 8,
};

export default BorderBox