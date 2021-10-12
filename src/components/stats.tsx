import React from 'react';
import { StatsInterface } from './statsParent';
interface StatsProps {
  data: StatsInterface;
}
export default function Stats({ data }: StatsProps): JSX.Element {
  return (
    <div
      style={{
        color: 'black',
        borderStyle: 'solid',
        backgroundColor: data.colorOfCard,
        border: '10px black',
      }}
    >
      <p>{data.statsName}</p>
      <p>{data.statsNumber}</p>
    </div>
  );
}
