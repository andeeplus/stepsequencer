import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_PATTERN,
  CHANGE_PATTERN_NAME,
  CHANGE_BPM,
} from "../store/actions/sequencerActions";
import { Box, InputField } from "ui";
import Icon from "./ActionButton/svg";
import styled from "styled-components";

const LightedScreen = styled(Box)`
  box-shadow: rgba(0, 0, 0, 0.2) 0 0px 1px 2px, inset #e1e4e8 0 -1px 7px,
    #fff 0 2px 6px;
`;

const Screen = () => {
  const bpm = useSelector((store) => store.sequencer.bpm);
  const actualPattern = useSelector((store) => store.sequencer.sequence);
  const patternName = useSelector((state) => state.sequencer.patternName);
  const index = useSelector((state) => state.sequencer.index);

  const [isEdit, setEdit] = useState(false);
  const [isEditBpm, setEditBpm] = useState(false);
  const [newName, setNewName] = useState(patternName);
  const [newBpm, setNewBpm] = useState(bpm);

  useEffect(() => {
    setNewName(patternName);
  }, [patternName]);

  useEffect(() => {
    setNewBpm(bpm);
  }, [bpm]);

  const now = new Date();
  const timestamp =
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

  const patternToSave = {
    ...actualPattern,
    name: patternName,
    timestamp,
    index,
    bpm,
  };

  const dispatch = useDispatch();

  const savePattern = () => dispatch({ type: SAVE_PATTERN, patternToSave });

  const changePatternName = () =>
    dispatch({ type: CHANGE_PATTERN_NAME, patternName: newName });

  const changeBpm = () => dispatch({ type: CHANGE_BPM, bpm: parseInt(newBpm) });

  const keyPressed = (event) => {
    const inputName = event.target.name;

    if (event.key === "Enter") {
      switch (inputName) {
        case "name":
          changePatternName(newName);
          setEdit(false);
          break;
        case "bpm":
          changeBpm(newName);
          setEditBpm(false);
          break;
        default:
          console.error("Please review your code");
      }
    }
  };

  return (
    <LightedScreen
      column
      justifyContent="flex-start"
      bg="gray.4"
      color="white"
      height="78px"
      width="120px"
    >
      <Box>
        <InputField
          name="name"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          onKeyPress={keyPressed}
          bg={isEdit ? "yellow.8" : "gray.2"}
          color={isEdit ? "white" : "gray.8"}
          width="120px"
          fontSize={0}
          borderWidth={0}
        />
        <Icon
          position="absolute"
          right={0}
          top={0}
          p={1}
          icon="pencil"
          size={12}
        />
      </Box>
      <Box>
        <InputField
          type="number"
          name="bpm"
          onChange={(e) => setNewBpm(e.target.value)}
          value={newBpm}
          onKeyPress={keyPressed}
          bg={isEditBpm ? "yellow.8" : "gray.2"}
          color={isEditBpm ? "white" : "gray.8"}
          width="120px"
          fontSize={0}
          borderWidth={0}
        />
        <Icon
          position="absolute"
          right={0}
          top="2px"
          p={1}
          icon="bpm"
          size={12}
        />
      </Box>
      <Icon
        position="absolute"
        right={0}
        bottom={0}
        icon="save"
        fill="yellow"
        tint={9}
        size={12}
        p={1}
        editing={isEdit}
        cursor="pointer"
        onClick={isEdit ? changePatternName : savePattern}
      />
    </LightedScreen>
  );
};

export default Screen;
