import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportedFile, ImportStatus } from '@core/models/import-file.model';

const LOCATIONS = ['MARTIRICOS', 'PETOS INSUR', 'PARQUE BOMBEROS', 'LA BODEGA ANA', 'OLVERA CEES', 'POLIDEPORTIVO MAÚL', 'CALLE OVIEDO'];

const mock = (
  id: string, fileName: string, month: string, year: number,
  status: ImportStatus, daysAgo: number, workerCount: number
): ImportedFile => {
  const uploadedAt = new Date();
  uploadedAt.setDate(uploadedAt.getDate() - daysAgo);
  const processedAt = status !== 'processing' ? new Date(uploadedAt.getTime() + 120000) : null;

  const workers = [
    'BURRUECOS VELASCO FRANCISCO', 'TRUJILLO MORALES FRANCISCO', 'PALOMO PEREZ JUAN ANTONIO',
    'ARCAS LADRON DE GUEVARA JOSE', 'DOMINGUEZ MELERO ANTONIO JOSÉ', 'ROMERO MARTINEZ JUAN',
    'HIDALGO ALAMILLA FRANCISCO', 'FARINHAS CASAIS JOSE FERNANDO',
  ].slice(0, workerCount);

  const previewRows = workers.map(w => ({
    trabajador: w,
    mes: month.toUpperCase(),
    values: Object.fromEntries(LOCATIONS.map(loc => [
      loc, Math.random() < 0.3 ? '0%' : `${Math.floor(Math.random() * 100)}%`
    ])),
  }));

  return { id, fileName, uploadedAt, processedAt, status, workerCount, month, year, columns: LOCATIONS, previewRows };
};

const MOCK_FILES: ImportedFile[] = [
  mock('1', 'asignaciones_enero_2026.xlsx', 'Enero', 2026, 'ready', 2, 8),
  mock('2', 'asignaciones_febrero_2026.xlsx', 'Febrero', 2026, 'processing', 0, 0),
  mock('3', 'asignaciones_diciembre_2025.xlsx', 'Diciembre', 2025, 'ready', 35, 6),
  mock('4', 'asignaciones_noviembre_2025.xlsx', 'Noviembre', 2025, 'error', 67, 0),
];

@Injectable({ providedIn: 'root' })
export class ImportsService {
  private readonly _files = new BehaviorSubject<ImportedFile[]>(MOCK_FILES);
  readonly files$ = this._files.asObservable();

  addFile(fileName: string): void {
    const now = new Date();
    const newFile: ImportedFile = {
      id: Date.now().toString(),
      fileName,
      uploadedAt: now,
      processedAt: null,
      status: 'processing',
      workerCount: 0,
      month: 'Pendiente',
      year: now.getFullYear(),
      columns: [],
      previewRows: [],
    };
    this._files.next([newFile, ...this._files.getValue()]);
  }
}
