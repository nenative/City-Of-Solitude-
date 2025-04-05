import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: '#000000',
        color: 'white',
      },
    },
  },
  colors: {
    brand: {
      50: '#E6FFFD',
      100: '#B3FFF9',
      200: '#80FFF5',
      300: '#4DFFF1',
      400: '#1AFFED',
      500: '#00E6D6',
      600: '#00B3A8',
      700: '#00807A',
      800: '#004D4B',
      900: '#001A1D',
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 255, 242, 0.3)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      variants: {
        outline: {
          border: '2px solid',
          borderColor: 'cyan.400',
          color: 'cyan.400',
          _hover: {
            bg: 'rgba(0, 255, 242, 0.1)',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        letterSpacing: 'wider',
      },
    },
  },
});

export default theme; 