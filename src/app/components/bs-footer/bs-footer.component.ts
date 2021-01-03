import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'bs-footer',
  templateUrl: './bs-footer.component.html',
  styleUrls: ['./bs-footer.component.css']
})
export class BsFooterComponent implements OnInit {
  formGroup: FormGroup;
  isShowLoader: boolean = false;
  public subscribedMessage: String= '';
  snackbar: any;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { 
    this.formGroup = new FormGroup({
      email: new FormControl('',[
        Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
      ])
    })
  }
  
  ngOnInit(): void {
  }
  
  get f() { return this.formGroup.controls; }

  onSubscribe(subscribeData) {
    this.submitted = true;
    this.isShowLoader = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.snackbar = document.getElementById("snackbar");
    this.subscribedMessage = '';
    var email = subscribeData['email'];
    this.api.SubscribeNewsletter(email).subscribe(
      data => {
        this.isShowLoader = false;
        this.snackbar.innerText = "You subscribed successfully."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      },
      error => {
        this.isShowLoader = false;
        this.snackbar.innerText = error.message
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    );
  }
}
