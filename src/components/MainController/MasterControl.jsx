import React from "react";
import Knob from "../Knob/Knob";
import { Box } from "ui";

const MasterControl = ({ handleBpm, handleVolume }) => (
  <Box flexWrap="wrap" justifyContent="space-evenly" bg="gray.6" p={2} width="100%" my={4} borderRadius={1}>
    <Knob
      size={25}
      min={1}
      max={100}
      value={100}
      color={"lightgrey"}
      onChange={handleVolume}
    >
      VOLUME
    </Knob>
  </Box>
);

export default MasterControl;
