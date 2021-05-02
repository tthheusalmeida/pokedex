import { lightenHexColor } from '@/utils/color';

describe('lightenHexColor', () => {
  it('color #9BCC50 and lighten negative must be #7bac30', () => {
    const color1 = lightenHexColor('#9BCC50', -32);
    expect(color1).toBe('#7bac30');

    const color2 = lightenHexColor('9BCC50', -32);
    expect(color2).toBe('7bac30');
  });

  it('color #51c4e7 and lighten 0 must be #51c4e7', () => {
    const color1 = lightenHexColor('#51c4e7', 0);
    expect(color1).toBe('#51c4e7');

    const color2 = lightenHexColor('51c4e7', 0);
    expect(color2).toBe('51c4e7');
  });

  it('color #a4acaf and lighten positive must be #c4cccf', () => {
    const color1 = lightenHexColor('#a4acaf', 32);
    expect(color1).toBe('#c4cccf');

    const color2 = lightenHexColor('a4acaf', 32);
    expect(color2).toBe('c4cccf');
  });
});
