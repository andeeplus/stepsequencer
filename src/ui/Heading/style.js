import styled from "styled-components";
import composers from "styles/composers";
import { variant } from "styled-system";
import theme from "styles/theme";

const textSize = {
  xl: {
    fontSize: theme.fontSizes[6],
  },
  lg: {
    fontSize: theme.fontSizes[5],
  },
  md: {
    fontSize: theme.fontSizes[4],
  },
  sm: {
    fontSize: theme.fontSizes[3],
  },
  xs: {
    fontSize: theme.fontSizes[2],
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

const Heading = styled.span`
  ${variant({
    variants: textSize,
    prop: "textSize",
  })}
  ${variant({
    variants: textStyle,
    prop: "textStyle",
  })}
  ${composers.text}
  cursor: ${(props) => props.cursor};
`;

Heading.defaultProps = {
  textStyle: "bold",
  textSize: "xs",
};

export default Heading;
