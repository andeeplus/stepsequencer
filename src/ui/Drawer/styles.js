import styled from "styled-components";
import Box from "src/ui/Box";
import { transforms } from "./config";

/* https://github.com/GoogleChrome/lighthouse/issues/10908 
  In the home-next I noticed an issue with lighthouse regarding the visibility of the drawer content.
  I'm going to remove this comment once everything will be tested in front.
  display: ${(props) => (props.open ? 'block' : 'none')};
*/

export const DrawerWrapper = styled(Box)`
  display: block;
  transform: ${(props) => (!props.open ? transforms[props.side] : null)};
`;

DrawerWrapper.displayName = "DrawerWrapper";

DrawerWrapper.defaultProps = {
  zIndices: "drawer",
  width: "100%",
};

export const DrawerContent = styled(Box)`
  display: block;
  box-sizing: border-box;
  ${(props) => props.placements[props.side]}
  height: ${(props) =>
    (props.side === "top" || props.side === "bottom") && props.size
      ? props.size
      : "100%"};
  ${(props) =>
    props.open &&
    ["bottom", "top"].includes(props.side) &&
    "height: fit-content;"}
  z-index: 7;
  transform: ${(props) => (!props.open ? transforms[props.side] : null)};
  transition: transform 0.2s ease-out;
  overflow-x: hidden;
  overflow-y: scroll;
`;

DrawerContent.defaultProps = {
  maxWidth: "100%",
  bg: "white",
  boxShadow: "-10px 0px 10px rgba(0, 0, 0, 0.19)",
  color: "black",
  overflowX: "hidden",
  overflowY: "scroll",
  position: "fixed",
  width: "100%",
};

DrawerContent.displayName = "DrawerContent";
