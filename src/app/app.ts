import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import '@igds/core-web/button';
import '@igds/core-web/radio-group';
import '@igds/core-web/radio';
import '@igds/core-web/input';
import { AppInput } from '../app-input/app-input';

@Component({
  selector: 'app-root',
  imports: [AppInput, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  inputValue = signal('default');
  inputValue2 = '';
  checkboxValue = false;
  variant = signal<typeof this.buttonVariants[number]>('primary');
  buttonVariants = [
    'alternative',
    'link',
    'link-inline',
    'primary',
    'secondary',
  ] as const;

  form: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

  submit(_event: SubmitEvent) {
    const formValues = this.form.value;
    console.log('form submitted:', formValues);
    alert(`Form input value: ${formValues.input}`);
  }

  handleChange(variant: any) {
    this.variant.set(variant.detail.value);
  }

  handleInput(event: Event) {
    const value = (event as CustomEvent).detail.value;
    this.inputValue.set(value);
  }
}
