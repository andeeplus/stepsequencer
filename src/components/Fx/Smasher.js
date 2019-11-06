import React, { Fragment } from 'react';
import ModulePainter from './ModulePainter'
import { MultiToggle } from '../Elements/';

const Smasher = (props) => {

  	const {instrument, init, handleValues, knobColor, powerFX} = props

  	const smasherParameters = [
        { 
            shortName: 'dist',
            parameters: ['distortion', instrument[0]],
            minMax: [1,100],
            ticks: 0,
            initValue: init.distortion
        },
        {
            shortName: 'wet',
            parameters: ['wet', instrument[1]],
            minMax: [0,100],
            ticks: 0,
            initValue: init.wet
        }
    ]

    const bitReducer = [
        {
            shortName: 'bits',
            parameters: ['bits', instrument[1]],
            minMax: [1,8],
            steps: [8,7,6,5,4,3,2,1],
            initValue: init.bits
        }
    ]

    return (
        <Fragment>
            <ModulePainter 
                parameters={smasherParameters} 
                powerFX={powerFX}
                handleValues={handleValues} 
                name={'smasher'} 
                knobColor={knobColor}
                //moduleColor='linear-gradient(135deg, rgba(243,197,189,1) 0%,rgba(234,40,3,1) 13%,rgba(234,40,3,1) 13%,rgba(232,108,87,1) 50%,rgba(255,102,0,1) 75%,rgba(199,34,0,1) 100%)'	
                multiToggle={
                    <MultiToggle 
                        parameters={bitReducer} 
                        handleValues={handleValues} 
                        steps={[8,7,6,5,4,3,2,1]}
                        perRow={4}
                        name={'Reducer'}
                    />
                }
            />
        </Fragment>
    )
};

export default Smasher;