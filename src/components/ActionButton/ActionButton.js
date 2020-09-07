import React from 'react'
import styled, { useTheme } from "styled-components";
import { createElement, forwardRef } from "react";
import { icons } from "./svg";
import { motion } from "framer-motion";
import composers from "styles/composers";

const StyledAction = styled(motion.button)`
  ${composers.box}
  &:disabled {
    background: ${(props) => props.theme.colors.gray[2]};
    svg {
      fill: white;
    }
  }
`;

const ActionButton = forwardRef(
  ({ type, onClick, size = 16, fill, ...props }, ref) => {
    const theme = useTheme();

    return (
      <StyledAction
        p={2}
        ref={ref}
        initial={{ fill: theme.colors[fill] || theme.colors.black }}
        whileHover={
          !props.disabled && {
            scale: 1.1,
            fill: theme.colors.blue[3],
            cursor: "pointer",
          }
        }
        whileTap={!props.disabled && { scale: 0.9, fill: theme.colors.red[4] }}
        {...props}
        onClick={onClick}
      >
        {createElement(icons[type] || "like", { fill, size, icon: type })}
      </StyledAction>
    );
  }
);

ActionButton.defaultProps = {
  hoverFill: "primary",
  margin: 2,
  size: 16,
  fill: "gray",
  type: "watchlist",
  bg: "transparent",
  border: "none",
  borderRadius: 8,
};

export default ActionButton;

ActionButton.displayName = "ActionButton";
