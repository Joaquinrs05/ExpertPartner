export type ImportStatus = 'ready' | 'processing' | 'error';

export interface ImportPreviewRow {
  trabajador: string;
  mes: string;
  values: Record<string, string>;
}

export interface ImportedFile {
  id: string;
  fileName: string;
  uploadedAt: Date;
  processedAt: Date | null;
  status: ImportStatus;
  workerCount: number;
  month: string;
  year: number;
  columns: string[];
  previewRows: ImportPreviewRow[];
}
