import styled from 'styled-components'
import { Text, Box } from 'ui'
import theme from 'styles';

const ControlArea = styled(Box)``;

ControlArea.defaultProps = {
  bg: "gray.7",
  height: "fit-content",
  m: 1,
  mb: 5,
  alignItems: "center",
  p: "8px 4px",
  justifyContent: "flex-start",
  width: 130,
  borderRadius: 1
};


const LabelName = styled(Text)`
  text-align: center;
  font-size: 12px;
  font-family: "Geomanist";
  margin: 0 0 16px;
  border-radius: 4px;
  padding: 4px 16px;
  background-clip: text;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.4s ease-out;
  width: 90px;
`;

LabelName.defaultProps = {
  bg: theme.colors.gray[9],
  color: theme.colors.gray[2]
};

export {
    ControlArea,
    LabelName
}