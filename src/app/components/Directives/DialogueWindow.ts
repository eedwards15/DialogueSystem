import {AfterViewInit, ContentChild, Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {fromEvent, Subscription, takeUntil} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {DraggableSelector} from "./DraggableSelector";
import {Dialogue, UpdateMovement} from "../models/dialogue";
import {Store} from "@ngrx/store";
import {GetAll} from "../../actions/dialogue.actions";
import {DialogueState} from "../../Globals/DialogueState";

@Directive({
  selector: "[DialogueWindow]",
})
export class DialogueWindow implements OnInit,AfterViewInit, OnDestroy {
  private readonly DEFAULT_DRAGGING_BOUNDARY_QUERY = "body";
  private element!: HTMLElement;
  private subscriptions: Subscription[] = [];
  public handleElement!: HTMLElement;
  public draggingBoundaryElement: HTMLElement | HTMLBodyElement;

  @ContentChild(DraggableSelector) handle!: DraggableSelector;
  @Input() boundaryQuery = this.DEFAULT_DRAGGING_BOUNDARY_QUERY;
  @Input() guid:string
  @Input() dialogue_entry:Dialogue

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private store:Store<any>,
    private State:DialogueState) {}

  ngOnInit(): void {}


  ngAfterViewInit(): void {
    // @ts-ignore
    this.draggingBoundaryElement = (this.document as Document).querySelector(this.boundaryQuery);

    if (!this.draggingBoundaryElement) {
      throw new Error("Couldn't find any element with query: " + this.boundaryQuery);
    } else {
      this.element = this.elementRef.nativeElement as HTMLElement;
      this.handleElement = this.handle?.elementRef?.nativeElement || this.element;
      this.element.style.transform =  "translate3d(" + this.dialogue_entry.Xpos + "px, " + this.dialogue_entry.Ypos + "px, 0)";

      this.initDrag();
    }
  }

  initDrag(): void {
    const minBoundX = this.draggingBoundaryElement.offsetLeft;
    const minBoundY = this.draggingBoundaryElement.offsetTop;
    const maxBoundX = minBoundX + this.draggingBoundaryElement.offsetWidth - this.element.offsetWidth;
    const maxBoundY = minBoundY + this.draggingBoundaryElement.offsetHeight - this.element.offsetHeight;

    const dragStart$ = fromEvent<MouseEvent>(this.handleElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe( takeUntil(dragEnd$));

    let initialX: number = 0
    let initialY: number = 0
    let currentX = this.dialogue_entry.Xpos;
    let currentY = this.dialogue_entry.Ypos;

    let dragSub: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.element.classList.add('dialogue_windows');

        dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        const x = event.clientX - initialX;
        const y = event.clientY - initialY;

        currentX = Math.max(minBoundX, Math.min(x, maxBoundX));
        currentY = Math.max(minBoundY, Math.min(y, maxBoundY));
        let movement = new UpdateMovement(this.guid, currentX,currentY);

        this.State.SetPositionDialogueAction(movement)
        this.store.dispatch(GetAll())
        this.element.style.transform =  "translate3d(" + currentX + "px, " + currentY + "px, 0)"; });
    });
    const dragEndSub = dragEnd$.subscribe(() => {

      initialX = currentX;
      initialY = currentY;

      this.element.classList.remove('dialogue_windows');
      if (dragSub) {
        this.store.dispatch(GetAll());
        dragSub.unsubscribe();
      }
    });


    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragEndSub,
    ]);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }


}
