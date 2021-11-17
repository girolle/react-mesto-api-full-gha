class Api {
    constructor({baseUrl, authorization}){
        this._baseUrl = baseUrl;
        this._authorization = authorization;
    }

    _checkResponse(res){
        if(res.ok){  
            return res.json();
            }
            return Promise.reject(res.status)
    }

    userServerInfo(){
       return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }

    editProfile(patchInquiry) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: patchInquiry
        })
        .then(this._checkResponse); 
    }

    addCard(postInquiry) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: postInquiry
        })
        .then(this._checkResponse);
    }

    deleteCard(delInquiry){
        return fetch(`${this._baseUrl}/cards/${delInquiry}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(inquiry, isLiked){
        if(isLiked){
            return fetch(`${this._baseUrl}/cards/${inquiry}/likes`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${this._authorization}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(this._checkResponse)
        }else{  
            return fetch(`${this._baseUrl}/cards/${inquiry}/likes`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${this._authorization}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(this._checkResponse)
        }
    }

    editAvatar(patchInquiry){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: patchInquiry
        })
        .then(this._checkResponse);
    }

}

  export default Api;