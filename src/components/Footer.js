import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { Box } from "ui";

import "react-toggle/style.css";
// import { ToggleSwitch } from './Elements';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 0.25rem;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.orange[3]};
`;

const FooterStyled = styled(Box)`
  font-size: 10px;
  font-weight: 100;
  bottom: 0;
  color: ${({ theme }) => theme.colors.gray[0]};
  & a {
    font-weight: 400;
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.orange[2]};
  }
`;

const Footer = () => (
  <Fragment>
    <FooterStyled
      shadow
      alignItems="center"
      justifyContent="center"
      margin="0 auto;"
      width="fit-content"
      borderRadius={1}
      bg="gray.8"
      px={3}
      m={2}
    >
      <p>made with</p>
      <Rotate>☯</Rotate>
      <p>by</p>
      <a
        href="https://github.com/andeeplus"
        rel="noopener noreferrer"
        target="_blank"
      >
        @andeeplus
      </a>
    </FooterStyled>
  </Fragment>
);

export default Footer;
