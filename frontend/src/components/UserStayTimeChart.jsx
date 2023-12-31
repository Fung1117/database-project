import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card } from 'antd';

function UserStayTimeChart({ data }) {
  const { time, date } = data;

  return (
    <Card hoverable style={{width: '60%', height: 650}}>
      <LineChart
        height={600}
        series={[
          { data: time, label: 'User Activity Duration' },
        ]}
        xAxis={[{ scaleType: 'point', data: date, label: 'Date' }]}
        yAxis={[{ scaleType: 'linear', label: 'Time (in minutes)' }]}
      />
    </Card>
  );
}

export default UserStayTimeChart;
