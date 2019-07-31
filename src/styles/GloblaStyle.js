import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Palanquin+Dark');

html, body {
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
  font-family: 'Palanquin Dark', sans-serif;
  background-color: #d9d9d9;
  background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  font-family: 'Palanquin Dark', sans-serif;
}
`