import Styles from './Styles';
import React, { Component } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconEditAction from "../../redux/actions/beaconEditActions";
import * as BeaconListAction from "../../redux/actions/beaconListActions";
import * as BeaconDetailAction from "../../redux/actions/beaconDetailActions";
import Success from '../../modals/successModal/Success';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Alert } from "react-native";

class DeviceEdit extends Component {
  isValid ={
    nameIsValid: false,
    securityAreaIsValid: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      securityArea: '',
      image:null,
      visible: false,
      image_logo:null,
      image_logo_uri:null,
      image_type:null
    };
  }
  componentDidMount(){
    this.setState({
      name:this.props.beacon.beacon_name,
      securityArea:this.props.beacon.variance+"",
      image:this.props.beacon.img
    })
  }
  componentDidUpdate()
  {
    if(this.props.beaconEdit.error==false)
    {
      this.toggleModal()
      this.props.actions.clearBeaconEdit("");
      this.props.actions.clearBeaconList("");
      this.props.actions.clearBeaconDetail("");
      setTimeout(
        () => {
          this.goToDevice() 
        },
        3000);
    }
    if(this.props.beaconEdit.error==true)
    {
      this.props.actions.clearBeaconEdit("");
      Alert.alert(
        "Hata!",
      "Verileriniz olması gereken değerlerin dışında",
      [
        { text: "Tamam"}
      ],
      { cancelable: false }
    );
      //Actions.replace("Error")
    }
  }
  renderPhotoButton = () => (
    <Button style={Styles.editAvatarButton} status={'info'} icon={CameraIcon} onPress={() =>this.show()}/>
  );
  show = () =>{
    this.ActionSheet.show()
  }

  getImage(index){
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      width: responsiveWidth(160),
      height: responsiveWidth(100),
      cropping: true,
      includeBase64:true,
      cropperToolbarTitle:'Düzenle'
    };
    if(index==0){
      ImagePicker.openPicker(options).then(image => {
        let source = { uri: 'data:'+image.mime+';base64,' + image.data };
        let typeNum=image.mime.indexOf('/');
        let type=image.mime.slice(typeNum+1);
        this.setState({
          image_logo: source,
          image_logo_uri:image.data,
          image_type:type
        });
      });
    }
    else if(index==1){
    ImagePicker.openCamera(options).then(image => {
      let source = { uri: 'data:'+image.mime+';base64,' + image.data };
      let typeNum=image.mime.indexOf('/');
      let type=image.mime.slice(typeNum+1);
      this.setState({
        image_logo: source,
        image_logo_uri:image.data,
        image_type:type
      });
    });
    }
      }
  onPress(state)
  {
    this.regName(state.name);
    this.regSecurityArea(state.securityArea);
    if(this.isFormValid())
    {
      var paramsValues=[state.name, state.securityArea, state.image_logo_uri, state.image_type, this.props.beacon.deviceId];
      this.props.actions.putBeaconEdit(paramsValues)
    }else{
      //Actions.replace("Error")
      Alert.alert(
        "Hata!",
      "Verileriniz olması gereken değerlerin dışında",
      [
        { text: "Tamam"}
      ],
      { cancelable: false }
    );
    }
  }
  goToDevice = () =>
  {
    this.toggleModal();
    Actions.replace("Device")
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
  toggleModal = () => {
    this.setState({
        visible:!this.state.visible
    })
  };
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <ProfileAvatar
          style={Styles.profileAvatar}
          source={this.state.image_logo ? this.state.image_logo : this.state.image ? {uri:this.state.image} : {uri:'https://lh6.googleusercontent.com/proxy/Bqqq2DHYLI-9bYWmUQkSz7UdLfvGavr6tPysMgBl6y7GDFFwc1dwlxqOr0tCtkWVVRfXI9j-fx-0LM5f-GW2jWfm4aCIkj5HJmwDuTL8h4mh5uzlR0plpUk'}}
          editButton={this.renderPhotoButton}
        />
        <Layout style={Styles.formContainer} level="1">
          <Input
            style={this.regName(this.state.name) ? Styles.successInput : this.state.name=='' ? Styles.input : Styles.emptyInput}
            value={this.state.name}
            label="Cihaz adı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ name:item})}
            onIconPress={() => this.setState({ name: '' })}
            captionStyle={Styles.red}
            caption={this.regName(this.state.name) ? '' : 'Bu alan boş bırakılamaz'}
          />
          <Input
            style={this.regSecurityArea(this.state.securityArea) ? Styles.successInput : this.state.securityArea=='' ? Styles.input : Styles.emptyInput}
            value={this.state.securityArea}
            label="Güvenlik aralığı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ securityArea:item})}
            onIconPress={() => this.setState({ securityArea: '' })}
            keyboardType={'numeric'}
            captionStyle={Styles.red}
            caption={this.regSecurityArea(this.state.securityArea) ? '' : 'Değer 0-500 arasında olmalıdır'}
          />
        </Layout>
        <Button 
        onPress={() => this.onPress(this.state)} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor}  >
          Değişiklikleri kaydet
        </Button>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Yüklemeyi nasıl yapacaksınız?'}
          options={['Telefondan fotoğraf seç.', 'Kameradan fotoğraf çek.', 'İptal']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => this.getImage(index)}
        />
        <Success visible={this.state.visible}></Success>
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    beaconEdit: state.beaconEditReducer,
    beaconList: state.beaconListReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      putBeaconEdit: bindActionCreators(BeaconEditAction.putBeaconEdit, dispatch),
      clearBeaconEdit: bindActionCreators(BeaconEditAction.beaconEdit, dispatch),
      clearBeaconList: bindActionCreators(BeaconListAction.beaconList, dispatch),
      clearBeaconDetail: bindActionCreators(BeaconDetailAction.beaconDetailList, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(DeviceEdit);