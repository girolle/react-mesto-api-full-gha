import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props){

    const avatarRef = React.useRef('');
    
    
    React.useEffect(() => {
      avatarRef.current.value='';
    }, [props.isOpen]);

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value, 
        });
    }

   return( <PopupWithForm  
    isOpen={props.isOpen}
    onClose={props.onClose}
    name='avatarEdit'
    title='Обновить аватар'
    children={
   <>
      <input id="avatar-link-input" className="popup__input popup__input_avatar-link" ref={avatarRef} placeholder="Ссылка на картинку" name="avatar" type="url" required />
      <span className="avatar-link-input-error popup__input-error" />
      <button className="popup__save" type="submit" onClick={handleSubmit}>Сохранить</button>
    </>
  }
    />
   )
}