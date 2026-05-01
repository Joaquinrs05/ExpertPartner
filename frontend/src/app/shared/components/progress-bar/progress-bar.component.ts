import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit, AfterViewInit {
  value = input<number>(0);
  color = input<string>('var(--color-navy)');

  displayValue = signal(0);

  ngOnInit(): void {
    // intentionally empty — animation triggered in AfterViewInit
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.displayValue.set(this.value()), 0);
  }
}
