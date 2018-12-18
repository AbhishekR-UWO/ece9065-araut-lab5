import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service';


@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  
  wish_list_name;
  wish_list_desc;
  list_type;
  isPrivate;
  
  wishLists: any = [];
  constructor(private router: Router, private apiServ: ApiServiceService, private status: StatusService, private toastr: ToastrService) { }
  
  // create List
  createWishList(e) {
    if(this.list_type === 'private') {
      this.isPrivate = true;
    }else {
      this.isPrivate = false;
    }
    
    let wishList = {
      'list_name': this.wish_list_name,
      'list_desc': this.wish_list_desc,
      'isPrivate': this.isPrivate
    };
    
    this.apiServ.createWishList(wishList)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.info(data.msg);
      }else {
        this.toastr.info(data.msg);
      }
    })
  }
  
  
  searchAllWish(e) {
    this.apiServ.searchAllWish()
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.info(data.msg)
      }else {
        data.msg.forEach(element => {
          this.wishLists.push(element);
        });
      }
    });
  }
  
  selectWishList(element) {
    let itemAdd = [];
    this.status.wish_list.forEach((element) => {
      itemAdd.push(element);
    });
    
    let items = {
      items: itemAdd
    };
    
    
    this.apiServ.addItemsToWish(items)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
      }
    });
  }
  
  
  ngOnInit() {
    if(!localStorage.getItem('jwt')) {
      this.router.navigate(['/home/main']);
    }
  }

}
