import {Component, HostListener, OnInit} from '@angular/core';
import {DialogueState} from "../../Globals/DialogueState";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css']
})
export class FileManagementComponent implements OnInit {
  public downloadJsonHref: SafeUrl;
  public IsActive:boolean
  public JsonFormat: string;

  constructor(private sanitizer: DomSanitizer, private State:DialogueState){
    this.IsActive = false;
    this.JsonFormat = "";
  }

  ngOnInit(): void {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    if((event.ctrlKey || event.metaKey) && key == "d"){

      this.IsActive = !this.IsActive;

      var theJSON = JSON.stringify(this.State.GetAll());
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
      this.JsonFormat = theJSON


    }
  }

}
