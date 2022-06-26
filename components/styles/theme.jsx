// eslint-disable-next-line camelcase
import { useFonts, Jost_400Regular } from '@expo-google-fonts/jost';
// eslint-disable-next-line camelcase
import { LexendDeca_300Light, LexendDeca_400Regular, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';

export default function () {
  const [fontsLoaded] = useFonts({
    Jost_400Regular, LexendDeca_300Light, LexendDeca_400Regular, LexendDeca_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  // '#135055' midnight green eagle green,
  const theme = {
    colors: {
      // Add new color
      primary: {
        50: '#e7e9e8',
        100: '#DEE3DE',
        200: '#D3DAD3',
        300: '#BCC7BD',
        400: '#A6B5A7',
        500: '#90A291',
        600: '#758C76', // primary
        700: '#667A67',
        800: '#546454',
        900: '#414E42',
      },
      secondary: {
        50: '#F9F5F1',
        100: '#ECE2D5',
        200: '#DFCFB9',
        300: '#D9C5AB',
        400: '#CCB18E',
        500: '#C6A680',
        600: '#B99264', // secondary
        700: '#A97E4C',
        800: '#8D693F',
        900: '#715433',
      },
      tertiary: {
        50: '#f8f2f1',
        100: '#f2e4e3',
        200: '#e4cac8',
        300: '#d7afac',
        400: '#ca9591',
        500: '#bd7a75',
        600: '#a85751', // tertiary
        700: '#974e49',
        800: '#7c403c',
        900: '#60322e',
      },
      error: {
        50: '#FBEFF0',
        100: '#F2CFD1',
        200: '#E9AFB3',
        300: '#E09095',
        400: '#D77077',
        500: '#BF363F',
        600: '#9F2D34', // error
        700: '#7F242A',
        800: '#5F1B1F',
        900: '#401215',
      },
      danger: {
        50: '#FBEFF0',
        100: '#F2CFD1',
        200: '#E9AFB3',
        300: '#E09095',
        400: '#D77077',
        500: '#BF363F',
        600: '#9F2D34', // danger
        700: '#7F242A',
        800: '#5F1B1F',
        900: '#401215',
      },
      warning: {
        50: '#FBF1EF',
        100: '#F7E4DE',
        200: '#F3D6CE',
        300: '#EBBBAD',
        400: '#E3A08C',
        500: '#DB856B',
        600: '#D36A4A', // warning
        700: '#C55330',
        800: '#A44528',
        900: '#833720',
      },
      success: {
        50: '#e7e9e8',
        100: '#DEE3DE',
        200: '#D3DAD3',
        300: '#BCC7BD',
        400: '#A6B5A7',
        500: '#90A291',
        600: '#758C76', // success
        700: '#667A67',
        800: '#546454',
        900: '#414E42',
      },
      info: {
        50: '#EDF8FD',
        100: '#C7E9F9',
        200: '#A2DAF6',
        300: '#7DCBF2',
        400: '#45B5ED',
        500: '#1282BA',
        600: '#1175A7', // info
        700: '#0D5B82',
        800: '#09415D',
        900: '#052839',
      },
      highlight: {
        400: '#a85751',
      },
    },
    fontConfig: {
      Jost: {
        400: {
          normal: 'Jost_400Regular',
        },
      },
      LexendDeca: {
        300: {
          normal: 'LexendDeca_300Light',
        },
        400: {
          normal: 'LexendDeca_400Regular',
        },
        700: {
          normal: 'LexendDeca_700Bold',
        },
      },
    },
    fonts: {
      heading: 'Jost',
      body: 'LexendDeca',
      mono: 'LexendDeca',
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  };
  return theme;
}
