/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
// eslint-disable-next-line import/prefer-default-export

export function lightenHexColor(col, amt) {
  let usePound = false;

  if (col && col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export function getHexColorFromRoot(options) {
  const {
    type,
    isBackground,
    lighten,
  } = options;
  var colorFromRoot = '';

  const definedColor = isBackground
    ? `--background-${type}-type`
    : `--${type}-type`;

  const rootColor = getComputedStyle(document.documentElement)
    .getPropertyValue(definedColor)
    .trim();

  const isStandardColor = /^#[0-9a-f]{3,6}$/i;

  if (rootColor.match(isStandardColor)) {
    const color = lightenHexColor(rootColor, lighten);

    colorFromRoot = color;
  } else {
    var split = rootColor.split(' ');

    split[1] = lightenHexColor(split[1], lighten);
    split[3] = lightenHexColor(split[3], lighten);

    const color = split.join(' ');

    colorFromRoot = color;
  }

  return colorFromRoot;
}

export function getCardBackgroundColor(type) {
  if (type) {
    const color = getHexColorFromRoot({
      type,
      isBackground: true,
      lighten: 32,
    });

    return `background: ${color};`;
  }
  return 'background: var(--card-white);';
}

export function getSolidColor(type) {
  let newType = type;

  const typesWithMoreColors = [
    {
      type: 'flying',
      changeFor: 'water',
    },
    {
      type: 'ground',
      changeFor: 'electric',
    },
    {
      type: 'dragon',
      changeFor: 'ice',
    },
  ];

  const isMoreThenOneColor = typesWithMoreColors
    .filter((elem) => elem.type === type).shift();

  if (isMoreThenOneColor) {
    newType = isMoreThenOneColor.changeFor;
  }

  return newType;
}
