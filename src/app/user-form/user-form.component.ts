import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { CountriesService } from '../shared/services/countries.service';
import { User } from './user-form.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  private countryQuerySubject = new Subject<string>();
  countrySuggestions: string[] = [];
  subscriptions: Subscription[] = [];
  user = new User();

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    const sub = this.countryQuerySubject.pipe(
      filter(query => !!query),
      debounceTime(600),
      switchMap(query => this.countriesService.getCountryByName(query))
    ).subscribe(res => this.countrySuggestions = res);

    this.subscriptions.push(sub);
  }

  onCountryInput(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.countryQuerySubject.next(input.value);
      this.countrySuggestions = [];
    }
  }

  onSubmit(user: User) {
    console.log(user);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
