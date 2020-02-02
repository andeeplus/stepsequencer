import styled from 'styled-components'

const TextLightInset = styled.p`
    text-align: center;
    margin: 0;
    font-size: 12px;
    background-color: #565656;
    color: ${({theme}) => theme.colors.text};
    width: 2rem;
    text-shadow: inset 1px 1px 1px  rgb(184, 212, 212);
    -webkit-background-clip: text;
      -moz-background-clip: text;
            background-clip: text;
`

const IndividualSeqActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StepButton = styled.div`
    width: 25px;
    height: 25px;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 4px;
    box-shadow: ${({theme, isActive}) => !isActive ? theme.shadows.medium : theme.shadows.insetMedium};
    background-color: ${({theme, isActive}) => isActive ? theme.colors.main200 : theme.colors.main};
    transition: all .2s ease-out;
    &:hover {
        background-color: ${({theme}) => theme.colors.mainHover};
    }
    &:active {
      background-color: ${({theme}) => theme.colors.mainActive};
    }
    
`


const SquareButton = styled.div`
    margin: 5px; 
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.mainContrast}30;
    width: 12px; 
    height: 12px;
    border-radius: 50%;
    font-size: 8px;
    line-height: 12px;
    display: flex;
    justify-content: center;
    align-items: initial;
    outline: none;
	transition: all .4s ease-out;
    &:hover {
      background-color: red;
      color: #f5f578;
    }
    &:active {
      background-color: orange;
      color: #f5f578;
    }
`

const SquareButtonLed = styled.div`
    margin: 0 auto;
    width: 25px;
    height: 25px;
    background-color: ${({theme, isActive}) => isActive ? `${theme.colors.mainActive}40` : null };
    border-radius: 2px;
    box-shadow: ${({theme, isActive}) => isActive ? `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, #304701 0 -1px 9px ${theme.colors.mustard100}` : null};
`


export { StepButton, TextLightInset, IndividualSeqActions, SquareButton, SquareButtonLed }