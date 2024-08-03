import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MarketTrends = ({ trendsData }) => {
  const formattedData = trendsData.map(tag => ({
    name: tag.name,
    count: tag.count
  }));

  return (
    <div>
      <h2>Current Market Trends</h2>
      <BarChart
        width={600}
        height={300}
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default MarketTrends;
