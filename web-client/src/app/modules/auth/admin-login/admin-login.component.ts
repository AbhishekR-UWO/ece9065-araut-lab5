import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../service/api-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  admin_email;
  admin_password;
  constructor(private apiServ: ApiServiceService) { }
  
  submitAdminLogin(e) {
    let loginData = {
      email: this.admin_email,
      password: this.admin_password
    };
    console.log('ts ', this.admin_email + this.admin_password);
    this.apiServ.adminLogin(loginData)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  ngOnInit() {
  }

}
