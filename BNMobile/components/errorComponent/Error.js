import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Layout, Text} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
import Styles from './Styles';
export default class Error extends Component {
  goToDevice = () =>
  {
    Actions.replace("Device")
  }
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.bnBackgroundColor}>
      <View style={[Styles.headerContainer,Styles.profileAvatar]}>
          <FAIcon style={{color:'#55AFFB'}} size={50} name={'times'}></FAIcon>
      </View>
      <View style={Styles.socialAuthContainer}>
        <Text style={Styles.socialAuthHintText}
          status='control'
          category="h2">
            HATA
        </Text>
        <Text style={Styles.socialAuthHintText}
          status='control'
          category="h6">
           Devam etmek için lütfen butona tıklayınız
        </Text>
        <View style={Styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='white'
              style={Styles.button}
              onPress={() => this.goToDevice()}>
                Tamam
            </Button>
        </View>
      </View>
  </KeyboardAwareScrollView>
    );
  }
}
