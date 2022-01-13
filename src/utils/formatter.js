// eslint-disable-next-line import/prefer-default-export
export function addZerosToNumber(pokemon) {
  const { id } = pokemon;
  const zero = 3 - id.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + id;
}

export function removeDashFromString(string) {
  return string
    .split('-')
    .map((element) => element.charAt(0).toUpperCase() + element.slice(1))
    .join(' ');
}
