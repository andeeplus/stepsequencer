import React from 'react'
import StyledButton from "./style";
import { Spinner } from "..";
import Box from "../Box";

const Button = ({ children, loading, disabled, ...props }) => {
  return (
    <StyledButton {...props} disabled={loading || disabled}>
      <Box as="span" alignItems="center" justifyContent="center" p={0}>
        {loading ? <Spinner size={"12px"} /> : children}
      </Box>
    </StyledButton>
  );
};

export default Button;
