import { inject } from "@angular/core";
import { Router, ActivatedRouteSnapshot, UrlTree, CanActivateFn } from "@angular/router";

export function AllowedLocation(allowedEntities: string[]): CanActivateFn {
    return (route: ActivatedRouteSnapshot): boolean | UrlTree => {
      const router: Router = inject(Router);
      const entitiesType: string | null = route.paramMap.get(
        'location'
      );
      
      if(entitiesType){
        return allowedEntities.indexOf(entitiesType.toLocaleLowerCase()) !== -1 ? true : router.parseUrl('/');
      }else{
        return false;
      }
    };
}