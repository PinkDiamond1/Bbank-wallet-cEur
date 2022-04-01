import * as React from 'react'
import { Path, Svg } from 'react-native-svg'
import colors from 'src/styles/colors'

const Gift = () => {
  return (
    <Svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <Path
        d="M16 7.30187C16 3.82117 13.1649 0.986084 9.68421 0.986084C7.04561 0.986084 4.8 2.58608 3.84561 4.88784C1.6 5.84222 0 8.08784 0 10.6984C0 14.1791 2.83509 17.0142 6.31579 17.0142C8.95439 17.0142 11.2 15.4142 12.1544 13.1124C14.3719 12.158 16 9.9124 16 7.30187ZM6.31579 15.4422C3.70526 15.4422 1.57193 13.3089 1.57193 10.6984C1.57193 9.21064 2.27368 7.86328 3.36842 6.9931C3.36842 7.10538 3.36842 7.21766 3.36842 7.30187C3.36842 10.7826 6.20351 13.6177 9.68421 13.6177C9.82456 13.6177 9.93684 13.6177 10.0772 13.6177C9.17895 14.7405 7.83158 15.4422 6.31579 15.4422ZM10.9193 11.8773C10.5263 11.9896 10.1053 12.0457 9.68421 12.0457C7.07368 12.0457 4.94035 9.9124 4.94035 7.30187C4.94035 6.88082 4.99649 6.48784 5.10877 6.12293C5.50175 6.01065 5.92281 5.95451 6.34386 5.95451C8.95439 5.95451 11.0877 8.08784 11.0877 10.6984C11.0596 11.1194 11.0035 11.5124 10.9193 11.8773ZM12.6316 11.0071C12.6316 10.8949 12.6316 10.7826 12.6316 10.6984C12.6316 7.21766 9.79649 4.38257 6.31579 4.38257C6.17544 4.38257 6.06316 4.38257 5.92281 4.38257C6.79298 3.25977 8.14035 2.55801 9.65614 2.55801C12.2667 2.55801 14.4 4.69135 14.4 7.30187C14.4 8.81766 13.6982 10.137 12.6316 11.0071Z"
        fill={colors.greenUI}
      />
    </Svg>
  )
}

export default React.memo(Gift)
