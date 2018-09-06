import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,AfterViewInit {

  constructor(public auth: AuthService, private elementRef: ElementRef) {
    
  }

  ngOnInit(){
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let links = document.getElementsByClassName('nav-link');
    console.log(links);
    for(let i = 0; i < links.length; i++)
      links[i].addEventListener('click',() => document.getElementById('buttonToggler').click());
  }
}
