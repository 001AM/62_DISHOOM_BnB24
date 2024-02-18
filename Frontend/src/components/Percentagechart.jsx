import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

const data = [
  { name: 'Carbon Emmission', value: 80 },
  { name: 'Group B', value: 20 },
];
const COLORS = ['Red', '#00C49F'];

export default class Example extends PureComponent {
  render() {
    return (
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          startAngle={0}
          endAngle={360}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {data.map((entry, index) => (
            <Label
              key={`label-${index}`}
              position="center"
            />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
