import React from 'react'


import { styledTheme } from '../../styles/theme'
import { FlexContainer } from '../../styles'

const save = () => <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"/>

const pencil = () => <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"/>

const play = () => <path d="M3 22v-20l18 10-18 10z"/>

const svgCreator = (Path) => ({
    size = "24", fill = 'main', margin = 0
}) => (
    <FlexContainer
        justifyContent='center' 
        alignItems='center' 
        margin={margin}
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            fill={styledTheme().colors[fill]}
            viewBox = "0 0 24 24"
        >
            <Path />
        </svg>
    </FlexContainer>
)

const Save = svgCreator(save)
const Pencil = svgCreator(pencil)
const Icon = svgCreator(play)

export {
    Save,
    Pencil,
    Icon
}