import { Slider, withStyles } from '@material-ui/core';
import React, { Fragment } from 'react';

const CustomSlider = withStyles({
    root: {
        color: '#3F80FF'
    }
})(Slider);

interface UploadCropProps {
    save(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    zoom: number;
    onZoomChange(zoom:number | number[]):void;
}

const Cropper = (props: UploadCropProps) => {

    const handleClickSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        props.save(e);
    }

    return (
    <Fragment>
        <div className="crop-container">
            <label className="crop-title">Crop</label>
            <CustomSlider value={props.zoom} min={1} max={100} onClick={(e) => e.stopPropagation()} onChange={(e, zoom) => props.onZoomChange(zoom)}/>                
        </div>
        <div>
            <button className="btn-save" onClick={(e) => handleClickSave(e)}>Save</button>
        </div>
    </Fragment>)
}

export default Cropper;