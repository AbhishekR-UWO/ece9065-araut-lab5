import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main-fun',
  templateUrl: './admin-main-fun.component.html',
  styleUrls: ['./admin-main-fun.component.scss']
})
export class AdminMainFunComponent implements OnInit {
  
  // Activate, Deavtivate
  search_user;
  searchedUser = {};
  
  //comment hide
  search_user_comment;
  search_item_comment;
  searchedComment = {};
  constructor(private apiServ: ApiServiceService, private toastr: ToastrService, private router: Router) { }
  
  searchUser(e) {
    this.searchedUser = {};
    this.apiServ.searchUser(this.search_user)
    .subscribe((data: any) => {
      if(data.msg == false) {
        this.toastr.error(data.msg)
      }else {
        this.searchedUser = data.msg;
        console.log(this.searchedUser)
      }
    })
  } 
  
  changeUser(e) {
    this.apiServ.changeUser(this.searchedUser)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg)
      }
    });
  }
  
  searchUserComment(e) {
    this.searchedComment = {};
    let search = {
      email: this.search_user_comment,
      item: this.search_item_comment
    };
    
    this.apiServ.searchCommentToHide(search)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        data.msg.forEach((element) => {
          this.searchedComment = element;
        });
      }
    });
  }
  
  changeComment(e) {
    console.log(this.searchedComment)
    this.apiServ.changeComment(this.searchedComment)
    .subscribe((data: any) => {
      if(data.success ==false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
      }
    });
  }
  
  ngOnInit() {
    if(!localStorage.getItem('jwt') || !localStorage.getItem('isAdmin')) {
      this.router.navigate(['/home']);
    }
  }

}
