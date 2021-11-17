function ImagePopup(props) {
    return(
        <div className={`popup popup_type_cardZoom ${ props.card ? 'popup_opened' : ''}`} >
          <div className="popup__wrapper">
            <div className="popup__image-wrapper">
              <img className="popup__main-image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
              <p className="popup__subtitle">{props.card ? props.card.name : ''}</p>
            </div>
            <button className="popup__exit" type="button" 
            onClick={props.onClose}/>
          </div>
        </div>
    )
}

export default ImagePopup;