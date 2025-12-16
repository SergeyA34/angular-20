import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {IGDS_INPUT_AUTOCAPITALIZE_OPTIONS, IconNames} from '@igds/core-web';
import '@igds/core-web/input';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  template: `
    <section [dir]="isLtr ? 'ltr' : 'rtl'">
      <div class="box">
        <igds-input
          [type]="type"
          [name]="name"
          [label]="label"
          [(value)]="value"
          [defaultValue]="defaultValue"
          [dir]="isLtr ? 'ltr' : undefined"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [invalid]="invalid"
          [required]="required"
          [error]="invalid ? error : undefined"
          [icon]="icon ? icon : undefined"
          [rows]="rows"
          [cols]="cols"
          [maxlength]="maxlength"
          [size]="size"
          [tooltip]="tooltip"
          [tooltipIcon]="tooltip && !tooltipQuestion ? true : undefined"
          [tooltipQuestion]="tooltipQuestion"
          [iconPosition]="iconPosition"
          [helpIcon]="helpIcon"
          [helpText]="helpText"
        >
        </igds-input>
      </div>
    </section>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInput),
      multi: true,
    },
  ],
})
export class AppInput implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label?: string = 'Form field label';
  @Input() name?: string;
  @Input() placeholder?: string = '';
  @Input() form?: string;
  @Input() defaultValue?: string;
  @Input() disabled?: boolean = false;
  @Input() required?: boolean = false;
  @Input() readonly?: boolean = false;
  @Input() rows?: number;
  @Input() cols?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() pattern?: string;
  @Input() maxlength?: number;
  @Input() icon?: IconNames;
  @Input() iconPosition?: string = 'left';
  @Input() helpText?: string;
  @Input() helpIcon?: IconNames;
  @Input() tooltip?: string;
  @Input() tooltipQuestion?: string;
  @Input() invalid?: boolean = false;
  @Input() error?: string = 'אתה מזין ערך לא חוקי';
  @Input() autoFocus?: boolean = false;
  @Input() autoComplete: 'on' | 'off' = 'off';
  @Input() autoCapitalize: IGDS_INPUT_AUTOCAPITALIZE_OPTIONS =
    IGDS_INPUT_AUTOCAPITALIZE_OPTIONS.off;
  @Input() autocorrect?: 'on' | 'off' = 'off';
  @Input() step?: number;
  @Input() size: string = 'custom';

  @Input('value')
  _value?: string;

  @Input()
  isLtr = true;

  @Output()
  valueChange = new EventEmitter();

  get value(): string | undefined {
    return this._value;
  }

  set value(value: string | CustomEvent<string>) {
    if (value instanceof CustomEvent) {
      this._value = value.detail;
    } else {
      this._value = value;
    }

    this.valueChange.emit(this._value);
    this.onChange?.(this._value);
    this.onTouch?.();
  }

  onChange?: ((value: string) => void) | null;

  onTouch?: (() => void) | null;

  writeValue(obj: string) {
    this.value = obj;
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
