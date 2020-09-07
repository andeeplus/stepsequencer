import styled from "styled-components";
import composers from "styles/composers";

const Label = styled.div`
  ${composers.text}
  ${composers.box}
`;

Label.defaultProps = {
  width: "fit-content",
  height: "fit-content",
  lineHeight: "20px",
  fontSize: 0,
  borderWidth: "1px",
  borderColor: "gray.3",
  borderStyle: "solid",
  px: 2,
  borderRadius: 3,
};

export default Label