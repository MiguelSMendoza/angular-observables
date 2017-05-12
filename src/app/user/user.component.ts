import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  userSubscription: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.userSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        },
        // () => {
        //   console.log('ERROR');
        // },
        // () => {
        //   console.log('COMPLETE');
        // }
      );
  }

  public onActivate(): void {
    this.usersService.userActivated.next(this.id);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
