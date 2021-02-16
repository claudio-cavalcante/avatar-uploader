import React from 'react';
import closeIcon from '../images/close-icon.svg';
import AvatarUploaderEdition from './AvatarUploaderEdition';

interface AvatarUploadState {
    image: string,
    isEditing: boolean
}

class AvatarUploader extends React.Component<any, AvatarUploadState> {

    private dropRef: React.RefObject<HTMLDivElement>;
    private fileUploadRef: React.RefObject<HTMLInputElement>;

    constructor(props:any){
        super(props)
        this.state = {
            image: '',
            isEditing: false
        }

        this.handleClickAvatarUpload = this.handleClickAvatarUpload.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.triggerClickAvatarUpload = this.triggerClickAvatarUpload.bind(this);

        this.dropRef = React.createRef<HTMLDivElement>();
        this.fileUploadRef = React.createRef<HTMLInputElement>();
    }   

     componentDidMount(){
        this.dropRef.current?.addEventListener('dragover', (e: Event) => { 
            e.preventDefault();
            e.stopPropagation();
        });

        this.dropRef.current?.addEventListener('drop', (e) => { 
            e.preventDefault();
            e.stopPropagation();

            if(this.state.isEditing){
                return false;
            }

            if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer?.files[0];

                this.handleLoadImage(file);

                e.dataTransfer?.clearData();   
            }
        });
     }

     componentWillUnmount(){
        this.dropRef.current?.removeEventListener('drop', () => {});
     }

     triggerClickAvatarUpload(){
        this.fileUploadRef?.current?.click();
     }

     handleClickAvatarUpload(){
        if(!this.state.isEditing){
           this.triggerClickAvatarUpload();
        }        
    }    

    fileIsValid(file: any){
       var fileType = file["type"];;
       var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
       
       return validImageTypes.indexOf(fileType) !== -1;
    }

    handleLoadImage(file: any){
        debugger;
        
        if(!this.fileIsValid(file)){
           this.setState({isEditing: true, image: ''});

           return;
        }

       var reader = new FileReader();

       const _this = this;
       reader.onload = (function (tFile) {
           return (evt:any) => { _this.setState({ isEditing: true, image: evt.target.result }); }
       }(file));

       reader.readAsDataURL(file);
    }

     handleClickClose(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation(); 

        this.setState({ isEditing: false, image: ''})
     }

     handleClickSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation(); 

        this.setState({ isEditing: false});
     }

     handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files =  e.currentTarget.files;

        if (files?.length) {
            this.handleLoadImage(files[0]);
        }
     }

     getAvatarUploadStyle(){
        const avatarUploadStyle:React.CSSProperties = { 
            border: !this.state.isEditing ? '2px dashed #C7CDD3' : 'none',
            cursor: !this.state.isEditing ? 'pointer' : 'default'
         };  

         return avatarUploadStyle;
     }

     render(){  

        const { isEditing, image } = this.state;

        const avatarUploadStyle = this.getAvatarUploadStyle();        

        return (
        <div className="avatar-upload" style={avatarUploadStyle} ref={this.dropRef} onClick={this.handleClickAvatarUpload}>

            <input type="file" className="file-upload" ref={this.fileUploadRef} onChange={this.handleFileUpload}/>
                    
            <AvatarUploaderEdition 
                isEditing={isEditing}
                image={image} 
                save={(e) => this.handleClickSave(e)} 
                uploadFile={() => this.triggerClickAvatarUpload()}
                />               
            
            {
                isEditing && 
                <button className="btn-close" onClick={(e) => this.handleClickClose(e)}>
                    <img src={closeIcon} alt="close icon"/>
                </button>
            }                      
        </div>)
     }    
}

export default AvatarUploader;