import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _baseConfig: any = {
    "baseUrl": "http://localhost:8000",
  }

  private _languages = [
    { 'key': 'en', 'value': 'EN' },
    { 'key': 'bn', 'value': 'BN' },
    { 'key': 'hi', 'value': 'HI' },
    { 'key': 'ta', 'value': 'TA' },
    { 'key': 'te', 'value': 'TE' },
    { 'key': 'gu', 'value': 'GU' },
  ]

  constructor() { }

  public get(key: any) {
    return this._baseConfig[key];
  }

  public getLanguages() {
    return this._languages;
  }

  addToCart(product) {
    // Check is already in cart
    // Add if Not
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {      
      cart.push(product)
    } else {
      cart = []
      cart.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token && token != null && token != undefined) {
      return true;
    } else {
      localStorage.removeItem('token');
      return false;
    }
  }

}
