import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { StoryApiService } from '../../services/story-api.service';
import { finalize, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatDividerModule,
    MatPaginatorModule, MatIconModule,
    MatProgressBarModule, MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, MatProgressSpinnerModule,
    MatInputModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
})
export class StoryListComponent implements OnInit {
  displayedColumns = ['title', 'by', 'score', 'time', 'actions'];
  stories: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  loading = false;
  pageIndex = 0;
  pageSize = 10;
  total = 500;
  query = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private storyService: StoryApiService) { }

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(): void {
    this.loading = true;

    this.storyService.getAllStories().subscribe({
      next: stories => {
        console.log(stories)
        this.dataSource.data = stories;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data, filter) =>
          data.title?.toLowerCase().includes(filter);

        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.query.trim().toLowerCase();
    this.paginator.firstPage();
  }

  clearSearch(): void {
    this.query = '';
    this.applyFilter();
  }

  formatDate(unix: number): string {
    return new Date(unix * 1000).toLocaleString();
  }

  openStory(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
