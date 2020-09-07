import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import composers from "styles/composers";

const boxStyle = css`
  ${composers.box}
  ${(props) =>
    props.fwrap &&
    css`
      flex-wrap: wrap;
    `}
  ${(props) =>
    props.column
      ? css`
          flex-direction: column;
          ${props.vcenter && `justify-content: center;`}
          ${props.hcenter && `align-items: center;`}
        `
      : css`
          ${props.vcenter && `align-items: center;`}
          ${props.hcenter && `justify-content: center;`}
        `}
  box-sizing: ${(props) => props.boxSizing || "border-box"};
  transform: ${(props) => props.transform};
  cursor: ${(props) => props.cursor};
  box-shadow: ${(props) =>
    props.shadow && "0 3px 7px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.04)"};
`;

const Box = styled.div`
  ${(props) =>
    props.css &&
    css`
      ${props.css}
    `}
  ${boxStyle}
`;

Box.defaultProps = {
  display: "flex",
  position: "relative",
};

Box.displayName = "Box";

const Motion = styled(motion.div).attrs((props) => ({
  as: motion[props.as],
}))`
  ${boxStyle}
`;

Motion.defaultProps = {
  display: "flex",
  position: "relative",
};

Box.displayName = "Box.Motion";

Box.motion = Motion;

export default Box;
