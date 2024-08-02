import { useColorScheme as useColorSchemeRN } from 'react-native';

const useColorScheme = () => {
  // Set light theme as default
  return 'light';
  return useColorSchemeRN() === 'dark' ? 'dark' : 'light';
} 

export {
  useColorScheme,
};
