import styled from "styled-components";
import composers from "styles/composers";
import { variant } from "styled-system";
import theme from 'styles/theme'

const textSize = {
  xl: {
    fontSize: theme.fontSizes[4],
  },
  lg: {
    fontSize: theme.fontSizes[3],
  },
  md: {
    fontSize: theme.fontSizes[2],
  },
  sm: {
    fontSize: theme.fontSizes[1],
  },
  xs: {
    fontSize: theme.fontSizes[0],
  },
};
const textStyle = {
  thin: {
    fontWeight: theme.fontWeights.light,
  },
  normal: {
    fontWeight: theme.fontWeights.normal,
  },
  semibold: {
    fontWeight: theme.fontWeights.semibold,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
    letterSpacing: "0.5px",
  },
};

const behaviour = {
  default: "",
  link: {
    cursor: "pointer",
    color: theme.colors.blue,

    "&:hover": {
      color: theme.colors.blue,
      background: theme.colors.lightBlue,
      paddingLeft: theme.space[1],
      paddingRight: theme.space[1],
      borderRadius: 4,
    },
  },
};

const Text = styled.span`
  ${variant({
    variants: textSize,
    prop: "textSize",
  })}
  ${variant({
    variants: textStyle,
    prop: "textStyle",
  })}
  ${variant({
    variants: behaviour,
    prop: "behaviour",
  })}
  ${composers.text};
  line-height: 1.8;
  transition: all 0.1s ease-in;
  cursor: ${(props) => props.cursor};
`;

export default Text

Text.defaultProps = {
  textStyle: "normal",
  textSize: "lg",
};