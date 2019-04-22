import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map, startWith, debounceTime, filter } from 'rxjs/operators';
import { HttpClient }   from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { State, states} from './state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  listState: boolean = false;
  states$: Observable<State[]>;
  filteredStates$: Observable<State[]>;
  filter: FormControl;
  filter$: Observable<string>;
  input: string = '';
  value: string = '';
  constructor(){}
  ngOnInit(){
    this.listState = true;
    this.states$ = of(states);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredStates$ = combineLatest(this.states$, this.filter$)
    .pipe(
      map(([states, filterString]) => states.filter(state => state.name.indexOf(filterString) !== -1)),
      debounceTime(3000),
    );
  }
}
