import {
  compose,
  flexbox,
  layout,
  space,
  color,
  border,
  position,
  background,
  shadow,
  typography,
  grid,
} from 'styled-system';

const composers = {
  box: compose(flexbox, layout, space, color, border, position, background, shadow, typography, grid),
  text: compose(typography, color, space, layout, position, flexbox),
};

export default composers;
