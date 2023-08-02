import { InjectionToken, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '../lib/store';
import { StoreConfig } from '../lib/store-config';

const STORE_CONFIG = new InjectionToken<StoreConfig<any>>('STORE_CONFIG');

class TestSignalStory extends Store<any> {
  constructor() {
    super(inject(STORE_CONFIG));
  }
}

function registerAndGetSignalStory(
  initialState: StoreConfig<any>
): TestSignalStory {
  TestBed.configureTestingModule({
    providers: [
      { provide: STORE_CONFIG, useValue: initialState },
      TestSignalStory,
    ],
  });

  return TestBed.inject(TestSignalStory);
}

describe('SignalStory', () => {
  it('should set the initial state correctly', () => {
    // Arrange
    const initialState = 'initial_state';

    // Act
    const store = registerAndGetSignalStory({
      initialState: initialState,
    });

    // Assert
    expect(store.state()).toEqual(initialState);
  });

  it('should set the state correctly with set()', () => {
    // Arrange
    const store = registerAndGetSignalStory({
      initialState: { value: 10 },
    });
    const newState = { value: 42 };

    // Act
    store.set(newState);

    // Assert
    expect(store.state()).toEqual(newState);
  });

  it('should mutate the state correctly with mutate()', () => {
    // Arrange
    const store = registerAndGetSignalStory({
      initialState: { value: 10 },
    });

    // Act
    store.mutate(state => {
      state.value += 10;
      return state;
    });

    // Assert
    expect(store.state()).toEqual({ value: 20 });
  });
});
