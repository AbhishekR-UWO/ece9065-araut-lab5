import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service';


import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  admin_email;
  admin_password;
  constructor(private apiServ: ApiServiceService, private router: Router, private toastr: ToastrService) { }
  
  submitAdminLogin(e) {
    let loginData = {
      email: this.admin_email,
      password: this.admin_password
    };
    this.apiServ.adminLogin(loginData)
    .subscribe((data: any) => {
      if(data.success === true) {
        this.toastr.success(' Admin Logged In Sucessfully');
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('isAdmin', 'true');
        
        loginData = null;
        this.router.navigate(['/home/main']);
      }else {
        this.toastr.error(data.msg);
      }
    });
  }

  ngOnInit() {
  }
  

}
