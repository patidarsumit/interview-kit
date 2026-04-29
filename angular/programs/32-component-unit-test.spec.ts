import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CounterComponent} from './01-standalone-component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CounterComponent],
    });

    fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();
  });

  it('increments count', () => {
    fixture.componentInstance.increment();

    expect(fixture.componentInstance.count()).toBe(1);
  });
});

