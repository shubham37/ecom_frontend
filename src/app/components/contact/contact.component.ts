import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formGroup;
  public isShowLoader: boolean = false;
  public subscribedMessage: String= '';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: '',
      comment: '',
    });
  }

  get f() { return this.formGroup.controls; }

  onSubmit(contactData) {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.subscribedMessage = '';
    this.isShowLoader = true;
    this.api.customerQuery(contactData).subscribe(
      data => {
        this.isShowLoader = false;
        this.subscribedMessage = "You Query Send successfully."
      },
      error => {
        this.isShowLoader = false;
        this.subscribedMessage = "Please Try Again"
        console.log(error);
      }
    )

    // this.route.navigate(['/search'], { queryParams: { value: 'popular' } });
  }

}
