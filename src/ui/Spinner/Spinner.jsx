import React from "react";
import styled, { css } from "styled-components";
import composers from "styles/composers";
import Box from "../Box";


const StyledSpinner = styled.svg(
  ({ margin, padding, size, theme: { colors }, color }) => css`
    ${composers.box}
    animation: rotate 1s linear infinite;
    margin: ${margin || "0"};
    padding: ${padding || "0"};
    width: ${size || "50px"};
    height: ${size || "50px"};

    & .path {
      stroke: ${colors.red[3]};
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `
);


const Spinner = ({
  size,
  color,
  margin,
  padding,
  strokeWidth = 6,
  ...props
}) => (
  <Box {...props}>
    <StyledSpinner
      size={size}
      color={color}
      margin={margin}
      padding={padding}
      viewBox="0 0 50 50"
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth={strokeWidth}
      />
    </StyledSpinner>
  </Box>
);

export default Spinner;
