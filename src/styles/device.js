const size = {
  mobile: '375px',
  midSize: '769px',
  large: '1024px',
  xLarge: '1920px',
}

/**
* @mobile 375px
* @midSize 769px
* @tablet 1024px
* @desktop 1920px
*/
export const device = {
    mobile: `(min-width: ${size.mobile})`,
    midSize: `(min-width: ${size.midSize})`,
    tablet: `(min-width: ${size.tablet})`,
    desktop: `(min-width: ${size.desktop})`,
};