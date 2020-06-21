import React, { Component } from 'react';
import { View, ToastAndroid} from 'react-native';
import { Button, Input, Layout, Text, Modal, Card } from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon, PersonIcon, GoogleIcon, FacebookIcon, TwitterIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../redux/actions/loginActions";
import { Actions } from 'react-native-router-flux';
import * as ProfileActions from "../../redux/actions/profileActions";
import * as LostPasswordActions from "../../redux/actions/lostPasswordActions";
import Styles from './Styles';
import md5 from 'md5';

class SıgnIn extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      email:"",
      password:"",
      passwordVisible:false,
      showError:false,
      lostEmail:"",
      lostEmailmodal:false,
      loadinglostEmail:false,
      toastVisible:false
    }
  }
  showToast(){
    if(this.props.getMail.error==false)
    {
      ToastAndroid.show("İşlem başarılı", ToastAndroid.SHORT);
    }
    if(this.props.getMail.error==true)
    {
      ToastAndroid.show("İşlem başarısız", ToastAndroid.SHORT);
    }
  }

  onSignUpButtonPress(){
    //var hash = md5("Deneme123*");
    //var paramsValues=["fbbrksvk@gmail.com",hash,this.props.getPush];
    //var paramsValues=["admin@gmail.com",hash,this.props.getPush];
    var paramsValues=[this.state.email,md5(this.state.password),this.props.getPush];
    this.props.actions.getToken(paramsValues);
  }
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible:!this.state.passwordVisible
    })
  };
  componentDidUpdate()
  {
    // if(this.props.login.error==false)
    // {
    //   Actions.drawerMenu();
    //   Actions.Device();
    // }
    // if(this.props.login.error==true)
    // {
    //   this.setState({
    //     showError:true
    //   })
    // }
    if(this.props.getMail.error==true && this.state.loadinglostEmail==false)
    {
      this.props.actions.clearMail("")
      this.setState({
        lostEmailmodal:false,
        loadinglostEmail:true
      })
      this.showToast()
    }
    if(this.props.getMail.error==false && this.state.loadinglostEmail==false)
    {
      this.props.actions.clearMail("")
      this.setState({
        lostEmailmodal:false,
        loadinglostEmail:true
      })
      this.showToast()
    }
  }
  sendEmail = (state) => {
    this.props.actions.setMail([state.lostEmail])
  }
  renderModal=() => (
    <Modal
        visible={this.state.lostEmailmodal}
        backdropStyle={Styles.backdrop}
        onBackdropPress={() => this.setState({lostEmailmodal:false})}>
        <Card disabled={true}>
          <Text>Lütfen kayıtlı mail adresinizi giriniz.</Text>
          <Input
            style={Styles.input}
            placeholder='Email'
            icon={PersonIcon}
            value={this.state.lostEmail}
            onChangeText={item => this.setState({lostEmail:item})}
            textStyle={Styles.bnColor}
          />
          <Button
          style={Styles.signInButton}
          textStyle={Styles.buttonColor}
          size='giant'
          onPress={() => this.sendEmail(this.state)}>
          GÖNDER
        </Button>
        </Card>
      </Modal>
  )
  render()
  {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Text
            category='h2'
            status='control'>
            Benimki Nerede?
          </Text>
          <Text
            style={Styles.signInLabel}
            category='h6'
            status='control'>
            Giriş Yap
          </Text>
        </View>
        <Layout
          style={Styles.formContainer}
          level='1'>
          <Input
            style={Styles.input}
            placeholder='Email'
            icon={PersonIcon}
            value={this.state.email}
            onChangeText={item => this.setState({email:item})}
            textStyle={Styles.bnColor}
          />
          <Input
            style={Styles.input}
            placeholder='Password'
            textStyle={Styles.bnColor}
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            value={this.state.password}
            onChangeText={item => this.setState({password:item})}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
          />
          {
            this.state.showError==true ?
            <Text
            style={Styles.error}
            status='danger'>
            Kullanıcı adı veya şifre hatalı
            </Text>:
            null
          }
          
          <Button
          style={Styles.signInButton}
          textStyle={Styles.buttonColor}
          size='giant'
          onPress={() => this.onSignUpButtonPress(this.state)}>
          GİRİŞ YAP
        </Button>
        <View style={Styles.socialAuthContainer}>
          <Text
            style={Styles.socialAuthHintText}
            status='control'>
            Bizi sosyal medya hesaplarımızdan takip edin!
          </Text>
          <View style={Styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              icon={FacebookIcon}
            />
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              icon={TwitterIcon}
            />
          </View>
        </View>
        {this.renderModal()}
        <Button
          textStyle={Styles.bnColor}
          style={Styles.signUpButton}
          appearance='ghost'
          status='basic'
          onPress={() => this.setState({lostEmailmodal:true})}
          >
          Şifreni mi unuttun? Tıkla!
        </Button>
        </Layout>
        
      </KeyboardAwareScrollView>
    );
  }
  
};
function mapStateToProps(state) {
  return {
    login: state.loginReducer,
    profile: state.profileReducer,
    getPush: state.pushReducer,
    getMail:state.lostPasswordReducer,
    all:state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getToken: bindActionCreators(LoginActions.getToken, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
      setMail: bindActionCreators(LostPasswordActions.getlostPassword, dispatch),
      clearMail: bindActionCreators(LostPasswordActions.lostPassword, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SıgnIn);
