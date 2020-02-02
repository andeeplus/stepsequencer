import { createGlobalStyle } from 'styled-components';

import Geomanist from '../assets/geomanist-regular-webfont.woff'
import Geomanist2 from '../assets/geomanist-regular-webfont.woff2'

export default createGlobalStyle`
    @font-face {
        font-family: 'Geomanist';
        src: local('Geomanist'), local('Geomanist'),
        url(${Geomanist}) format('woff2'),
        url(${Geomanist2}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;