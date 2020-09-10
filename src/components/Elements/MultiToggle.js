import React, { useState } from "react";
import styled from "styled-components";

import { PatternButton } from "components/PatternSelector/styles";
import { LabelName } from "../Fx/ModulePainter.styles";
import { Box } from "ui"
import { KnobLabel } from "components/Knob/styles";

const ToggleButton = styled(PatternButton)`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  p {
    margin: 2px;
    font-size: ${(props) => (props.isActive ? "12px" : "12px")};
  }
`;

export const MultiToggle = ({
  parameters,
  steps,
  perRow,
  handleValues,
  name,
  size = 20,
  ...props
}) => {
  const [isActive, setActive] = useState(5);

  const action = (value, parameters, index) => {
    handleValues(value, parameters);
    setActive(index);
  };

  let maxWidth = size * steps.length;
  let rows = steps.length / perRow;

  let width = maxWidth / rows + size * 2;

  return (
    <Box column alignItems="center" {...props}>
      <Box width={`${width}px`} flexWrap="wrap" justifyContent="Center">
        {parameters.map((parameter, i) =>
          parameter.steps.map((p, index) => (
            <Box
              key={i + index}
              flex={`0 1 ${100 / perRow}%`}
              alignItems="center"
              justifyContent="center"
            >
              <ToggleButton
                key={`${parameter.value}-ToggleButton`}
                size={size}
                perRow={perRow}
                onClick={() =>
                  action(steps[index], parameters[i].parameters, index)
                }
                isActive={isActive === index}
              >
                <p>{index + 1}</p>
              </ToggleButton>
            </Box>
          ))
        )}
        <KnobLabel mt={1}>Bits</KnobLabel>
      </Box>
    </Box>
  );
};
