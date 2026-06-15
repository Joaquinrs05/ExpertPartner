import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '@core/services/supabase.service';
import { N8nResponse, HistoryEntry } from '@core/models/import.model';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

const WEBHOOK_640 = '/webhook/Nomina640';
const WEBHOOK_642 = '/webhook/Nomina642';

@Component({
  selector: 'app-admin-imports',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  templateUrl: './admin-imports.component.html',
  styleUrl: './admin-imports.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminImportsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly supabase = inject(SupabaseService);

  uploadState = signal<UploadState>('idle');
  uploadMessage = signal('');
  result640 = signal<string | null>(null);
  result642 = signal<string | null>(null);
  history = signal<HistoryEntry[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadHistory();
  }

  private async loadHistory(): Promise<void> {
    const { data } = await this.supabase.client
      .from('import_history')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .limit(50);
    if (data) this.history.set(data as HistoryEntry[]);
  }

  onUpload(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    this.uploadState.set('uploading');
    this.uploadMessage.set(`Subiendo "${file.name}"...`);
    this.result640.set(null);
    this.result642.set(null);

    let pending = 2;
    const results: N8nResponse = {};

    const onDone = async () => {
      pending--;
      if (pending > 0) return;

      if (results.url_640) this.result640.set(results.url_640);
      if (results.url_642) this.result642.set(results.url_642);

      await this.loadHistory();

      this.uploadState.set('success');
      this.uploadMessage.set(`"${file.name}" procesado correctamente.`);
      setTimeout(() => this.uploadState.set('idle'), 5000);
    };

    const sendTo = (webhook: string, key: keyof N8nResponse) => {
      const body = new FormData();
      body.append('file', file, file.name);

      this.http.post<N8nResponse>(webhook, body).subscribe({
        next: (res) => {
          if (res?.[key]) results[key] = res[key];
          onDone();
        },
        error: (err) => {
          console.warn('Webhook response:', err);
          onDone();
        },
      });
    };

    sendTo(WEBHOOK_640, 'url_640');
    sendTo(WEBHOOK_642, 'url_642');
  }
}
