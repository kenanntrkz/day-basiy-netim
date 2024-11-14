import { createTheme, MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  primaryColor: 'teal',
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'md',
      },
    },
  },
});