import { device } from './device'

const colors = {
    colors: {
        main: '#e08484',
        main400: '#e0b1b1',
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
    }
}

const shadows = {
    shadows: {
        menu: '0px 2px 11px 0px rgba(0,0,0,0.25)',
        alert: '0px 2px 8px 1px rgba(0,0,0,0.16)',
        button: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        buttonHover: '0px 2px 10px 0px rgba(0, 0, 0, 0.2), 0px 4px 4px 0px rgba(0, 0, 0, 0.14), 0px 6px 2px -4px rgba(0, 0, 0, 0.12)'
    }
}

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
            fontWeight: '300',
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
            fontSize: '16px', 
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

const buttons = {
    buttons: {
        fontSize: {
            small: '12px',
            medium: '16px',
            large: '20px'
        },
        backgroundColor: {
            'default': colors.colors.main,
            'info': colors.colors.blue100,
            'warning': colors.colors.mustard100,
            'error': colors.colors.red100,
            'success': colors.colors.green100,
            'disabled': colors.colors.grey500,
            'light': colors.colors.white,
            'light-hover': colors.colors.main400,
            'black': colors.colors.black
        },
        color: {
            'default': colors.colors.white,
            'info': colors.colors.white,
            'warning': colors.colors.white,
            'error': colors.colors.white,
            'success': colors.colors.white,
            'disabled': colors.colors.grey100,
            'light': colors.colors.main,
            'black': colors.colors.white
        }
    }
}

const theme = {...colors, ...shadows, ...typography, ...layout, ...devices, ...buttons}

export {theme}