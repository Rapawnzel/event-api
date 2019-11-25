import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-sponsor',
  templateUrl: './event-sponsor.component.html',
  styleUrls: ['./event-sponsor.component.scss']
})
export class EventSponsorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sponsor=[
    {
      img: 'assets/images/event/sponsor/1.png'
    },
    {
      img: 'assets/images/event/sponsor/2.png'
    },
    {
      img: 'assets/images/event/sponsor/3.png'
    },
    {
      img: 'assets/images/event/sponsor/4.png'
    },
    {
      img: 'assets/images/event/sponsor/5.png'
    },
    {
      img: 'assets/images/event/sponsor/6.png'
    },
    {
      img: 'assets/images/event/sponsor/7.png'
    },
    {
      img: 'assets/images/event/sponsor/8.png'
    },
    {
      img: 'assets/images/event/sponsor/9.png'
    },
    {
      img: 'assets/images/event/sponsor/10.png'
    },
    {
      img: 'assets/images/event/sponsor/11.png'
    },
    {
      img: 'assets/images/event/sponsor/12.png'
    }
]

}
