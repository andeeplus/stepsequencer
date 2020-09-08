import React from 'react'
import styled from 'styled-components'

export const PureSpinner = ({ size, color, strokeWidth = 6 }) => (
    <StyledSpinner size={size} color={color} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth={strokeWidth}
      />
    </StyledSpinner>
  );
  
  const StyledSpinner = styled.svg`
    animation: rotate 1s linear infinite;
    margin: 0;
    width: ${props => props.size || '50px'};
    height: ${props => props.size || '50px'};
  
    & .path {
      stroke: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.black};
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
  `;