import React from "react";
import Knob from "../Knob";
import { Box } from "ui";

const MasterControl = ({ handleBpm, handleVolume }) => (
  <Box flexWrap="wrap" justifyContent="space-evenly">
    <Knob
      size={25}
      min={1}
      max={100}
      value={100}
      color={"lightgrey"}
      onChange={handleVolume}
    >
      VOL
    </Knob>
  </Box>
);

export default MasterControl;
