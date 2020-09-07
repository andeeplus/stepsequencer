import React from 'react'
import { ActionButton } from "./ActionButton";

export const ActionBar = ({ actions }) =>
  actions.map((action, i) => (
    <ActionButton
      key={i + action.type}
      margin="0 .5rem"
      type={action.type || "like"}
      size={action.size || "12"}
      fill={action.fill || "primary"}
      hoverFill={action.hoverFill || "gray"}
      onClick={() => action.onClick}
    />
  ));
