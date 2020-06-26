import React from 'react';

export const Camera = (props: any) => {
    return (
        <img className="App-logo" src={`${process.env.REACT_APP_CAM_API}/video?action=stream`} alt="Camera" />
    );
}
