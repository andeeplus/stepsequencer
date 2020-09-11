import styled from "styled-components";
import { Box, Text } from "ui";

const FullKnob = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 60px;

  justify-content: center;
  align-items: center;
  cursor: grabbing;
`;

FullKnob.defaultProps = {
  m: 3,
  mb: 1
}

const KnobBase = styled.div`
  display: flex;
  position: relative;
`;

const Ticks = styled.div`
  position: absolute;
  top: -2px;
  z-index: 0;
`;
const Tick = styled.div`
  position: absolute;
  background: black;
  box-shadow: ${(props) =>
    props.isActive && !props.disabled
      ? "inset 0 0 5px 2px #deff49, 0 0 0 1px rgb(194, 193, 186)"
      : "inset 0 0 0 0 black"};
  width: 3px;
  transition: box-shadow 0.5s;
  z-index: 0;
`;

const Outer = styled.div`
  border-radius: 50%;
  border: 1px solid #222;
  box-shadow: 0 5px 15px 2px black, 0 0 5px 3px black, 0 0 0 11px #444;
  z-index: 1;
`;
const Inner = styled.div`
  border-radius: 50%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray[8] : props.theme.colors.black};
`;

const Grip = styled.div`
  position: absolute;
  width: 20%;
  height: 40%;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #509eec;
  box-shadow: 0 0 3px 1px black;
`;

const KnobLabel = styled(Text)`
  text-transform: uppercase;
  border-radius: 4px;
  text-align: center;
  font-size: 9px;
  min-width: 50px;
  background-color: ${({ theme }) => theme.colors.gray[8]};
  color: ${({ theme, disabled }) => disabled ? theme.colors.gray[4] : theme.colors.gray[0]};
`;

KnobLabel.defaultProps = {
  mt: 3,
};

export { FullKnob, KnobBase, KnobLabel, Ticks, Tick, Outer, Inner, Grip };
