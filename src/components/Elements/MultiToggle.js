import React from "react";
import styled from "styled-components";

import { PatternButton } from "components/PatternSelector/styles";
import { Box } from "ui"
import { KnobLabel } from "components/Knob/styles";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_EFFECT_VALUE } from "store/actions/sequencerActions";

const ToggleButton = styled(PatternButton)`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  p {
    margin: 2px;
    font-size: ${(props) => (props.active ? "12px" : "12px")};
  }
`;

export const MultiToggle = ({
  parameters,
  paramName,
  steps,
  perRow,
  handleValues,
  name,
  size = 20,
  ...props
}) => {
  const dispatch = useDispatch()

  const active = useSelector(
    (state) => state.sequencer.effects.state[name][paramName]
  );

  const action = (value, parameters, index) => {
    handleValues(value, parameters);
    dispatch({ type: UPDATE_EFFECT_VALUE, name, paramName, value });
  };

  let maxWidth = size * steps.length;
  let rows = steps.length / perRow;

  let width = maxWidth / rows + size * 2;

  return (
    <Box column alignItems="center" {...props}>
      <Box width={`${width}px`} flexWrap="wrap" justifyContent="Center">
        {parameters.steps.map((parameter, index) => (
          <Box
            key={"bits" + index}
            flex={`0 1 ${100 / perRow}%`}
            alignItems="center"
            justifyContent="center"
          >
            <ToggleButton
              size={size}
              perRow={perRow}
              onClick={() =>{
                action(parameter, parameters.parameters, index);
              }}
              isActive={active === parameter}
            >
              <p>{index + 1}</p>
            </ToggleButton>
          </Box>
        ))}
        <KnobLabel mt={1}>Bits</KnobLabel>
      </Box>
    </Box>
  );
};
