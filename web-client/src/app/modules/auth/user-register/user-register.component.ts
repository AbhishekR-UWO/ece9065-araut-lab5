import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ApiServiceService } from '../../../service/api-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  user_email;
  user_fname;
  user_lname;
  user_country;
  user_password;
  user_cPassword;
  
  constructor(private apiServ: ApiServiceService, private router: Router, private toastr: ToastrService) { }
  
  userRegister(e) {
    if(this.user_password !== this.user_cPassword) {
      this.toastr.error(' Please confirm your password !!!');
    }else {
      let registerData = {
        email: this.user_email,
        password: this.user_password,
        fname: this.user_fname,
        lname: this.user_lname,
        country: this.user_country
      };
      
      this.apiServ.userRegister(registerData)
      .subscribe((data: any) => {
        if(data.success == false) {
          this.toastr.error(data.msg);
        }else {
          this.toastr.success(data.msg);
          this.router.navigate(['/auth/login']);
          registerData = null;
        }
      });
    }
  }
  
  
  
  ngOnInit() {
  }

}
