import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  number:number = 0;

  ngOnInit(): void {
    console.log(this.number);
    
  }
  title = 'User Manger App';
 
}
