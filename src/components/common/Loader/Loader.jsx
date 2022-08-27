import * as  React from 'react';
import {Box} from "@mui/material";
import styledComponent from "styled-components";

const styleWrapper = {
    placeItems:'center'
}

const Loader = ({styleHeight}) => {
    return (
        <LoaderWrapper
         width={'100vw'}
         height={styleHeight ? '' :'100vh'}
         bgcolor={'white'}
         display={'grid'}
         maxWidth={'100%'}
         style={styleWrapper}
        >
            <Box
                width={'10vmax'}
                height={'10vmax'}
                borderBottom={'5px solid rgba(110,110,110)'}
                borderRadius={'50%'}
            />
        </LoaderWrapper>
    );
};


const LoaderWrapper = styledComponent(Box)`
    div{
        animation:loadingRotate 800ms linear infinite;
    }   
    
    @keyframes loadingRotate{
    to{
        transform:rotateZ(-360deg);
    }
}
`

export default Loader;