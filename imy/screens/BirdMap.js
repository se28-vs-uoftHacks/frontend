// BirdMap.js

import bird0 from '../birds/bird_0.png';
import bird1 from '../birds/bird_1.png';
import bird2 from '../birds/bird_2.png';
import bird3 from '../birds/bird_3.png';
import bird4 from '../birds/bird_4.png';
import bird5 from '../birds/bird_5.png';
import bird6 from '../birds/bird_6.png';
import bird7 from '../birds/bird_7.png';
import bird8 from '../birds/bird_8.png';
import bird9 from '../birds/bird_9.png';
import bird10 from '../birds/bird_10.png';
import bird11 from '../birds/bird_11.png';
import bird12 from '../birds/bird_12.png';
import bird13 from '../birds/bird_13.png';
import bird14 from '../birds/bird_14.png';
import bird15 from '../birds/bird_15.png';
import bird16 from '../birds/bird_16.png';

const birdMap = {
  0: bird0,
  1: bird1,
  2: bird2,
  3: bird3,
  4: bird4,
  5: bird5,
  6: bird6,
  7: bird7,
  8: bird8,
  9: bird9,
  10: bird10,
  11: bird11,
  12: bird12,
  13: bird13,
  14: bird14,
  15: bird15,
  16: bird16,
};

const getBirdFileName = (birdNumber) => {
  const fileName = birdMap[birdNumber];
  if (!fileName) {
    throw new Error(`Bird number ${birdNumber} not found in the mapping.`);
  }
  return fileName;
};

export default getBirdFileName;
