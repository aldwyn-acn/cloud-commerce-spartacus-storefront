import { Injectable } from '@angular/core';
import * as fromStore from '../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { PathPipeService } from '../configurable-routes/path/path-pipe.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  readonly routerState$: Observable<any> = this.store.pipe(
    select(fromStore.getRouterState)
  );

  readonly redirectUrl$: Observable<string> = this.store.pipe(
    select(fromStore.getRedirectUrl)
  );

  constructor(
    private store: Store<fromStore.RouterState>,
    private pathPipeService: PathPipeService
  ) {}

  public go(path: any[], query?: object, extras?: NavigationExtras) {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }

  public goToPage(pageName: string, parameters: object = {}) {
    const path = this.pathPipeService.transform(pageName, parameters);
    this.go([path]);
  }

  back() {
    this.store.dispatch(new fromStore.Back());
  }

  forward() {
    this.store.dispatch(new fromStore.Forward());
  }

  clearRedirectUrl() {
    this.store.dispatch(new fromStore.ClearRedirectUrl());
  }

  saveRedirectUrl(url: string) {
    this.store.dispatch(new fromStore.SaveRedirectUrl(url));
  }
}
