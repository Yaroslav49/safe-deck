import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
   scrollToStart() {
      window.scrollTo({top: 0, behavior: 'smooth'});
   }
}
