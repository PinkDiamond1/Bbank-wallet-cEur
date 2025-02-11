import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import SegmentedControl from 'src/components/SegmentedControl'
import Share from 'src/icons/Share'
import Times from 'src/icons/Times'
import { TopBarIconButton } from 'src/navigator/TopBarButton'
import { shareQRCode, SVG } from 'src/send/actions'
import colors from 'src/styles/colors'

type Props = MaterialTopTabBarProps & {
  qrSvgRef: React.MutableRefObject<SVG>
}

export default function QRTabBar({ state, descriptors, navigation, position, qrSvgRef }: Props) {
  const dispatch = useDispatch()

  const values = useMemo(
    () =>
      state.routes.map((route) => {
        const { options } = descriptors[route.key]
        const label = options.title !== undefined ? options.title : route.name
        return label
      }),
    [state, descriptors]
  )

  const shareOpacity = Animated.interpolateNode(position, {
    inputRange: [0, 0.1],
    outputRange: [1, 0],
  })

  const color = Animated.interpolateColors(position, {
    inputRange: [0.9, 1],
    outputColorRange: [colors.dark, colors.light],
  })

  const onPressClose = () => {
    navigation.dangerouslyGetParent()?.goBack()
  }

  const onPressShare = () => {
    dispatch(shareQRCode(qrSvgRef.current))
  }

  const onChange = (value: string, index: number) => {
    const route = state.routes[index]
    const isFocused = index === state.index

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.leftContainer}>
        <TopBarIconButton icon={<Times color={color} />} onPress={onPressClose} />
      </View>
      <SegmentedControl
        values={values}
        selectedIndex={state.index}
        position={position}
        onChange={onChange}
      />
      <Animated.View
        style={[styles.rightContainer, { opacity: shareOpacity }]}
        pointerEvents={state.index > 0 ? 'none' : undefined}
      >
        <TopBarIconButton icon={<Share />} onPress={onPressShare} />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  leftContainer: {
    width: 50,
    alignItems: 'center',
  },
  rightContainer: {
    width: 50,
    alignItems: 'center',
  },
})
