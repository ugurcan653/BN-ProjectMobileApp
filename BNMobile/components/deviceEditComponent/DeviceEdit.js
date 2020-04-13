import Styles from './Styles';
import React, { Component } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconEditAction from "../../redux/actions/beaconEditActions";
const options={
  title: 'Add image',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
  }

class DeviceEdit extends Component {
  profile = Profile.jenniferGreen();
  isValid ={
    nameIsValid: false,
    typeIsValid: false,
    securityAreaIsValid: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      securityArea: '',
      avatarSource: this.profile.photo,
      pic:null
    };
  }
  componentDidMount(){
    this.setState({
      name:this.props.beacon.beacon_name,
      type:this.props.beacon.type,
      securityArea:this.props.beacon.variance+""
    })
  }
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
  renderPhotoButton = () => (
    <Button style={Styles.editAvatarButton} status={'info'} icon={CameraIcon}  onPress={this.myfun}/>
  );
  onPress(state)
  {
    console.log(state)
    this.regName(state.name);
    this.regType(state.type);
    this.regSecurityArea(state.securityArea);
    if(this.isFormValid())
    {
      console.log("form geçerli")
      var paramsNames=["name","type","variance","beaconID"];
      var paramsValues=[state.name, state.type, state.securityArea, this.props.beacon.deviceId];
      this.props.actions.putBeaconEdit("updatedevice",paramsNames,paramsValues)
    }else{
      console.log("form geçersiz")
    }
  }
  isFormValid = () => {
    for (const item in this.isValid) {
      if(this.isValid[item]==false)
      {
        return false
      }
    }
    return true;
  }
  regName = (name) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(name))
    {
      this.isValid.nameIsValid=true
      return true
    }
    else{
      this.isValid.nameIsValid=false
      return false
    }
  }
  regType = (type) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(type))
    {
      this.isValid.typeIsValid=true
      return true
    }
    else{
      this.isValid.typeIsValid=false
      return false
    }
  }
  regSecurityArea = (securityArea) => {
    var re = /^(?:[1-9]|(?:[1-9][0-9])|(?:[1-4][0-9][0-9])|(?:500))$/;
    if(re.test(securityArea))
    {
      this.isValid.securityAreaIsValid=true
      return true
    }
    else{
      this.isValid.securityAreaIsValid=false
      return false
    }
  }
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
            style={this.regName(this.state.name) ? Styles.input : Styles.emptyInput}
            value={this.state.name}
            label="Cihaz adı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ name:item})}
            onIconPress={() => this.setState({ name: '' })}
            captionStyle={Styles.red}
            caption={this.regName(this.state.name) ? '' : 'Can not be empty'}
          />
          <Input
            style={this.regType(this.state.type) ? Styles.input : Styles.emptyInput}
            value={this.state.type}
            label="Türü"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ type:item})}
            onIconPress={() => this.setState({ type: '' })}
            captionStyle={Styles.red}
            caption={this.regType(this.state.type) ? '' : 'Can not be empty'}
          />
          <Input
            style={this.regSecurityArea(this.state.securityArea) ? Styles.input : Styles.emptyInput}
            value={this.state.securityArea}
            label="Güvenlik aralığı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ securityArea:item})}
            onIconPress={() => this.setState({ securityArea: '' })}
            keyboardType={'numeric'}
            captionStyle={Styles.red}
            caption={this.regSecurityArea(this.state.securityArea) ? '' : 'must be 0-500'}
          />
        </Layout>
        <Button 
        onPress={() => this.onPress(this.state)} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor}  >
          Save Changes
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    beaconEdit: state.beaconEditReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      putBeaconEdit: bindActionCreators(BeaconEditAction.putBeaconEdit, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(DeviceEdit);