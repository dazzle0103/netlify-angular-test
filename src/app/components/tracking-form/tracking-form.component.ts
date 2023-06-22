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

  trainingForm = new FormGroup({
    training: new FormControl('', [this.trainingsValidator(/^[0-9, ]*$/)]),
  });

  trainingsValidator(regEx: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const match = !regEx.test(control.value);
      console.log(
        'Validator: ',
        control.dirty,
        control.pristine,
        control.invalid
      );
      return match ? { error: 'TrainingValidatorError' } : null;
    };
  }

  get training() {
    return this.trainingForm.get('training');
  }

  async submitTraining(): Promise<void> {
    const date = new Date().toISOString().split('T')[0];

    //@ts-ignore
    let currUser = netlifyIdentity?.currentUser();
    let name = currUser?.user_metadata?.full_name || 'DefaultGuestUser';

    const training = this.trainingForm.value.training
      ?.split(/[,\s-]+/)
      .filter((el) => el)
      .map((el) => Number(el));

    const trainingsData = {
      date: date,
      training: training,
      name: name,
    };

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
      this.trainingForm.reset();
    } else {
      // error
      alert(`ERROR: ${response.error}`);
    }
  }
}
