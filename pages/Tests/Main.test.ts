import Verification from '../Functions/Verification';

describe('Verification of Moves', () => {
  test('Rook One Move Below', () => {
    expect(Verification("rook","white",[5,5],[5,6],[])).toBe(true);
  });

  test('bishop One Move Below', () => {
    expect(Verification("bishop","black",[5,5],[6,6],[])).toBe(true);
  });

});


