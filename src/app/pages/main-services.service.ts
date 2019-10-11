import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainServicesService {
private cashedLocationPoints:any=[];
private id:any;
  constructor(private http: Http) { }
  // Setting Headers for API Request
  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    // if (this.jwtService.getToken()) {
    //   headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    // }
    return new Headers(headersConfig);
  }
    // Perform a GET Request
    get(path: string): Observable<any> {
      return this.http
        .get(`${environment.api_url}${path}`, { headers: this.setHeaders() })
        .pipe(
          catchError(error => {
            throw error.json();
          }),
          map((res: Response) => res.json())
        );
    }
  // Perform POST Request
  post(path, body): Observable<any> {
    return this.http
      .post(
        `${environment.api_url}${path}`,
        JSON.stringify(this.filterInputs(body)),
        {
          headers: this.setHeaders()
        }
      )
      .pipe(
        catchError(error => {
          throw error.json();
        }),
        map((res: Response) => res.json())
      );
  }
  // filter the input values
  filterInputs(input: any) {
    const tempObj = {};
    Object.keys(input).forEach(key => {
      if (
        input[key] !== undefined &&
        input[key] !== null &&
        input[key] !== ''
      ) {
        tempObj[key] = input[key];
      }
    });

    return tempObj;
  }
  storeGeoLocations(locationObject:any){
this.cashedLocationPoints.push(locationObject);
  }
  postLocationData(){
this.post('train/addPath',this.cashedLocationPoints).subscribe(responce=>{
  console.log(responce);
})
  }
  setId(id:any){
this.id=id;
  }
}
