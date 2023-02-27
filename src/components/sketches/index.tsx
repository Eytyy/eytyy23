import React from 'react';
import Sketch01 from './0001';
import Sketch02 from './0002';
import Sketch03 from './0003';
import Sketch04 from './0004';
import Sketch05 from './0005';
import Sketch06 from './0006';
import Sketch07 from './0007';
import Sketch08 from './0008';
import Sketch09 from './0009';
import Sketch11 from './0011';
import Sketch12 from './0012';
import Sketch14 from './0014';
import Sketch15 from './0015';
import Sketch16 from './0016';
import Sketch17 from './0017';
import Sketch13 from './013';

type Props = {
  id: string;
};

export default function Sketch({ id }: Props) {
  switch (id) {
    case '0001':
      return <Sketch01 />;
    case '0002':
      return <Sketch02 />;
    case '0003':
      return <Sketch03 />;
    case '0004':
      return <Sketch04 />;
    case '0005':
      return <Sketch05 />;
    case '0006':
      return <Sketch06 />;
    case '0007':
      return <Sketch07 />;
    case '0008':
      return <Sketch08 />;
    case '0009':
      return <Sketch09 />;
    case '0010':
      return <Sketch01 />;
    case '0011':
      return <Sketch11 />;
    case '0012':
      return <Sketch12 />;
    case '0013':
      return <Sketch13 />;
    case '0014':
      return <Sketch14 />;
    case '0015':
      return <Sketch15 />;
    case '0016':
      return <Sketch16 />;
    case '0017':
      return <Sketch17 />;
    default:
      return null;
  }
}
