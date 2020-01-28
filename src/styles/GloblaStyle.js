import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,700&display=swap');

html, body {
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
  font-family: 'IBM Plex Mono', monospace;
  background-color: rgb(33, 33, 33);
  background-size: cover;
}
`