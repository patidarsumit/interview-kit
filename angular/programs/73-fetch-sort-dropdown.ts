import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

type Post = {
  id: number;
  title: string;
};

type SortOption = 'title' | 'id';

@Component({
  selector: 'app-post-list',
  standalone: true,
  template: `
    <select
      id="dropdown"
      [value]="selectedSort"
      (change)="changeSort($any($event.target).value)"
    >
      <option value="title">A-Z by title</option>
      <option value="id">ID ascending</option>
    </select>

    <ul>
      @for (post of sortedPosts; track post.id) {
        <li>{{ post.title }}</li>
      }
    </ul>
  `,
})
export class PostListComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly destroy$ = new Subject<void>();

  posts: Post[] = [];
  sortedPosts: Post[] = [];
  selectedSort: SortOption = 'title';

  ngOnInit() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => {
        this.posts = posts;
        this.sortPosts();
      });
  }

  changeSort(value: SortOption) {
    this.selectedSort = value;
    this.sortPosts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sortPosts() {
    this.sortedPosts = [...this.posts].sort((a, b) => {
      if (this.selectedSort === 'id') {
        return a.id - b.id;
      }

      return a.title.localeCompare(b.title);
    });
  }
}
