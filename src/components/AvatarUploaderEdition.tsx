import React from "react";
import UploadErrorContent from './UploadErrorContent';
import DropAreaContent from './DropAreaContent';
import Avatar from "./Avatar";
import Cropper from "./Cropper";
interface UploadEditionState {
    zoom: number
}

interface UploadEditionProps {
    isEditing: boolean,
    image?: string,
    save(e: React.MouseEvent<HTMLButtonElement, MouseEvent>):void,
    uploadFile():void
}

class AvatarUploaderEdition extends React.Component<UploadEditionProps, UploadEditionState>  {   

    constructor(props: UploadEditionProps){
        super(props);

        this.onZoomChange = this.onZoomChange.bind(this);
        this.state = {
            zoom: 1
        }
    }

    onZoomChange(zoom:number){
        this.setState({zoom});
    }

    imageWasUploaded(){
        return this.props.isEditing && this.props.image !== '';
    }

    imageWasNotUploaded(){
        return this.props.isEditing && this.props.image === '';
    }

    isInEditionOrHasImage(){
        return (this.props.isEditing || this.props.image !== "");
    }

    render(){
        return (
            <div className="upload-edition__container">
                {
                    this.isInEditionOrHasImage() &&
                    <Avatar 
                        image={this.props.image} 
                        zoom={this.state.zoom}
                        /> 
                }           
                     
                { 
                    this.imageWasUploaded() && 
                    <Cropper 
                        save={this.props.save} 
                        onZoomChange={this.onZoomChange} 
                        zoom={this.state.zoom}
                        />
                }

                {
                    this.imageWasNotUploaded() && 
                    <UploadErrorContent 
                        uploadFile={this.props.uploadFile}
                        />   
                }                                     
                
                {
                    !this.props.isEditing && <DropAreaContent />
                }
                
            </div>
            );
    } 
}

export default AvatarUploaderEdition;