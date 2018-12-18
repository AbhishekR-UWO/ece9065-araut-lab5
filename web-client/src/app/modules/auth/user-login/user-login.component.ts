import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  user_login_email;
  user_login_password;
  constructor(private router: Router, private toastr: ToastrService, private apiServ: ApiServiceService) { }
  
  userLogin(e) {
    if(!this.user_login_email || !this.user_login_password) {
      this.toastr.error(' Please enter email and/or Password');
    }else {
    let userLoginData = {
      email: this.user_login_email,
      password: this.user_login_password
    };
    
    this.apiServ.userLogin(userLoginData)
    .subscribe((data: any) => {
      if(data.success === false) {
        this.toastr.error(data.msg)
      }else {
        
        
        this.toastr.success(' Logged In Successfully !!');
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/home/main']);
        
      }
    });
  }
  }
  
  goHome(e) {
    this.router.navigate(['/home']);
  }
  
  ngOnInit() {
    
    if(localStorage.getItem('jwt')) {
      console.log(localStorage.getItem('jwt'));
      this.router.navigate(['/home/main']);
    }
  }

}
