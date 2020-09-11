import React from "react";

import Knob from "../Knob/Knob";
import { ControlArea, LabelName } from "./ModulePainter.styles";
import { Box } from "ui";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_EFFECT_STATUS } from "store/actions/sequencerActions";
import Icon from "components/ActionButton/svg";
import { PatternButton } from "components/PatternSelector/styles";
import styled from "styled-components";

const PowerButton = styled(PatternButton)``;

const ModulePainter = ({
  name,
  children,
  parameters,
  handleValues,
  moduleColor,
  storeEffectState,
}) => {
  const dispatch = useDispatch();
  const isPowered = useSelector(
    (state) => state.sequencer.effects.status[name]
  );

  const togglePower = () =>
    dispatch({ type: UPDATE_EFFECT_STATUS, name, status: !isPowered });

  return (
    <ControlArea moduleColor={moduleColor} column>
      <Box alignItems="center" mb={2}>
        <LabelName disabled={!isPowered}>{name.toUpperCase()}</LabelName>
        <PowerButton title="power off">
          <Icon
            onClick={togglePower}
            fill={isPowered ? "yellow" : "gray"}
            tint={4}
            icon="power"
            size={10}
            p={2}
          />
        </PowerButton>
        <PowerButton
          title="save fx"
          height="16px"
          onClick={() => storeEffectState(name)}
        >
          <Icon fill="orange" tint={2} icon="save" size={10} p={2} />
        </PowerButton>
      </Box>
      <Box flexWrap="wrap" justifyContent="space-evenly">
        {parameters.map((param, i) => (
          <Knob
            key={i}
            size={20}
            numTicks={param.ticks}
            min={param.minMax[0]}
            max={param.minMax[1]}
            value={param.initValue}
            color="darkgrey"
            onChange={handleValues}
            typeValue={param.parameters}
            disabled={!isPowered}
          >
            {param.shortName}
          </Knob>
        ))}
      </Box>
      {children}
    </ControlArea>
  );
};

export default ModulePainter;
