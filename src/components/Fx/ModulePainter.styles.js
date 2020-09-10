import styled from 'styled-components'
import { Text, Box } from 'ui'
import theme from 'styles';

const ControlArea = styled(Box)``;

ControlArea.defaultProps = {
  bg: "gray.7",
  height: "fit-content",
  m: 1,
  mb: 4,
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
  border-radius: 4px;
  background-clip: text;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

LabelName.defaultProps = {
  bg: theme.colors.gray[9],
  color: theme.colors.gray[2],
  mx: 1,
  my: 1,
  p: '2px',
  width: '75px'
};

export {
    ControlArea,
    LabelName
}