import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StatusService } from '../../../service/status.service';


@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private status: StatusService) { }
  
  logout(e) {
    if(!localStorage.getItem('jwt')) {
      this.toastr.error('Already Logged Out !!');
    }else {
    localStorage.clear();
    this.status.wish_list = {};
    this.toastr.info(' Logout Successfull !');
    this.router.navigate(['/home']);
    }
  }
  ngOnInit() {
  }

}
