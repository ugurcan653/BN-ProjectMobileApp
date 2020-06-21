import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import { SearchIcon } from './extra/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '@ui-kitten/components';
export default class Scanner extends Component {
  state = {
    visible: false,
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
          <Button
            style={styles.profileAvatar}
            appearance='ghost'
              size='giant'
            icon={SearchIcon}
          />
        </View>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText}
            status='control'
            category="h6">
            Tarama Yapılıyor
          </Text>
        </View>
        <View style={styles.loading}>
        <Spinner size='giant' status='info'/>
        </View>
    </KeyboardAwareScrollView>
  );

  render() {
    return (
      <Layout style={styles.container}>
        <Button onPress={this.toggleModal}>TOGGLE MODAL</Button>
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
    minHeight: 176
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
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 8,
    color:'#55AFFB'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
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
      minWidth:220,
      minHeight:375,
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
  }
});
