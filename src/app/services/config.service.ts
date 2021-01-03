import { Injectable } from '@angular/core';

interface Product {
  id: Number;
  title: string;
  image: string;
  mrp: Number;
  discount: string;
  price: Number;
  quantity: Number;
  final: Number;
}

interface PriceDetails {
  total: Number;
  discount: Number;
  tax: Number;
  final: Number;
}

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

  product: Product;
  price: PriceDetails;

  constructor() { }

  public get(key: any) {
    return this._baseConfig[key];
  }

  public getLanguages() {
    return this._languages;
  }

  addToCart(product: any, qty: number = 0): string {
    let ne = true;
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      cart.forEach(function(item: { id: any; }) {
        if (Number(item.id) === Number(product.id)) {
          ne = false
        }
      })
    } else {
      cart = []
    }
    if (!ne) {
      return "Already Exist In Cart";
    }
    let local_qty = 1
    if (qty > 0) {
      local_qty = qty
    }
    this.product = {
      id: Number(product.id),
      title: product.title,
      image: product.image,
      mrp: product.mrp,
      discount: '15 %',
      price: product.mrp,
      quantity: local_qty,
      final: product.mrp * local_qty
    }
    cart.push(this.product);

    localStorage.setItem('cart', JSON.stringify(cart))
    return "Added Successfully"
  }

  removeFromCart(proId: any) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && cart != null && cart !=undefined) {
      var newCart = cart.filter(function (product: { id: any; }, index: any, arr: any) {
        return product.id != proId
      })
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  incrementQuantity(productId: any, currentQuantity: number): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    for (var product in cart) {
      if (cart[product].id === productId) {
         cart[product].quantity = currentQuantity + 1;
         cart[product].final = cart[product].mrp * (currentQuantity + 1);
         break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  decrementQuantity(productId: any, currentQuantity: number): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    for (var product in cart) {
      if (cart[product].id === productId) {
         cart[product].quantity = currentQuantity - 1;
         cart[product].final = cart[product].mrp * (currentQuantity - 1);
         break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  calculatePrices(): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let total: any= 0;
    for (var product in cart) {
        total = total + cart[product].final
    }
    let prices = {
      'total': total,
      'tax': total * 0.18,
      'shipping': 0,
      'coupon': 0,
      'final': total + (total * 0.18)
    }
    localStorage.setItem('prices', JSON.stringify(prices));
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

  alreadyInCart(productId): number {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let qty = 0;
    if (cart && cart != null && cart !=undefined) {
      cart.forEach(function(item: { id: any; quantity: any; }) {
        if (Number(item.id) === Number(productId)) {
          qty = item.quantity;
        }
      })
    }
    return qty;
  }

}
