export interface ActivityEntry {
  employee: string;
  action: 'clock-in' | 'clock-out';
  timestamp: Date;
}
