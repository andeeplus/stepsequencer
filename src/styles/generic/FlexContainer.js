import styled from 'styled-components'
import { device } from '../device'

/**
 * @props column(boolean), responsive, flex, flexWrap, justifyContent, alignItems, width, height, padding, margin, cursor, backgroundColor
 * @notes default media query: 768px - To change the device you need to extend the element
 */
export const FlexContainer = styled.div`
    display: flex;
    flex-direction: ${props => 
        (props.responsive && props.column) 
        ? 'row' 
        : props.responsive
        ? 'column' 
        : props.column && 'column'
    };
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    width: ${props => props.width};
    height: ${props => props.height};
    flex-wrap: ${props => props.flexWrap};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    flex: ${props => props.flex};
    background-color: ${props => props.backgroundColor};
    @media ${device.midSize}{
        flex-direction: ${props => props.column ? 'column' : 'row'};
    }
`

FlexContainer.defaultProps = {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    padding: 0,
    margin: 0,
    flex: '0 1 auto',
    backgroundColor: 'transparent',
    boxShadow: 'none'
}