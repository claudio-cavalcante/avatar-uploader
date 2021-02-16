interface UploadErrorProps{
    uploadFile():void
}

const UploadErrorContent = (props: UploadErrorProps) => {
    return (                 
        <div className="upload-error-content">
            <label className="upload-error-message">Sorry, the upload failed.</label>
            <button className="upload-error-link" onClick={() => props.uploadFile() }>Try, again</button>
        </div>     
    )
}

export default UploadErrorContent;