import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | number | string): string {
    const now = Date.now();
    const date = new Date(value).getTime();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 2) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return 'Yesterday';
    return `${Math.floor(diffHours / 24)} days ago`;
  }
}
