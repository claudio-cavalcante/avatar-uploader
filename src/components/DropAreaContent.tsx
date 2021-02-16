import logo from '../images/organization-logo.svg';

const DropAreaContent = () => {
    return (
    <div className="drop-area">        
        <div className="drop-area-organization">
            <span className="drop-area-icon__wrapper">
                <img className="drop-area-icon" src={logo} alt="organization logo"/>
            </span>
            <span>Organization logo</span>
        </div>
        <div className="drop-area-message">
            Drop the image here or click to browse.
        </div>
    </div>
  )
}

export default DropAreaContent;