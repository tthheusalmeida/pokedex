import { addZerosToNumber } from '@/utils/formatter';

export function getImgLowQuality(pokemon) {
  const id = addZerosToNumber(pokemon);
  // eslint-disable-next-line prefer-template
  return 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + id + '.png';
}

export function getImgHighQuality(pokemon) {
  return pokemon.sprites.other['official-artwork'].front_default;
}
