import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  OnInit, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DialogueWindow} from "../Directives/DialogueWindow";
import {DialogWindowComponent} from "../dialog-window/dialog-window.component";
import {Dialogue} from "../models/dialogue";
import { Guid } from "guid-typescript";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import * as fromStore from '../../reducers/';
import {GetAll, Processed} from "../../actions/dialogue.actions";
import {DialogueState} from "../../Globals/DialogueState";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@ViewChild('container', { read: ViewContainerRef })
  @ViewChild("svg1", { static: true }) svg1: ElementRef;

  container!: ViewContainerRef;
  public IsActive:boolean
  public dialoguesSub: Subscription;
  public State:DialogueState
  private downloadJsonHref: SafeUrl;

  constructor(private store:Store<any>, private renderer2: Renderer2, state: DialogueState, private sanitizer: DomSanitizer) {
    this.IsActive = false

    this.State = state;

  }

  ngOnInit(): void {
    this.IsActive = false

    this.dialoguesSub = this.store.pipe(select(fromStore.Redraw)).subscribe((data) =>{
      if(data != null){

        document.getElementById("svg1").innerHTML=" "

       let temp = this.State.GetAll();


        for (let i = 0; i < temp.length; i++) {
          let parent = temp[i];

          for (let j = 0; j < parent.ChildrenNodes.length; j++) {
            let child = this.State.SelectDialogueAction(parent.ChildrenNodes[j]);

            const svgLine: SVGLineElement = this.renderer2.createElement("line", this.svg1.nativeElement.namespaceURI);
            svgLine.setAttributeNS(null, "x1",  (parent.Xpos + this.State.DialogueWindowWidth).toString());
            svgLine.setAttributeNS(null, "y1", (parent.Ypos + (this.State.DialogueWindowHeight/2)).toString());
            svgLine.setAttributeNS(null, "x2",  (child.Xpos + 10).toString());
            svgLine.setAttributeNS(null, "y2", (child.Ypos + (this.State.DialogueWindowHeight/2)).toString());
            svgLine.setAttributeNS(null, "stroke", "red");
            svgLine.setAttributeNS(null, "stroke-width", "5");
            this.svg1.nativeElement.appendChild(svgLine);

          }

        }
        this.store.dispatch(Processed());
      }
    });

  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;


    if((event.ctrlKey || event.metaKey) && event.key == "n")
    {
      let guid =  Guid.create().toString();
      let d = new Dialogue(guid,0,0, guid)
      this.State.AppendDialogueAction(d);
      this.store.dispatch(GetAll());
    }



  }




}
