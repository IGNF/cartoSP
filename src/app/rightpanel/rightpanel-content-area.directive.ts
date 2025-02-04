import { Directive, ViewContainerRef } from '@angular/core';
import { DefaultComponent } from './content/default/default.component';

@Directive({
  selector: '[rightpanelContentArea]',
  standalone: true
})
export class RightpanelContentAreaDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
