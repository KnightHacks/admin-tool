import React from 'react';
import HackerTable from '../components/hackerTable';
import StatsComponent from '../components/StatsComponent';
import SponsorsComponent from '../components/SponsorsComponent';
import KnightHacksLogo from '../assets/knightHacksLogoGold.svg';
export default function HackerPage(): JSX.Element {
  return (
    <div className="lg:w-4/6 w-screen">
      <HackerTable />
    </div>
  );
}
