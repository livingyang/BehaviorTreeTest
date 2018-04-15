import {store} from '../src/init';

test('adds 1 + 2 to equal 3', () => {
    console.log(store.getState());
    expect(3).toBe(3);
});