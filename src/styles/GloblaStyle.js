import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,700&display=swap');

html, body {
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
  font-family: 'IBM Plex Mono', monospace;
  background: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%) no-repeat center center fixed;
  background-size: cover;
}
`