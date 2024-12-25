import { Directive, AfterViewInit, Component, ElementRef, ViewChild, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightKeyword]',
  standalone: true
})
export class HighlightKeywordDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.highlightText();
  }

  private highlightText() {
    const keywords: string = this.el.nativeElement.getAttribute('data-keyword');
    const title: string = this.el.nativeElement.innerText;

    if (keywords == "" || title == "") {
      return;
    }
    else {
      const regex = new RegExp(`(${keywords})`, 'gi');
      const highlightedTitle = title.replace(regex, '<span class="highlight">$1</span>');
      this.el.nativeElement.innerHTML = highlightedTitle;
      return;
    }
  }

}
