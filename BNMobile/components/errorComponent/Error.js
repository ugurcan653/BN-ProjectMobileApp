import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Layout, Text} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
export default class Error extends Component {
  render() {
    return (
      <KeyboardAwareScrollView style={styles.bnBackgroundColor}>
      <View style={[styles.headerContainer,styles.profileAvatar]}>
          <FAIcon style={{color:'#55AFFB'}} size={50} name={'times'}></FAIcon>
      </View>
      <View style={styles.socialAuthContainer}>
        <Text style={styles.socialAuthHintText}
          status='control'
          category="h2">
            HATA
        </Text>
        <Text style={styles.socialAuthHintText}
          status='control'
          category="h6">
           Oy corona corona...
        </Text>
        <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='white'
              style={styles.button}>
                Tamam
            </Button>
        </View>
      </View>
  </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#55AFFB',
  },
  profileAvatar: {
    width: 92,
    height: 92,
    alignSelf: 'center',
    borderColor:'#55AFFB',
    borderRadius:46,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  socialAuthContainer: {
    marginTop: 30,
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 8,
    color:'#55AFFB'
  },
  backdrop: {
    // backgroundColor: 'rgba(0, 0, 0, 0.9)'
    backgroundColor:'#55AFFB'
  },
  bnBackgroundColor:{
      marginVertical:'20%',
      marginHorizontal:'10%',
      minWidth:220,
      minHeight:375
  }
});
