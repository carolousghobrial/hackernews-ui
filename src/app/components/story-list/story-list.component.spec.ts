import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListComponent } from './story-list.component';
import { StoryApiService } from '../../services/story-api.service';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let storyApiService: jasmine.SpyObj<StoryApiService>;

  storyApiService = jasmine.createSpyObj('StoryApiService', ['getAllStories']);

  const mockStories = [
    { title: 'Angular Testing', by: 'john', score: 10, time: 1700000000 },
    { title: 'RxJS Basics', by: 'jane', score: 20, time: 1700001000 }
  ];
  beforeEach(async () => {
    storyApiService = jasmine.createSpyObj('StoryApiService', ['getAllStories']);

    await TestBed.configureTestingModule({
      imports: [StoryListComponent],
      providers: [{ provide: StoryApiService, useValue: storyApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;

    component.paginator = jasmine.createSpyObj<MatPaginator>(
      'MatPaginator',
      ['firstPage']
    );
  });

  it('should load stories and assign paginator', () => {
    storyApiService.getAllStories.and.returnValue(of(mockStories));

    component.loadStories();

    expect(component.dataSource.data).toEqual(mockStories);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filter', () => {
    storyApiService.getAllStories.and.returnValue(of(mockStories));
    component.loadStories();

    component.query = 'angular';
    component.applyFilter();

    expect(component.dataSource.filter).toBe('angular');
    expect(component.paginator.firstPage).toHaveBeenCalled();
  });
});
