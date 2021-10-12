import React from 'react';
import Stats from './stats';
export interface StatsInterface {
  statsName: string;
  statsNumber: number;
  colorOfCard: string;
  textAlign: string;
}
export default function StatsParent(): JSX.Element {
  const dummyData: StatsInterface[] = [
    {
      statsName: 'Hackers',
      statsNumber: 15,
      colorOfCard: 'red',
      textAlign: 'left',
    },
    {
      statsName: 'Sponsors',
      statsNumber: 28,
      colorOfCard: 'purple',
      textAlign: 'center',
    },
    {
      statsName: 'Events',
      statsNumber: 17,
      colorOfCard: 'blue',
      textAlign: 'right',
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {dummyData.map((stat) => (
        <Stats key={stat.statsName} data={stat} />
      ))}
    </div>
  );
}
