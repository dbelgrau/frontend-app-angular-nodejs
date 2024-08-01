import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLogged } from './logged.guard';

describe('loggedOrAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLogged(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
