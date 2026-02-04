import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width, height: screenHeight } = Dimensions.get('window');

export default function WaveBackground() {
  return (
    <Svg
      width={width}
      height={screenHeight * 0.85}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <Path
        fill="#ffffff"
        d="
          M0,240
          C360,140 900,400 1440,280
          L1440,900
          L0,900
          Z
        "
      />
    </Svg>
  );
}
