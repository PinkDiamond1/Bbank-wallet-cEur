import * as React from 'react'
import { WithTranslation } from 'react-i18next'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { withTranslation } from 'src/i18n'
import { RootState } from 'src/redux/reducers'
import { isAppConnected, isAppSynced } from 'src/redux/selectors'
import colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'

interface StateProps {
  fornoEnabled: boolean
  appConnected: boolean
  appSynced: boolean
}

type Props = StateProps & WithTranslation

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fornoEnabled: state.web3.fornoMode,
    appConnected: isAppConnected(state),
    appSynced: isAppSynced(state),
  }
}

class DisconnectBanner extends React.PureComponent<Props> {
  // This component is used in many screens but needs to remember when the app  been conneted.
  // This flag tracks that. Could move to redux but no need yet as it's the only consumer
  static hasAppConnected = false
  static hasAppSynced = false

  componentDidUpdate() {
    if (this.props.appConnected && !DisconnectBanner.hasAppConnected) {
      DisconnectBanner.hasAppConnected = true
    }
    if (this.props.appSynced && !DisconnectBanner.hasAppSynced) {
      DisconnectBanner.hasAppSynced = true
    }
  }

  render() {
    const { t, appConnected, appSynced, fornoEnabled } = this.props
    const appSyncedIfNecessary = appSynced || fornoEnabled

    // App's connected: show nothing
    if (appConnected && appSyncedIfNecessary) {
      return null
    }

    // App's connected, was synced, and now resyncing to new blocks: show nothing
    if (appConnected && !appSyncedIfNecessary && DisconnectBanner.hasAppSynced) {
      return null
    }

    // App's not connected but was before: show red banner
    if (!appConnected && DisconnectBanner.hasAppConnected) {
      return (
        <Text style={[styles.text, styles.textRed]}>
          <Text style={fontStyles.regular600}>{t('poorConnection.0')}</Text> {t('poorConnection.1')}
        </Text>
      )
    }

    // App is connecting for first time, show grey banner
    return (
      <Text
        style={[styles.text, styles.textGrey, fontStyles.regular600]}
        testID="connectingToCeloBanner"
      >
        {t('connectingToCelo')}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    ...fontStyles.small,
    textAlign: 'center',
    // Unset explicit lineHeight set by fonts.tsx otherwise the text is not centered vertically
    lineHeight: undefined,
  },
  textGrey: {
    color: colors.gray4,
  },
  textRed: {
    color: colors.warning,
  },
})

export default connect<StateProps, {}, {}, RootState>(mapStateToProps)(
  withTranslation<Props>()(DisconnectBanner)
)
