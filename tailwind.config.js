
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust to your folder structure
  ],
  theme: {

    extend: {
      fontFamily: {
        RobotoBlack: 'Roboto-Black',
        RobotoBlackItalic: 'Roboto-BlackItalic',
        RobotoBold: 'Roboto-Bold',
        RobotoBoldItalic: 'Roboto-BoldItalic',
        RobotoItalic: 'Roboto-Italic',
        RobotoLight: 'Roboto-Light',
        RobotoLightItalic: 'Roboto-LightItalic',
        RobotoMedium: 'Roboto-Medium',
        RobotoRegular: 'Roboto-Regular',
        RobotoThin: 'Roboto-Thin',
        RobotoThinItalic: 'Roboto-ThinItalic',

      },

      colors: {
        primary: '#01503B',
        PrimaryFocus: "#FFFFFF33",
        whiteBtnText: "#141316",
        title: '#272727',
        subT: '#5e5e5e',
        offWhite: '#E6ECEC',
        secondary: '#D8E7BC',
        white100: '#EFEFEF',
        border: '#DFDFDF',
        primary100: '#EEF6F6',
        primary200: '#9BB3B5',
        danger: '#CE3535',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.btn': {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        '.resize-repeat': {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};
