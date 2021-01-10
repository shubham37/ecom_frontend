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
  shipping: Number;
  seller: string;
  shop_name: string;
  seller_address: string;
  shipping_charge: Number;
  shipping_method: string;
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
    "sorting_options": [
      {value: '0', viewValue: 'Popularity'},
      {value: '1', viewValue: 'Newest First'},
      {value: '2', viewValue: 'Price Low to High'},
      {value: '3', viewValue: 'Price High to Low'},
      {value: '4', viewValue: 'Alphabet A to Z'},
      {value: '5', viewValue: 'Alphabet Z to A'}
    ]
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
      discount: product.discount_str || '',
      price: product.final_price,
      quantity: local_qty,
      final: product.final_price * local_qty,
      shipping: Number(product.shipping),
      seller: product.seller,
      shop_name: product.shop_name,
      seller_address: product.seller_address,
      shipping_charge: 0,
      shipping_method: '3'
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
         cart[product].final = cart[product].price * (currentQuantity + 1);
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
         cart[product].final = cart[product].price * (currentQuantity - 1);
         break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  calculatePrices(): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let total: any= 0;
    let shipping: any=0;
    for (var product in cart) {
        total = total + cart[product].final
        shipping = shipping + cart[product].shipping_charge
    }
    let prices = {
      'total': total,
      'tax': total * 0.18,
      'shipping': shipping,
      'coupon': 0,
      'final': total + (total * 0.18) + shipping
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
