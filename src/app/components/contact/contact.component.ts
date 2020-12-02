import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private api: ApiService) { 
    this.formGroup = this.formBuilder.group({
      name: '',
      email: '',
      subject: '',
      comment: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(contactData) {
    this.subscribedMessage = '';
    this.isShowLoader = true;
    this.api.customerQuery(contactData).subscribe(
      data => {
        this.isShowLoader = false;
        this.subscribedMessage = "You Query Send successfully."
        console.log(data)
      },
      error => {
        this.isShowLoader = false;
        this.subscribedMessage = "Please Try Again"
        console.log(error);
      }
    )

    console.log(name);
    // this.route.navigate(['/search'], { queryParams: { value: 'popular' } });
  }

}
