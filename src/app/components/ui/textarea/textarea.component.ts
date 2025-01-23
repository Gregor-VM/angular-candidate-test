import { Component, forwardRef, input, signal, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [

  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() inputClass = "";
  label = input('');
  value = signal('');
  id = input('');
  required = input(false);

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value.set(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    this.onChange(value);
    this.value.set(value);
  }

  autoGrow(e: KeyboardEvent) {
    const el = event?.target as HTMLInputElement;
    el.style.height = "0px";
    el.style.height = (el.scrollHeight + 25)+"px";
  }
}
