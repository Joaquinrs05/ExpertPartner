import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { ImportsService } from '@core/services/imports.service';
import { ImportedFile } from '@core/models/import-file.model';

@Component({
  selector: 'app-admin-imports',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, TranslatePipe],
  templateUrl: './admin-imports.component.html',
  styleUrl: './admin-imports.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminImportsComponent {
  private readonly importsService = inject(ImportsService);

  files = toSignal(this.importsService.files$, { initialValue: [] });
  expandedId = signal<string | null>(null);
  uploadToast = signal<string | null>(null);

  togglePreview(id: string): void {
    this.expandedId.update(current => current === id ? null : id);
  }

  statusLabel(file: ImportedFile): string {
    if (file.status === 'ready') return 'Ready';
    if (file.status === 'processing') return 'Processing...';
    return 'Error';
  }

  onUpload(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    (e.target as HTMLInputElement).value = '';
    if (!file) return;
    this.importsService.addFile(file.name);
    this.uploadToast.set(`"${file.name}" enviado a n8n. Aparecerá aquí cuando esté procesado.`);
    setTimeout(() => this.uploadToast.set(null), 6000);
  }
}
