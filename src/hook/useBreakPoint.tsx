import { useWindowDimensions } from 'react-native';

export const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isSmall: width < 400,
    isMedium: width >= 400 && width < 880,
    isLarge: width >= 880,
    isTablet: width >= 1024,
  };
};
