import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props){
    const[namePlace, setNamePlace] = React.useState('');
    const[linkPlace, setLinkPlace] = React.useState('');

    React.useEffect(() => {
        setNamePlace('');
        setLinkPlace('');
    }, [props.isOpen]);

    function handleAddPlaceSubmit(e){
        e.preventDefault();
        props.onUpdatePlace({
            name: namePlace, 
            link: linkPlace,
        })
    }

    function handleNamePlaceChange(e){
        setNamePlace(e.target.value);
    }

    function handleLinkPlaceChange(e){
        setLinkPlace(e.target.value);
    }

    return(
        <PopupWithForm
            onClose={props.onClose}
            name='placeAdd'
            title='Новое место'
            isOpen={props.isOpen}
            children={
            <>
            <input id="place-name-input" className="popup__input popup__input_place-name" value={namePlace} onChange={handleNamePlaceChange} placeholder="Название" name="name" type="text" minLength="2" maxLength="30" required />
            <span className="place-name-input-error popup__input-error" />
            <input id="place-link-input" className="popup__input popup__input_place-link" value={linkPlace} onChange={handleLinkPlaceChange} placeholder="Ссылка на картинку" name="link" type="url" required />
            <span className="place-link-input-error popup__input-error" />
            <button className="popup__save" type="submit" onClick={handleAddPlaceSubmit}>Создать</button>
            </>}
        />
    )
}