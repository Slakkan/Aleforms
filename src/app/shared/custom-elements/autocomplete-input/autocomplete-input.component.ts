import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutocompleteInputComponent),
    }
  ]
})
export class AutocompleteInputComponent implements ControlValueAccessor {
  @Input() suggestions: string[] = [];
  @ViewChild('autocomplete', { static: true }) autocompleteInput: ElementRef = new ElementRef(window);

  value = '';

  onChange = (value: string) => { };
  onTouched = () => { };

  constructor() { }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSuggestionClick(event: Event) {
    if (event && event.target != null) {
      event.preventDefault();
      this.autocompleteInput.nativeElement.value = (event.target as HTMLSpanElement).textContent;
      this.suggestions = [];
    }
  }
}
