import Styles from './Styles';
import React, { Component } from 'react';
import { Button, Input, Layout, Spinner } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon, EyeIcon, EyeOffIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProfileActions from "../../redux/actions/profileActions";
import * as ProfileEditActions from "../../redux/actions/profileEditActions";
import { Actions } from 'react-native-router-flux';
import Success from '../../modals/successModal/Success';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { View, Alert,RefreshControl } from 'react-native';

class ProfileAccount extends Component {
  isValid ={
    nameIsValid: false,
    surnameIsValid: false,
    emailIsValid: false,
    phoneIsValid: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      id:'',
      user_img:null,
      passwordVisible: false,
      visible: false,
      image_logo:null,
      image_logo_uri:null,
      image_type:null,
      spinner: false,
      refreshing:false
    };
    props.actions.getProfile([props.token])
  }
  componentDidUpdate()
  {
    if(this.props.profileEdit.error==false)
    {
      this.props.actions.clearProfileEdit("");
      this.props.actions.clearProfile("");
      this.toggleModal()
      setTimeout(
        () => {
          this.goToDevice() 
        },
        3000);
    }
    if(this.props.profileEdit.error==true)
    {
      this.props.actions.clearProfileEdit("");
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
    if(this.props.profil.error == false && this.state.spinner == false)
    {
      this.setState({
        name:this.props.profil.user_real_name,
        surname:this.props.profil.user_surname,
        email:this.props.profil.user_mail,
        phone:this.props.profil.user_phone,
        id:this.props.profil.user_id,
        user_img:this.props.profil.user_img,
        spinner:true
      })
    }
  }
  toggleModal = () => {
    this.setState({
        visible:!this.state.visible
    })
  };
  onPress(state)
  {
    this.regName(state.name);
    this.regSurname(state.surname);
    this.regEmail(state.email);
    this.regPhone(state.phone);
    
    if(this.isFormValid())
    {
      var paramsValues=[state.name, state.surname, state.email, state.phone, state.image_logo_uri, state.image_type, state.id];
      this.props.actions.putProfileEdit(paramsValues)
    }else{
      Alert.alert(
        "Hata!",
      "Verileriniz olması gereken değerlerin dışında",
      [
        { text: "Tamam"}
      ],
      { cancelable: false }
      )
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
  regSurname = (surname) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(surname))
    {
      this.isValid.surnameIsValid=true
      return true
    }
    else{
      this.isValid.surnameIsValid=false
      return false
    }
  }
  regEmail = (email) => {
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(re.test(email))
    {
      this.isValid.emailIsValid=true
      return true
    }
    else{
      this.isValid.emailIsValid=false
      return false
    }
  }
  regPhone = (phone) => {
    var re = /^[+]([0-9]{2})[0-9]{10}$/;
    if(re.test(phone))
    {
      this.isValid.phoneIsValid=true
      return true
    }
    else{
      this.isValid.phoneIsValid=false
      return false
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
  onChangePasswordButtonPress = () => {
    Actions.replace("ChangePass")
  }
  renderLoading = () => (
    <View style={Styles.loading}>
      <Spinner/>
    </View>
  );
  _onRefresh(){
    this.setState({refreshing: true, spinner:false}, function(){
      this.props.actions.getProfile([this.props.token])
    });
      this.setState({refreshing: false});
  }
  render() {
    return (
      <View style={Styles.container}>
      <KeyboardAwareScrollView 
      contentContainerStyle={{
      flex: 1
      }}
        refreshControl={
          <RefreshControl
            colors={['#55AAFB']}
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
      >
         {
          this.state.spinner == false ?
          this.renderLoading()
        :
        <View>
          <ProfileAvatar
        style={Styles.profileAvatar}
        source={this.state.image_logo ?this.state.image_logo : {uri:this.state.user_img}}
        editButton={this.renderPhotoButton}
          />
      <Layout style={Styles.formContainer} level="1">
        <Input
          style={this.regName(this.state.name) ? Styles.successInput : this.state.name=='' ? Styles.input : Styles.emptyInput}
          value={this.state.name}
          label="İsim"
          labelStyle={Styles.customizeLabelStyle}
          textStyle={Styles.customizeTextStyle}
          icon={CloseOutlineIcon}
          onChangeText={item => this.setState({ name:item})}
          onIconPress={() => this.setState({ name: '' })}
          captionStyle={Styles.red}
          caption={this.regName(this.state.name) ? '' : 'Bu alan boş bırakılamaz'}
        />
        <Input
          style={this.regSurname(this.state.surname) ? Styles.successInput : this.state.surname=='' ? Styles.input : Styles.emptyInput}
          value={this.state.surname}
          label="Soyisim"
          labelStyle={Styles.customizeLabelStyle}
          textStyle={Styles.customizeTextStyle}
          icon={CloseOutlineIcon}
          onChangeText={item => this.setState({ surname:item})}
          onIconPress={() => this.setState({ surname: '' })}
          captionStyle={Styles.red}
          caption={this.regSurname(this.state.surname) ? '' : 'Bu alan boş bırakılamaz'}
        />
        <Input
         style={this.regEmail(this.state.email) ? Styles.successInput : this.state.email=='' ? Styles.input : Styles.emptyInput}
         value={this.state.email}
         label="Email"
         labelStyle={Styles.customizeLabelStyle}
         textStyle={Styles.customizeTextStyle}
         icon={CloseOutlineIcon}
         onChangeText={item => this.setState({ email:item})}
         onIconPress={() => this.setState({ email: '' })}
         captionStyle={Styles.red}
         caption={this.regEmail(this.state.email) ? '' : 'Geçerli bir email giriniz'}
        />
        <Input
          style={this.regPhone(this.state.phone) ? Styles.successInput : this.state.phone=='' ? Styles.input : Styles.emptyInput}
          value={this.state.phone}
          label="Telefon numarası"
          labelStyle={Styles.customizeLabelStyle}
          textStyle={Styles.customizeTextStyle}
          icon={CloseOutlineIcon}
          onChangeText={item => item==''? this.setState({phone:'+90'}):this.setState({ phone:item})}
          onIconPress={() => this.setState({ phone: '+90' })}
          captionStyle={Styles.red}
          caption={this.regPhone(this.state.phone) ? '' : 'Geçerli bir telefon numarası giriniz'}
          keyboardType={'numeric'}
          maxLength = {13}
        />
        <View style={Styles.changePasswordContainer}>
        <Button
          style={Styles.changePasswordButton}
          appearance='ghost'
          status='basic'
          onPress={() => this.onChangePasswordButtonPress()}>
          Şifre değiştir
        </Button>
      </View>
      </Layout>
      <Button 
      onPress={() => this.onPress(this.state)}
      style={Styles.save} 
      size="giant" 
      textStyle={Styles.buttonColor} >
        Değişiklikleri kaydet
      </Button>
      <Success visible={this.state.visible} ></Success>
      <ActionSheet
        ref={o => this.ActionSheet = o}
        title={'Yüklemeyi nasıl yapacaksınız?'}
        options={['Telefondan fotoğraf seç.', 'Kameradan fotoğraf çek.', 'İptal']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => this.getImage(index)}
      />
        </View>
        
         }
        
      </KeyboardAwareScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    profil: state.profileReducer,
    token:state.loginReducer,
    profileEdit:state.profileEditReducer,
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
      clearProfile: bindActionCreators(ProfileActions.profile, dispatch),
      putProfileEdit: bindActionCreators(ProfileEditActions.putProfileEdit, dispatch),
      clearProfileEdit: bindActionCreators(ProfileEditActions.profileEdit, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAccount);