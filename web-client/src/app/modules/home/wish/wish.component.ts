import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('jwt')) {
      this.router.navigate(['/home/main']);
    }
  }

}
