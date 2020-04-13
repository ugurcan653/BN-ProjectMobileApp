import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import { EmailIcon, PhoneIcon, MapIcon } from './extra/icons';
import { ProfileAvatar } from './extra/profile-avatar.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default class FindDevice extends Component {
  state = {
    visible: true,
    name:'burak',
    image:''
  };
  toggleModal = () => {
    this.setState({
        visible:!this.state.visible
    })
  };

  renderModalElement = () => (
    <KeyboardAwareScrollView style={styles.bnBackgroundColor}>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar}
            resizeMode='center'
            source={require('./assets/image-person.png')}
          />
        </View>
        <View style={styles.socialAuthContainer}>
        <Text style={styles.socialAuthHintText}
            status='control'
            category="h6">
            Bulunan Cihaz
          </Text>
          <Text style={styles.socialAuthHintText}
            status='control'
            category="p1">
            {this.state.name}
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              icon={MapIcon}
            >
            </Button>
            <Button
              appearance='ghost'
              size='giant'
              icon={EmailIcon}
            >
            </Button>
            <Button
              appearance='ghost'
              size='giant'
              icon={PhoneIcon}>
            </Button>
          </View>
        </View>
    </KeyboardAwareScrollView>
  );

  render() {
    return (
      <Layout style={styles.container}>
        <Modal
          backdropStyle={styles.backdrop}
          onBackdropPress={this.toggleModal}
          visible={this.state.visible}>
          {this.renderModalElement()}
        </Modal>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    alignSelf: 'center',
    borderColor:'#55AFFB',
    borderRadius:46,
    borderWidth:1,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  buttonColor:{
    color:'#55AFFB'
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:'10%'
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 8,
    color:'#55AFFB'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  editAvatarButton: {
    width: 32,
    height: 32
  },
  backdrop: {
    // backgroundColor: 'rgba(0, 0, 0, 0.9)'
    backgroundColor:'#55AFFB'
  },
  bnBackgroundColor:{
      backgroundColor:"white",
      marginVertical:'20%',
      marginHorizontal:'10%',
      borderRadius:15,
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
  }
});
