import React from "react";

import StepLine from "components/StepLine";
import Phaser from "./Fx/Phaser";
import PingPongDelay from "./Fx/PingPongDelay";
import Smasher from "./Fx/Smasher";
import { initFX } from "../presets/drums";

import { Timeline } from "components/Timeline";
import MainController from "components/MainController";
import { Box } from "ui";
import Footer from "./Footer";


const DrumMachine = ({
  sequence,
  patternName,
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
          <Smasher
            handleValues={handleValues}
            instrument={["drumDist", "drumCrusher"]}
            init={{ ...initFX.fxDist, ...initFX.fxBitCrusher }}
          />
          <PingPongDelay
            handleValues={handleValues}
            instrument={"drumPPDelay"}
            init={initFX.fxPPDelay}
          />
          <Phaser
            handleValues={handleValues}
            instrument={"drumPhaser"}
            init={initFX.fxPhaser}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default DrumMachine;
