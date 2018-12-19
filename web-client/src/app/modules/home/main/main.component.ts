import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  everything: any = [];
  
  //add comment;
  addComment = '';
  addRating = 0;
  
  // show comments;
  allComments = [];
  constructor(private router: Router, private toastr: ToastrService, private apiServ: ApiServiceService, private status: StatusService) { }
  
  //getAll
  getAll(e) {
    this.everything = [];
    this.apiServ.getAll()
    .subscribe((data: any) => {
      if(data.success === false) {
        this.toastr.error(data.msg)
      }else {
        data.msg.forEach(element => {
          this.everything.push(element);
        });
        
        
      }
    });
  }
  
  // add to cart
  addtoCart(element) {
    
    this.apiServ.addtoCart(element)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg)
      }
    })
  }
  
  // add to wish list
  addtoWC(element) {
    
    this.status.wish_list = {};
    this.status.wish_list = element;
    this.toastr.info('Select Wish List');
    this.router.navigate(['/home/wish']);
  }
  
  // add comment 
  addCommentFun(element) {
    if(!this.addComment && !this.addRating) {
      this.toastr.error('Comment/Rating cannot be empty')
    }else {
      let addComm = {
      comment: this.addComment,
      rating: this.addRating,
      item: element.item_name
    };
    //console.log(addComm)
    this.apiServ.postComment(addComm)
    .subscribe((data: any) => {
      if(data.success ==false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg)
        this.addComment = '';
        this.addRating = 0;
      }
    });
    }
  }
  
  showComment(element) {
    this.allComments = [];
    this.apiServ.showComments(element.item_name)
    .subscribe((data:any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        console.log(data.msg);
        data.msg.forEach((element) => {
          this.allComments.push(element)
        });
      }
    })
  }
  
  ngOnInit() {
    this.everything = [];
    this.apiServ.getAll()
    .subscribe((data: any) => {
      if(data.success === false) {
        this.toastr.error(data.msg)
      }else {
        
        data.msg.forEach(element => {
          this.everything.push(element);
        });
        
      }
    });
  }

}
