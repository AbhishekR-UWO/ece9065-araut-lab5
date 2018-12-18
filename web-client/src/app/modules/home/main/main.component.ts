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
  constructor(private router: Router, private toastr: ToastrService, private apiServ: ApiServiceService, private status: StatusService) { }
  
  // add to cart
  addtoCart(element) {
    console.log(element);
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
    console.log(element);
    this.status.wish_list = {};
    this.status.wish_list = element;
    this.toastr.info('Select Wish List');
    this.router.navigate(['/home/wish']);
  }
  
  // add comment 
  
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
        
        console.log(this.everything);
      }
    })
  }

}
