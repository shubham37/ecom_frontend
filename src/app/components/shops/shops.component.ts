import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service'

declare const L:any;

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  stores: Object[] = [];
  show_stores : Object[] = [];
  pincode = '';
  snackbar: any;
  current_st = '0';
  current_dt = '0';
  current_d = '3';

  store_type = [
    {display: 'Store Type', value: '0'},
    {display: 'Retailer', value: '1'},
    {display: 'Distributor', value: '2'},
    {display: 'Whole Seller', value: '3'}
  ]

  delivery_type = [
    {display: 'Delivery Type', value: '0'},
    {display: 'Only Delivery', value: '1'},
    {display: 'Only Pickup', value: '2'},
    {display: 'Both', value: '3'}
  ]

  distance = [
    {display: 'Within 3KM', value: '3'},
    {display: 'Within 5KM', value: '5'},
    {display: 'Within 10KM', value: '10'}
  ]

  // l: any;
  constructor(private sellerApi: SellerService) { 
    this.stores = []
   }

  ngOnInit(): void {
    this.snackbar = document.getElementById("snackbar");
    
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      let mymap = L.map('mapid').setView([coords.latitude, coords.longitude], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2h1YmhhbTM3IiwiYSI6ImNramx0OHBxaTByYmUyc3MydG1lZTZqZGUifQ.rc9s5YFOQOMzq4dE2PfPDw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);
      var marker = L.marker([coords.latitude, coords.longitude]).addTo(mymap);
      marker.bindPopup("I am here.")
    })
  }

  findByPincode(pincode: string): void {
    this.sellerApi.sellersByPincode(pincode).subscribe(
      data => {
        if (data != null) {
          this.stores = data
          this.show_stores = data
        } else {
          this.stores = []
          this.snackbar.innerText = 'No Store For This Search.'
          this.snackbar.className = "show";
          setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
        }
      }, error => {
        this.snackbar.innerText = error
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);}
    )
  }

  onSTChange(store_type: string) {
    this.current_st = store_type
    this.applyFilter();
  }


  onDTChange(delivery_type: string) {
    this.current_dt = delivery_type
    this.applyFilter();
  }


  onDChange(distance: string) {
    this.current_d = distance
  }

  applyFilter(): any {
    if ( Number(this.current_st) === 0 && Number(this.current_dt) != 0) {
      const newSores = this.stores.filter((store: any) => store.category == this.current_dt)
      this.show_stores = Object.assign([], newSores)

    } else if (Number(this.current_dt) === 0 && Number(this.current_st) != 0) {
      const newSores = this.stores.filter((store: any) => store.role == this.current_st)
      this.show_stores = Object.assign([], newSores)

    } else if (Number(this.current_dt) != 0 && Number(this.current_st) != 0) {
      // debugger
      const newSores = this.stores.filter((store: any) => store.category == this.current_dt && store.role == this.current_st)  
      this.show_stores = Object.assign([], newSores)

    } else {
      this.show_stores = Object.assign([], this.stores)
    }
  }


}
