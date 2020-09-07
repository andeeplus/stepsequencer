import React from "react"
import styled from "styled-components";

import { Button } from "ui"

const PlayButtonStyled = styled(Button)``;

PlayButtonStyled.defaultProps = {
  color: "yellow.3",
  bg: "gray.9",
  minWidth: "100%",
  my: 3,
};

const PlayButton = ({ isPlaying, ...props }) => (
  <PlayButtonStyled {...props}>{isPlaying ? "◼" : "►"}</PlayButtonStyled>
);

export default PlayButton;
