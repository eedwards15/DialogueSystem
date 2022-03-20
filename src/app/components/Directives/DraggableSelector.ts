import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[DraggableSelector]",
})
export class DraggableSelector {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
