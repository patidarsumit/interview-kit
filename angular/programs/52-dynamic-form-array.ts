import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

function createSkillControl(value = '') {
  return new FormControl(value, {
    nonNullable: true,
    validators: [Validators.required],
  });
}

export class SkillsFormExample {
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    skills: new FormArray([createSkillControl()]),
  });

  get skills() {
    return this.form.controls.skills;
  }

  addSkill() {
    this.skills.push(createSkillControl());
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.getRawValue());
  }
}

