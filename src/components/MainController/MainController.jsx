import React from "react";

import MasterControl from "./MasterControl";
import PatternSelector from "components/PatternSelector";
import Screen from "components/Screen";
import PlayButton from "components/PlayButton";
import { Box } from "ui";


const MainController = ({
  changePattern,
  play,
  playStop,
  handleVolume,
  handleBpm,
  patternIndex,
}) => {
  return (
    <Box
      Box
      column
      justifyContent="center"
      alignItems="center"
      borderRadius={8}
      p={2}
    >
      <PatternSelector
        changePattern={changePattern}
        patternIndex={patternIndex}
        isPlaying={play}
      />

      <PlayButton onClick={playStop} isPlaying={play} />
      <Screen />
      <MasterControl handleBpm={handleBpm} handleVolume={handleVolume} />
    </Box>
  );
};

export default MainController