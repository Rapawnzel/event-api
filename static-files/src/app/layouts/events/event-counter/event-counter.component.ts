import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-counter',
  templateUrl: './event-counter.component.html',
  styleUrls: ['./event-counter.component.scss']
})
export class EventCounterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  counter = [
    {
      count:'22',
      img:'assets/images/event/counter/1.png',
      type:'Total Topics'
    },
    {
      count:'500',
      img:'assets/images/event/counter/2.png',
      type:'TOTAL SPEAKER'
    },
    {
      count:'265',
      img:'assets/images/event/counter/3.png',
      type:'TOTAL EVENT'
    },
    {
      count:'5698',
      img:'assets/images/event/counter/4.png',
      type:'TOTAL ATTENDANCE'
    }]
}
