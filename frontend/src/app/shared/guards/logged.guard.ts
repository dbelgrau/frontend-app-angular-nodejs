import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../services/data/current-user/current-user.service';
import { map } from 'rxjs';
import { User } from '../models/data/user.model';

export const isLogged: CanActivateFn = () => {
  const router: Router = inject(Router);
  
  return inject(CurrentUserService).user.pipe(
    map((user: User | null) => {
      if (user !== null) {
        return true;
      } 
      router.navigate(['users', 'login']);
        
      return false;
      
    })
  );
};
