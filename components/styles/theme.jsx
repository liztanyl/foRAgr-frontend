// eslint-disable-next-line camelcase
import { useFonts, Jost_400Regular } from '@expo-google-fonts/jost';
// eslint-disable-next-line camelcase
import { LexendDeca_300Light, LexendDeca_400Regular, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';

export default function () {
  const [fontsLoaded] = useFonts({
    Jost_400Regular, LexendDeca_300Light, LexendDeca_400Regular, LexendDeca_700Bold,
  });
  const theme = {
    colors: {
      // Add new color
      primary: {
        50: '#e7e9e8',
        100: '#758c76',
        200: '#135055',
        300: '#042725',
      },
      secondary: {
        100: '#f4dbbf',
        200: '#dbc6ae',
        300: '#66472c',
        400: '#5B3000',
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
