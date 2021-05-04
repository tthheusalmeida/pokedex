// eslint-disable-next-line import/prefer-default-export
export function addZerosToNumber(number) {
  const { id } = number;
  const zero = 3 - id.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + id;
}
