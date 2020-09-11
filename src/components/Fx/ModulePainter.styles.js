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
  p: 2,
  justifyContent: "flex-start",
  width: 150,
  borderRadius: 1
};


const LabelName = styled(Text)`
  text-align: center;
  font-size: 10px;
  font-family: "Geomanist";
  border-radius: 4px;
  background-clip: text;
  box-shadow: ${({ theme }) => theme.shadows.small};
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.gray[4]
      : props.color || props.theme.colors.gray[1]};
`;

LabelName.defaultProps = {
  bg: theme.colors.gray[9],
  mx: 1,
  my: 1,
  p: "2px",
  width: "75px",
  color: theme.colors.gray[1],
};

export {
    ControlArea,
    LabelName
}