import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreListPageComponent } from './store-list-page.component';
import { StoreListPageLayoutComponent } from '../../layout/store-list-page-layout/store-list-page-layout.component';
import { StoreFinderGridComponent } from '../../../store-finder/components/store-finder-grid/store-finder-grid.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list/store-finder-list-item/store-finder-list-item.component';
import { ScheduleComponent } from '../../../store-finder/components/schedule-component/schedule.component';
import { MaterialModule } from '../../../material.module';

import * as fromReducers from '../../../store-finder/store';
import * as fromRoot from '../../../routing/store';
import * as fromServices from '../../../store-finder/services';

const MockActivatedRoute = {
  snapshot: {
    params: {
      country: 'CA',
      region: 'CA-QC'
    }
  }
};

describe('StoreListPageComponent', () => {
  let component: StoreListPageComponent;
  let fixture: ComponentFixture<StoreListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreListPageComponent,
        StoreListPageLayoutComponent,
        ScheduleComponent,
        StoreFinderGridComponent,
        StoreFinderSearchComponent,
        StoreFinderListItemComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        }),
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        ...fromServices.services,
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: MockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
