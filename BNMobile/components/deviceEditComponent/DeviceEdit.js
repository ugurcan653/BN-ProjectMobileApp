import Styles from './Styles';

import React, { Component } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import {
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  CameraIcon,
  CloseOutlineIcon,
} from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
// import Slider from '@react-native-community/slider';
import ImagePicker from 'react-native-image-picker';

const options={
  title: 'Add image',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
  }

export default class DeviceEdit extends Component {
  profile = Profile.jenniferGreen();

  constructor(props) {
    super(props);
    this.state = {
      name: 'adsa',
      type: 'Çakar',
      securityArea: 'ugurcakar@hotmail.com',
      avatarSource: this.profile.photo,
      pic:null
    };
  }

  onSignUpButtonPress = () => {
    navigation && navigation.navigate('SignUp2');
  };
  myfun=()=>{
    //alert('clicked');
  
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
  
      else {
        let source = { uri: response.uri };
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
        this.setState({
          avatarSource: source,
          pic:response.data
        });
      }
    });
  }
  
  setEmail = () => { };
  renderPhotoButton = () => (
    <Button style={Styles.editAvatarButton} status={'info'} icon={CameraIcon}  onPress={this.myfun}/>
  );
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <ProfileAvatar
          style={Styles.profileAvatar}
          source={this.state.avatarSource}
          editButton={this.renderPhotoButton}
        />
        <Layout style={Styles.formContainer} level="1">
          <Input
            style={this.state.name ? Styles.input : Styles.emptyInput}
            value={this.state.name}
            label="Cihaz adı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onIconPress={() => this.setState({ name: '' })}
          />
          <Input
            style={this.state.type ? Styles.input : Styles.emptyInput}
            value={this.state.type}
            label="Türü"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onIconPress={() => this.setState({ type: '' })}
          />
          <Input
            style={this.state.securityArea ? Styles.input : Styles.emptyInput}
            value={this.state.securityArea}
            label="Güvenlik aralığı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onIconPress={() => this.setState({ securityArea: '' })}
            keyboardType={'numeric'}
          />
          {/* <Text style={{fontSize:responsiveFontSize(2)}}>Güvenlik aralığı</Text>
          <Slider
          maximumValue={200}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          step={1}
          value={this.state.sliderValue}
          onValueChange={(sliderValue) => this.setState({ sliderValue })}
          style={{ width: '100%', height: '10%', marginTop:'2%' }}
        /> */}
        </Layout>
        <Button style={Styles.save} size="giant">
          Save Changes
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}
