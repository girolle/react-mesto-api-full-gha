import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props){
    const userInfo = React.useContext(CurrentUserContext);

    const[name, setName] = React.useState('');
    const[description, setDescription] = React.useState('');

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateUser({
            name: name, 
            about: description,
        })
    }

    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(userInfo.name || '');
        setDescription(userInfo.about || '');
    }, [userInfo, props.isOpen]);

    return(
        <PopupWithForm 
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            name='profileEdit'
            title='Редактировать профиль'
            children={
            <>
            <input id="name-input" className="popup__input popup__input_name" placeholder="Имя" name="name" type="text" value={name} onChange={handleNameChange} minLength="2" maxLength="40" required />
            <span className="name-input-error popup__input-error" />
            <input id="status-input" className="popup__input popup__input_status" placeholder="О себе" name="about" value={description} onChange={handleDescriptionChange} type="text" minLength="2" maxLength="200" required />
            <span className="status-input-error popup__input-error" />
            <button className="popup__save" type="submit">Сохранить</button>
            </>
            }
        />
    )
}