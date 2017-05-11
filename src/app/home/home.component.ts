import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberSubscription: Subscription;
  packageSubscription: Subscription;
  
  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      );
    this.numberSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('Fist Package');
        }, 2000);
        setTimeout(() => {
          observer.next('Second Package');
        }, 4000);
        setTimeout(() => {
          // observer.error('This Does Not Work');
          observer.complete();
        }, 5000);
        setTimeout(() => {
          observer.next('Third Package');
        }, 6000);
      }
    );
   this.packageSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy() {
    this.numberSubscription.unsubscribe();
    this.packageSubscription.unsubscribe();
  }

}
