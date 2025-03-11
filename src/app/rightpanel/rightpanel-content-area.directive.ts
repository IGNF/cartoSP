import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[rightpanelContentArea]',
  standalone: true
})
export class RightpanelContentAreaDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
