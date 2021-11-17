function PopupWithForm(props){
    return(
        <div className={`popup popup_type_${props.name} ${ props.isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__wrapper">
          <form className={`popup__container popup__container_${props.name}`} name={props.name} onSubmit={props.onSubmit} noValidate>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
          </form>
          <button className="popup__exit" type="button" 
          onClick={props.onClose}/> 
        </div>
      </div>

    )
}

export default PopupWithForm;