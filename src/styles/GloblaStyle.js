import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,700&display=swap');

html, body {
    margin:0;
    padding:0;
    font-family: 'IBM Plex Mono', monospace;
    background-size: cover;
    transition: all .4s ease-out;
}
`