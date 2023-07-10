import { CircularSlicePipe } from './circular-slice.pipe';

describe('CircularSlicePipe', () => {
  const mockInput: number[] = [
    4, 3, 5, -2, 5, 0, 11, 54, 31
  ];
  let pipe: CircularSlicePipe;

  beforeEach(() => {
    pipe = new CircularSlicePipe();
  });

  it('should correctly slice items in the middle of an array', () => {
    expect(pipe.transform(mockInput, 2, 2)).toEqual([5, -2]);
  });

  it('should correctly slice items at the end of the array', () => {
    expect(pipe.transform(mockInput, 6, 5)).toEqual([11, 54, 31, 4, 3]);
  });

  it('should correctly slice items at the end of the array if size exceeds', () => {
    expect(pipe.transform(mockInput, 6, 20)).toEqual([11, 54]);
  });
});
