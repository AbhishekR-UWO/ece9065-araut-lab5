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
  
  // Add list
  wish_list_name;
  wish_list_desc;
  list_type;
  isPrivate;
  
  // search lists
  wishLists: any = [];
  
  // update list
  search_list;
  searchedItem: any = {};
  
  // get items from list
  search_wishes;
  getAllWishesArr = [];
  
  
  // get all public
  getPublicArr = [];
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
    this.wishLists = [];
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
  
  InsertIntoWC(el) {
    console.log(el);
    let itemAdd = this.status.wish_list;
    
    let items = {
      items: itemAdd,
      list_name: el.list_name
    };
    
    console.log(items);
    this.apiServ.addItemsToWish(items)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
      }
    });
  }
  
  removeWC(el) {
    this.apiServ.removeWC(el)
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
      }
    });
  }
  
  searchList(e) {
    this.apiServ.searchList(this.search_list)
    .subscribe((data: any) => {
      if(data.msg == false) {
        this.toastr.error(data.msg)
      }else {
        console.log(data.msg);
        this.searchedItem = data.msg;
      }
    });
  }
  
  updateList(e) {
    this.apiServ.updateList(this.searchedItem)
    .subscribe((data: any) => {
      if(data.msg == false) {
        this.toastr.error(data.msg);
      }else {
        this.toastr.success(data.msg);
      }
    });
  }
  
  getAllWishesFun(e) {
    this.getAllWishesArr = [];
    this.apiServ.getAllWishes()
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        console.log(data.msg);
        data.msg.forEach((element) => {
          this.getAllWishesArr.push(element)
        });
      }
    });
  }
  
  getPublic(e) {
    this.getPublicArr = [];
    this.apiServ.getPublic()
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        console.log(data.msg);
        data.msg.forEach((element) => {
          this.getPublicArr.push(element);
        });
      }
    });
  }
  
  ngOnInit() {
    if(!localStorage.getItem('jwt')) {
      this.router.navigate(['/home/main']);
    }
  }

}
