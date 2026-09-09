import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[rightpanelContentArea]',
  standalone: true
})
export class RightpanelContentAreaDirective {
  viewContainerRef = inject(ViewContainerRef);
}
