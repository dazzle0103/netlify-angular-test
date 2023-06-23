import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

// ANGULAR MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tracking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './tracking-form.component.html',
  styleUrls: ['./tracking-form.component.css'],
})
export class TrackingFormComponent {
  databaseService: DatabaseService = inject(DatabaseService);
  userService: UserService = inject(UserService);

  trainingForm = new FormGroup({
    training: new FormControl('', [this.trainingsValidator(/^[0-9, ]*$/)]),
  });

  trainingsValidator(regEx: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const match = !regEx.test(control.value);
      return match ? { myError: 'TrainingValidatorError' } : null;
    };
  }

  get t() {
    return this.trainingForm.controls;
  }

  async submitTraining(): Promise<void> {
    const date = new Date().toISOString().split('T')[0];

    const currUser = await this.userService.getUser();
    const name = currUser?.user_metadata?.full_name || 'DefaultGuestUser';

    // checking form?
    console.log(
      'IS form Valid',
      !this.trainingForm.invalid,
      'errors:',
      this.trainingForm
    );
    if (this.trainingForm.invalid) {
      // invalid form
      return;
    }

    const training = this.trainingForm.value.training
      ?.split(/[,\s-]+/)
      .filter((el) => el)
      .map((el) => Number(el));

    const trainingsData = {
      date: date,
      training: training,
      name: name,
    };

    this.trainingForm.reset();
    this.trainingForm.controls.training.setErrors(null);
    if (!currUser) {
      // not logged In
      return;
    }
    console.log('SUBMITTING TRAINING - Begin');

    let response = await this.databaseService.writeTraining(
      trainingsData,
      currUser?.token?.access_token
    );

    if (!response.error) {
      // all ok
      alert(
        'Training Submitted: ' +
          JSON.stringify(trainingsData.training?.join(' - '))
      );
    } else {
      // error
      alert(`ERROR: ${response.error}`);
    }
  }
}
