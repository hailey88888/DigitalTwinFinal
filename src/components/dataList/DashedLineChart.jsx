import {
    LineChart,
    lineElementClasses,
    markElementClasses,
  } from '@mui/x-charts/LineChart';

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];


const DashedLineChart = () => {
return (
  <>
  <h3 style={{paddingLeft:'15px',paddingTop:'7px'}}>DashedLineChart</h3>

  <div style={{height:'80%', width:'100%', paddingLeft:'15px'}}>
    <LineChart
        series={[
          { data: pData, label: 'pv', id: 'pvId' },
          { data: uData, label: 'uv', id: 'uvId' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        sx={{
          // width: '100%', height:'80%' ,
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 1,
          },
          '.MuiLineElement-series-pvId': {
            strokeDasharray: '5 5',
          },
          '.MuiLineElement-series-uvId': {
            strokeDasharray: '3 4 5 2',
          },
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
            fill: '#fff',
          },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: 'none',
          },
        }}
      />
  </div>
    
  </>
  );
}

export default DashedLineChart;
