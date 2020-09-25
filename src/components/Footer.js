import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { Box, Text } from "ui";
import packageJson from "../../package.json";

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
      position="absolute"
      bottom={2}
      right={0}
      shadow
      alignItems="center"
      justifyContent="center"
      margin="0 auto;"
      width="fit-content"
      borderRadius={1}
      bg="gray.8"
      px={3}
    >
      <Text textSize="xxs">made with </Text>
      <Rotate>☯</Rotate>
      <Text textSize="xxs">by </Text>
      <Text
        as="a"
        textSize="xxs"
        href="https://github.com/andeeplus"
        rel="noopener noreferrer"
        target="_blank"
        color="yellow.4"
      >
        @andeeplus
      </Text>
      <Text
        borderRadius={4}
        bg="red.7"
        color="yellow.4"
        p="3px"
        textSize="xxs"
        ml={2}
      >
        v.{packageJson.version}
      </Text>
    </FooterStyled>
  </Fragment>
);

export default Footer;
