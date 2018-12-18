import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-item-fun',
  templateUrl: './admin-item-fun.component.html',
  styleUrls: ['./admin-item-fun.component.scss']
})
export class AdminItemFunComponent implements OnInit {
  
  // Add
  add_item_name;
  add_item_price;
  add_item_tax;
  add_item_avail;
  add_item_desc;
  
  // Update
  search_game;
  searchedItem: any = {};
  
  // delete item
  del_search;
  delItem: any = {};
  
  constructor(private apiServ: ApiServiceService, private toastr: ToastrService, private router: Router) { }
  
  // Add item function
  saveNewItem(e) {
    let newItem = {
      item_name: this.add_item_name,
      price: parseInt(this.add_item_price),
      tax: parseInt(this.add_item_tax),
      avail: parseInt(this.add_item_avail),
      desc: this.add_item_desc
    };
    
    this.apiServ.addItem(newItem)
    .subscribe((data: any) => {
      if(data.success === false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
        this.add_item_name = '';
        this.add_item_avail = 0;
        this.add_item_price = 0;
        this.add_item_desc = '';
        this.add_item_tax = 0;
        
      }
    })
  }
  
  // Update Item Function
  //search
  searchGame(e) {
    this.apiServ.searchGame(this.search_game)
    .subscribe((data: any) => {
      if(data.success === false) {
        this.toastr.error(data.msg)
      }else {
        this.searchedItem = data.msg;
        console.log(this.searchedItem);
      }
    })
  }
  
  updateItem(e) {
    this.apiServ.updateItem(this.searchedItem)
    .subscribe((data: any) => {
      if(data.success === false) {
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
        this.searchedItem = {};
      }
    })
  }
  
  // Delete item
  // search
  delGameSearch(e) {
    this.apiServ.searchGame(this.del_search)
    .subscribe((data: any) => {
      if(data.success === false) {
        this.searchedItem = {};
        this.toastr.error(data.msg)
      }else {
        this.delItem = data.msg;
        console.log(this.delItem);
      }
    });
  }
  
  //delete
  deleteItem(e) {
    this.apiServ.deleteItem(this.delItem)
    .subscribe((data: any) => {
      if(data.success === false) {
        this.delItem = {};
        this.toastr.error(data.msg)
      }else {
        this.toastr.success(data.msg);
        this.delItem = {};
      }
  });
  }
  
  ngOnInit() {
    this.searchedItem.name = '';
    if(!localStorage.getItem('jwt') || !localStorage.getItem('isAdmin')) {
      this.router.navigate(['/home']);
    }
  }

}
