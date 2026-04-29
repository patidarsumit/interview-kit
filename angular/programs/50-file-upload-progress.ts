import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import {inject} from '@angular/core';
import {map} from 'rxjs/operators';

type UploadState =
  | {status: 'uploading'; progress: number}
  | {status: 'done'; body: unknown}
  | {status: 'idle'};

export class FileUploadService {
  private readonly http = inject(HttpClient);

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post('/api/files', formData, {
      observe: 'events',
      reportProgress: true,
    }).pipe(map((event) => this.toUploadState(event)));
  }

  private toUploadState(event: HttpEvent<unknown>): UploadState {
    if (event.type === HttpEventType.UploadProgress) {
      const total = event.total ?? Math.max(event.loaded, 1);
      return {
        status: 'uploading',
        progress: Math.round((event.loaded / total) * 100),
      };
    }

    if (event instanceof HttpResponse) {
      return {status: 'done', body: event.body};
    }

    return {status: 'idle'};
  }
}
