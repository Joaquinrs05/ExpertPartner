import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-weekly-hours',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './weekly-hours.component.html',
  styleUrl: './weekly-hours.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyHoursComponent {
  readonly workedHours = signal(32);
  readonly targetHours = signal(40);

  percentage = computed(() =>
    Math.round((this.workedHours() / this.targetHours()) * 100)
  );

  remaining = computed(() => this.targetHours() - this.workedHours());
}
