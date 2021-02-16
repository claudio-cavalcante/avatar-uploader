import attentionIcon from '../images/attention-icon.svg';

interface AvatarProps {
    image?: string,
    zoom: number
}

const Avatar = (props: AvatarProps) => {

    return (
    <div className="uploaded-image__container">
        {
            props.image !== '' ?

            <img className="uploaded-avatar" style={{transform: `scale(${props.zoom})`}} src={props.image} alt="uploaded avatar"/> :

            <img className="attention-icon" src={attentionIcon} alt="attention icon" />             
        }
        
    </div>);
}

export default Avatar;