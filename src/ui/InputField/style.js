import styled from 'styled-components'
import composers from 'styles/composers'

const InputField = styled.input`
  ${composers.text}
  ${composers.box}
`;

InputField.defaultProps = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "gray.2",
  fontSize: 1,
  p: 1
};

export default InputField