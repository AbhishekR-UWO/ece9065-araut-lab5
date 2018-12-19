import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    })
  };
  
const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  })
};

  
  
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  server = 'https://ece9065-araut4-lab5-araut4.c9users.io:8080';
  
  constructor(private _http: HttpClient) { }
  
  
  adminLogin(loginData: any) {
    return this._http.post(this.server + '/admin_login', loginData)
  }
  
  userRegister(registerData: any) {
    return this._http.post(this.server + '/register', registerData)
  }
  
  userLogin(userLoginData: any) {
    return this._http.post(this.server + '/login', userLoginData)
  }
  
  addItem(newItem: any) {
    return this._http.post(this.server + '/add_item', newItem, httpOptions)
  }
  
  searchGame(search_game: any) {
    return this._http.post(this.server + '/search_game', {'search_game': search_game} , httpOptions)
  }
  
  updateItem(searchedItem: any) {
    return this._http.post(this.server + '/update_item', searchedItem, httpOptions)
  }
  
  deleteItem(delItem: any) {
    return this._http.post(this.server + '/delete_item', delItem, httpOptions)
  }
  
  getAll() {
    return this._http.get(this.server + '/getAll')
  }
  
  createWishList(wishList: any) {
    return this._http.post(this.server + '/create_wish_list', wishList, httpOptions)
  }
  
  searchAllWish() {
    return this._http.get(this.server + '/search_all_wish', httpOptions)
  }
  addItemsToWish(items: any) {
    return this._http.post(this.server + '/add_to_wish', items, httpOptions)
  }
  
  removeWC(el: any) {
    return this._http.post(this.server + '/delete_wish', el, httpOptions)
  }
  
  searchList(search) {
    return this._http.post(this.server + '/search_list', {list_name: search}, httpOptions)
  }
  
  updateList(element: any) {
    return this._http.post(this.server + '/update_list', element, httpOptions)
  }
  
  addtoCart(element: any) {
    return this._http.post(this.server + '/addtoCart', element, httpOptions)
  }
  
  getCart() {
    return this._http.get(this.server + '/getCart', httpOptions)
  }
  
  getAllWishes() {
    return this._http.get(this.server + '/getAllWishes', httpOptions)
  }
  
  getPublic() {
    return this._http.get(this.server + '/getPublic', httpOptions)
  }
  
  postComment(itemComm: any) {
    //console.log(itemComm)
    return this._http.post(this.server + '/addComment', itemComm, httpOptions)
  }
  
  showComments(element: any) {
    //console.log(element);
    return this._http.post(this.server + '/showComments', {item: element})
  }
}



