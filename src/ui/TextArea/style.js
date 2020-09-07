import styled from "styled-components";
import composers from "styles/composers";


const TextArea = styled.textarea`
  ${composers.box}
  ${composers.text}
  box-sizing: border-box;
  &:focus {
    border: 2px solid #7451ff;
  }
`;

TextArea.defaultProps = {
  display: "block",
  background: "white",
  borderWidth: 1,
  borderColor: "gray.2",
  borderRadius: 1,
  width: "initial",
  my:3,
  p:1,
  fontSize: 1,
};

export default TextArea