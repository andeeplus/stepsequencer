import React from "react";

import StepLine from "components/StepLine";
import Phaser from "./Fx/Phaser";
import PingPongDelay from "./Fx/PingPongDelay";
import Distorsion from "./Fx/Distorsion";
import BitReducer from "./Fx/BitReducer";
import Reverb from "./Fx/Reverb";
import { initFX } from "../tone/effects";

import { Box } from "ui";
import { Timeline } from "components/Timeline";
import MainController from "components/MainController";
import Footer from "./Footer";

const DrumMachine = ({
  sequence,
  changePattern,
  play,
  updateChannelSequence,
  playStop,
  handleVolume,
  handleBpm,
  handleValues,
  indexSeq,
  patternIndex,
}) => {
  return (
    <Box column justifyContent="center" minHeight="100vh" alignItems="center">
      <Box
        shadow
        justifyContent="center"
        alignItems="center"
        bg="gray.8"
        column
        p={4}
        borderRadius={1}
        height="fit-content"
      >
        <Box
          column
          justifyContent="center"
          alignItems="center"
          bg="gray.8"
          borderRadius={1}
        >
          {sequence &&
            Object.keys(sequence).map((sound) => (
              <StepLine
                sound={sound}
                key={sound}
                sequence={sequence[sound]}
                updateChannelSequence={updateChannelSequence}
                indexSeq={indexSeq}
              />
            ))}
          <Timeline
            indexSeq={indexSeq}
            steps={[...Array(16)]}
            isPlaying={play}
          />
        </Box>
        <Box
          m={4}
          mb={0}
          justifyContent="space-between"
          flexWrap="wrap"
          width="100%"
        >
          <MainController
            changePattern={changePattern}
            play={play}
            playStop={playStop}
            handleVolume={handleVolume}
            handleBpm={handleBpm}
            patternIndex={patternIndex}
          />
          <Box column>
            <Distorsion
              handleValues={handleValues}
              instrument={"distorsion"}
              init={initFX.distortion}
            />
            <BitReducer
              handleValues={handleValues}
              instrument={"bitCrusher"}
              init={initFX.bitCrusher}
            />
          </Box>
          <Box column>
            <Reverb
              handleValues={handleValues}
              instrument={"reverb"}
              init={initFX.reverb}
            />
            <PingPongDelay
              handleValues={handleValues}
              instrument={"ppDelay"}
              init={initFX.ppDelay}
            />
          </Box>
          <Phaser
            handleValues={handleValues}
            instrument={"phaser"}
            init={initFX.phaser}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default DrumMachine;
