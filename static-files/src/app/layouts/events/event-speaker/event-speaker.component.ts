import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-speaker',
  templateUrl: './event-speaker.component.html',
  styleUrls: ['./event-speaker.component.scss']
})
export class EventSpeakerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  experts = [
    { 
     img:"assets/images/event/l3-1.png",
     name:"Vicky Smith",
     designation:"UI/UX Designer - Little Big"
    },
    { 
      img:"assets/images/event/l3-2.png",
      name:"Sam Rowling",
      designation:"Team Leader - otstrab"
     },
     { 
      img:"assets/images/event/l3-3.png",
      name:"Mark Tucker",
      designation:"App Developer - Jumpster"
     },
     { 
      img:"assets/images/event/l3-4.png",
      name:"Sam Rowling",
      designation:"Team Leader - otstrab"
     }
  ]

}
