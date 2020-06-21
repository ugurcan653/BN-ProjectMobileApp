import Styles from './Styles';
import React, { Component } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon, EyeIcon, EyeOffIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProfileActions from "../../redux/actions/profileActions";
import * as ProfileEditActions from "../../redux/actions/profileEditActions";
import * as changePassActions from "../../redux/actions/changePassActions";
import { Actions } from 'react-native-router-flux';
import Success from '../../modals/successModal/Success';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { responsiveWidth } from "react-native-responsive-dimensions";
import * as LoginActions from "../../redux/actions/loginActions";
import * as LogoutActions from "../../redux/actions/logoutActions";
import md5 from 'md5';
import {Alert} from 'react-native';
class ChangePass extends Component {
  isValid ={
    passwordIsValid: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      currentPass:'',  
      checkPass: '',
      newPass:'',
      checkNewPass:'',
      id:'',
      checkNewPassVisible: false,
      newPassVisible:false,
      checkPassVisible:false,
      visible: false
    };
    props.actions.getProfile([this.props.login]);
  }
  toggleModal = () => {
    this.setState({
        visible:!this.state.visible
    })
  };
  onPress(state)
  {
    let hashCheckPass=md5(state.checkPass);
    let hashNewPass=md5(state.newPass);
    let hashCheckNewPass=md5(state.checkNewPass);
    if(hashCheckPass==state.currentPass && hashNewPass==hashCheckNewPass && hashNewPass!=hashCheckPass)
    {
        if(this.isFormValid())
        {
          var paramsValues=[hashCheckPass, hashNewPass, hashCheckNewPass, state.id];
          this.props.actions.putChangePass(paramsValues)
        }else{
          Alert.alert(
            "Hata!",
          "Verileriniz hatalı",
          [
            { text: "Tamam"}
          ],
          { cancelable: false }
          )
        }
    }
    else{
      Alert.alert(
        "Hata!",
      "Verileriniz hatalı",
      [
        { text: "Tamam"}
      ],
      { cancelable: false }
      )
    }
    
  }
  goToProfile = () =>
  {
    this.toggleModal();
    Actions.replace("ProfileAccount")
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
  regPassword = (password) => {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(re.test(password))
    {
      this.isValid.passwordIsValid=true
      return true
    }
    else{
      this.isValid.passwordIsValid=false
      return false
    }
  }
  onNewPassIconPress = () => {
    this.setState({
        newPassVisible:!this.state.newPassVisible
    })
  };
  onCheckNewPassIconPress = () => {
    this.setState({
        checkNewPassVisible:!this.state.checkNewPassVisible
    })
  };
  onCheckPassIconPress = () => {
    this.setState({
        checkPassVisible:!this.state.checkPassVisible
    })
  };
  componentDidMount = () =>{
    this.setState({
      id:this.props.profil.user_id,
      currentPass:this.props.profil.user_password
    })
  }
  componentDidUpdate()
  {
    if(this.props.passwordEdit.error==false)
    {
      this.props.actions.clearChangePass("");
      this.toggleModal()
      setTimeout(
        () => {
          this.logout() 
        },
        3000);
    }
    if(this.props.passwordEdit.error==true)
    {
      this.props.actions.clearChangePass("");
      //Actions.replace("Error")
      Alert.alert(
        "Hata!",
      "Verileriniz hatalı",
      [
        { text: "Tamam"}
      ],
      { cancelable: false }
    );
    }
  }
  logout = () => {
    this.props.actions.setLogout("logout");
    this.props.actions.setToken("")
  }
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <Layout style={Styles.formContainer} level="1">
          <Input
            style={Styles.input}
            value={this.state.checkPass}
            label="Geçerli şifre"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={this.state.checkPassVisible ? EyeIcon : EyeOffIcon}
            onChangeText={item => this.setState({ checkPass:item})}
            captionStyle={Styles.red}
            secureTextEntry={!this.state.checkPass}
            onIconPress={this.onCheckPassIconPress}
          />
          <Input
            style={this.regPassword(this.state.newPass) ? Styles.successInput : this.state.newPass=='' ? Styles.input : Styles.emptyInput}
            value={this.state.newPass}
            label="Yeni şifre"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={this.state.newPassVisible ? EyeIcon : EyeOffIcon}
            onChangeText={item => this.setState({ newPass:item})}
            captionStyle={Styles.red}
            secureTextEntry={!this.state.newPassVisible}
            onIconPress={this.onNewPassIconPress}
          />
          <Input
            style={(this.isValid.passwordIsValid==true && this.state.newPass==this.state.checkNewPass) ? Styles.successInput : this.state.checkNewPass=='' ? Styles.input : Styles.emptyInput}
            value={this.state.checkNewPass}
            label="Tekrar yeni şifre"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={this.state.checkNewPassVisible ? EyeIcon : EyeOffIcon}
            onChangeText={item => this.setState({ checkNewPass:item})}
            captionStyle={Styles.red}
            secureTextEntry={!this.state.checkNewPassVisible}
            onIconPress={this.onCheckNewPassIconPress}
          />
        </Layout>
        <Button 
        onPress={() => this.onPress(this.state)}
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor} >
          Değişiklikleri kaydet
        </Button>
        <Success visible={this.state.visible} ></Success>
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    profil: state.profileReducer,
    token:state.loginReducer,
    profileEdit:state.profileEditReducer,
    passwordEdit:state.changePassReducer,
    logout:state.logoutReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
      putProfileEdit: bindActionCreators(ProfileEditActions.putProfileEdit, dispatch),
      putChangePass: bindActionCreators(changePassActions.setPassword, dispatch),
      clearChangePass: bindActionCreators(changePassActions.changePassword, dispatch),
      setLogout: bindActionCreators(LogoutActions.logout, dispatch),
      setToken: bindActionCreators(LoginActions.getToken, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);