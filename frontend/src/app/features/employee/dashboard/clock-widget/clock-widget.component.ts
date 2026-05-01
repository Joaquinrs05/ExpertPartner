import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clock-widget',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clock-widget.component.html',
  styleUrl: './clock-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockWidgetComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  currentTime = signal(new Date());
  isOnDuty = signal(false);

  ngOnInit(): void {
    const id = setInterval(() => this.currentTime.set(new Date()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  toggleClock(): void {
    this.isOnDuty.update((v) => !v);
  }
}
