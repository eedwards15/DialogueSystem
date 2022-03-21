import {Component, HostListener, OnInit} from '@angular/core';
import {Character} from "../models/Character";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  public IsActive:boolean
  public ListOfCharacters: Character[]

  constructor( ) {
    this.IsActive = false
    this.ListOfCharacters = []
  }

  ngOnInit(): void {
    this.IsActive = false
    let test = new Character("Test")
    this.ListOfCharacters.push(test)





  }






  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;

    if(key == "c")
    {
      this.IsActive = !this.IsActive
    }
  }

}
