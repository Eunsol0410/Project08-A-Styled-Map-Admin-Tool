import christmas from './theme/christmas.json';
import blueprint from './theme/blueprint.json';
import dark from './theme/dark.json';
import sketch from './theme/sketch.json';
import monochrome from './theme/monochrome.json';

const data = [
  {
    src: '/images/default.png',
    name: '표준',
  },
  {
    src: '/images/monochrome.png',
    name: '모노크롬',
    theme: monochrome,
  },
  {
    src: '/images/sketch.png',
    name: '스케치',
    theme: sketch,
  },
  {
    src: '/images/dark.png',
    name: '밤',
    theme: dark,
  },
  {
<<<<<<< HEAD
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '크리스마스',
=======
    src: '/images/christamas.png',
    name: '크리스마스',
    theme: christmas,
>>>>>>> 33f0ac4ccbcb873f16a7c92d8122d468dcbf4db2
  },
  {
    src: '/images/blueprint.png',
    name: '청사진',
    theme: blueprint,
  },
];

export default data;
