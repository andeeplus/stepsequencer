import { device } from './device'

export const colors = {
    clear: {
        main: '#E0E5EC',
        main200: '#f0f0f0',
        main400: '#b6caec',
        mainContrast: '#728db4',
        mainContrastInverted: '#ffffff',
        mainHover: '#b8c6da',
        mainActive: '#90f97d',
        mustard100: '#F6C244', 
        text: '#212121',
        invertedText: 'white'
    },
    dark: {
        main: '#212121',
        main200: '#953e3e',
        main400: '#4d4d4d',
        mainContrast: '#040000',
        mainContrastInverted: '#4d4d4d',
        mainHover: '#99787a50',
        mainActive: '#f5f578',
        mustard100: '#F6C244',
        text: 'white',
        invertedText: '#212121'
    }
}

const sharedColors = {
    red100: '#d62728',
    orange100: '#bf452f',
    orange300: '#ffa54e',
    mustard100: '#ffc107',
    lemon100: '#f9f905',
    blue100: '#2d5185',
    blue300: '#c3f1f5',
    blue500: '#F1F2F3',
    green100: '#288403',
    green200: '#309c30',
    grey100: '#777',
    grey300: '#C9C9C9',
    grey500: '#dddddd',
    grey700: '#f7f7f7',
    black: '#000',
    black100: '#333',
    white: '#fff',
    transparent: 'transparent'
}


const shadows = (theme) => ({
    clear: {
        large: `4px 4px 13px ${colors[theme].mainContrast}60, -4px -4px 13px ${colors[theme].mainContrastInverted}`,
        medium: `${colors[theme].mainContrast}60 2px 2px 6px, ${colors[theme].mainContrastInverted} -2px -2px 10px`,
        small: `0px 0px 12px ${colors[theme].mainContrast}60), -3px -6px 11px ${colors[theme].mainContrastInverted}`,
        insetMedium: `inset 2px 4px 8px ${colors[theme].mainContrast}60, -1px -2px 4px ${colors[theme].main400}`
    },
    dark: {
        large: `4px 4px 5px ${colors[theme].mainContrast}60, -2px -2px 3px ${colors[theme].mainContrastInverted}`,
        medium: `${colors[theme].mainContrast}60 2px 2px 3px, ${colors[theme].mainContrastInverted} -1px -1px 3px`,
        small: `0px 0px 12px ${colors[theme].mainContrast}60), -3px -6px 11px ${colors[theme].mainContrastInverted}`,
        insetMedium: `inset 2px 2px 4px ${colors[theme].mainContrast}60, -1px -2px 4px ${colors[theme].mainContrastInverted}50`
    }
})



const typography = {
    typography: {
        titleH1: {
            fontSize: '36px', 
            fontWeight: '400',
            textTransform: 'capitalize'
        },
        titleH2: {
            fontSize: '20px', 
            fontWeight: '800',
            textTransform: 'capitalize'
        },
        titleH3: {
            fontSize: '18px', 
            fontWeight: '700',
            textTransform: 'capitalize'
        },
        titleH4: {
            fontSize: '16px', 
            fontWeight: '700',
            textTransform: 'capitalize'
        },
        titleH5: {
            fontSize: '14px', 
            fontWeight: '800',
            textTransform: 'capitalize'
        },
        titleH6: {
            fontSize: '12px', 
            fontWeight: '100',
            textTransform: 'capitalize'
        },
        actionTitle: {
            fontSize: '16px', 
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        strapLine: {
            fontSize: '12px', 
            fontWeight: '300'
        },
        paragraph: {
            fontSize: '14px', 
            fontWeight: '300'
        },
        paragraphLight: {
            fontSize: '14px', 
            fontWeight: '200'
        },
        errorParagraph: {
            fontSize: '12px', 
            fontWeight: '300'
        },
        cardTitle: {
            fontSize: '18px', 
            fontWeight: '400',
            textTransform: 'capitalize'
        },
        cardStrapLine: {
            fontSize: '13px', 
            fontWeight: '400'
        },
        infoText: {
            fontSize: '14px', 
            fontWeight: '600'
        }
    }
}

const layout = {
    layout: {
        boxSize: 'auto',
        padding: '0'
    }
}

const devices = {
    devices: {
        small: device.mobile,
        medium: device.midSize,
        normal: device.tablet,
        large: device.desktop
    }
}

const buttons = (theme) => ({
    buttons: {
        fontSize: {
            small: '12px',
            medium: '14px',
            large: '18px'
        },
        backgroundColor: {
            'default': colors[theme].main,
            'info': colors[theme].blue100,
            'warning': colors[theme].mustard100,
            'error': colors[theme].red100,
            'success': colors[theme].green100,
            'disabled': colors[theme].grey500,
            'light': colors[theme].transparent,
            'light-hover': colors[theme].main500,
            'black': colors[theme].black,
            'white': colors[theme].white
        },
        color: {
            'default': colors[theme].white,
            'info': colors[theme].white,
            'warning': colors[theme].main,
            'error': colors[theme].white,
            'success': colors[theme].white,
            'disabled': colors[theme].grey100,
            'light': colors[theme].main,
            'black': colors[theme].white,
            'white': colors[theme].main
        }
    }
})


const styledTheme = (theme = 'clear') =>  ({
    ...{colors: {...colors[theme], ...sharedColors}}, 
    shadows: shadows(theme)[theme], 
    ...typography, 
    ...layout, 
    ...devices, 
    ...buttons(theme)
})

export { styledTheme }