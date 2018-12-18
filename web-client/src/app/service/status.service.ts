import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  wish_list: any = [];
  constructor() { }
}
