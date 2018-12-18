import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiServiceService } from '../../../service/api-service.service';
import { StatusService } from '../../../service/status.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cart:any = [];
  gTotal;
  constructor(private router: Router, private apiServ: ApiServiceService, private status: StatusService, private toastr: ToastrService) { }
  
  checkPrice(ele) {
    let total = (ele.buy*ele.item_price) + (ele.item_price*(ele.item_tax/100));
    this.toastr.info(ele.buy + ' quantity of ' + ele.item_name + ' will cost CAD '  + total +  ' including taxes');
    
    this.gTotal += total;
  }
  
  // buyNow(e) {
    
  // }
  
  
  ngOnInit() {
    if(!localStorage.getItem('jwt')) {
      this.router.navigate(['/home/main']);
    }
    
    this.apiServ.getCart()
    .subscribe((data: any) => {
      if(data.success == false) {
        this.toastr.error(data.msg)
      }else {
        this.cart = [];
        data.msg.forEach((element) => {
          this.cart.push(element);
        })
      }
      console.log(this.cart);
    })
  }

}
