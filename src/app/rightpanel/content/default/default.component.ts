import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `<p>hello</p>`,
    standalone: true
})
export class DefaultComponent implements OnInit {
  @Input() data!: any;    

  ngOnInit() {
      console.log(this.data);
  }

  whoAmI() {
    return 'I am a child component!';
  }  
}
