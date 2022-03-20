import {AfterViewInit, ContentChild, Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {fromEvent, Subscription, takeUntil} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {DraggableSelector} from "./DraggableSelector";

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


  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {}


  ngAfterViewInit(): void {
    // @ts-ignore
    this.draggingBoundaryElement = (this.document as Document).querySelector(this.boundaryQuery);

    if (!this.draggingBoundaryElement) {
      throw new Error("Couldn't find any element with query: " + this.boundaryQuery);
    } else {
      this.element = this.elementRef.nativeElement as HTMLElement;
      this.handleElement = this.handle?.elementRef?.nativeElement || this.element;
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
    let currentX = 0;
    let currentY = 0;

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

        this.element.style.transform =  "translate3d(" + currentX + "px, " + currentY + "px, 0)"; });
    });
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.element.classList.remove('dialogue_windows');
      if (dragSub) {
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
