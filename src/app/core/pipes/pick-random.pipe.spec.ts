import { PickRandomPipe } from './pick-random.pipe';

describe('PickRandomPipe', () => {
  let pipe: PickRandomPipe;
  const mockInputArray: string [] = [
    'foo', 'bar', 'foobar'
  ];

  beforeEach(() => {
    pipe = new PickRandomPipe();
    spyOn(Math, 'random').and.returnValue(0.623456789);
  });

  it('should pick a random item from the array', () => {
    expect(pipe.transform(mockInputArray)).toEqual('bar');
  });

  it('should return falsy value if input array is empty', () => {
    expect(pipe.transform([])).toBeFalsy();
  });
});
