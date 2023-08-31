/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        clDRos: '#E75065',
        clRos: '#f6aab5',
        clNar: '#F4B03F',
        clAma: '#f8c7a3',
        clNeg: '#4D4D4D',
        clBlc: '#F8F8F8',
        clCaf: '#fed6b4',
        clPiel: '#fdd2b9',
      },
      width: {
        100: '400px',
        150: '600px',
        '1/24': '4.166667%',
        '2/24': '8.333333%',
        '3/24': '12.5%',
        '4/24': '16.666667%',
        '5/24': '20.833333%',
        '6/24': '25%',
        '7/24': '29.166667%',
        '8/24': '33.333333%',
        '9/24': '37.5%',
        '10/24': '41.666667%',
        '11/24': '45.833333%',
        '12/24': '50%',
        '13/24': '54.166667%',
        '14/24': '58.333333%',
        '15/24': '62.5%',
        '16/24': '66.666667%',
        '17/24': '70.833333%',
        '18/24': '75%',
        '19/24': '79.166667%',
        '20/24': '83.333333%',
        '21/24': '87.5%',
        '22/24': '91.666667%',
        '23/24': '95.833333%',
      },
      height: {
        100: '400px',
        150: '600px',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
      },
      gridRowEnd: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: ['macros'],
};
