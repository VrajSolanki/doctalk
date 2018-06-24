import studentMapping from './student.json';
export default {
  sid: 'Y11sa13',
  units: [],
  students: studentMapping,
  chartOptions:{
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    }
  },
  currentChartData2: {
    labels:[ "Simplifying Algebraic Expressions", "Simple Interest", "Mensuration", "Ratio and Proportions", "Sets", "Number System" ],
    datasets:[{
      fillColor: "#46BFBD",
      data: [6,4,5,7,9,10]
    }]
  },
  currentChartData3: {
    labels:[ "Mon","Tue", "Wed", "Thu", "Fri", "Sat","Sun", "Mon","Tue", "Wed" ],
    datasets:[{
      fillColor: "rgba(36,204,168,0.67)",
      data: [10,4,5,8,5,9,2,7,2,9]
    }]
  },
  currentChartData : [
    {
      value: 234,
      color:"#FFEE1A",
      highlight: "#FF5A5E",
      label: "Red"
    },
    {
      value: 341,
      color: "#5EEEC3",
      highlight: "#FFC870",
      label: "Yellow"
    },
    {
      value: 122,
      color: "#FFF473",
      highlight: "#5AD3D1",
      label: "Green"
    },

    {
      value: 233,
      color: "#23D5A6",
      highlight: "#A8B3C5",
      label: "Grey"
    },
    {
      value: 100,
      color: "#41DCF5",
      highlight: "#616774",
      label: "Dark Grey"
    }
  ]

};
