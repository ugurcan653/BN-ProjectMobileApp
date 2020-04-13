// import React, {Component} from 'react';
// import {View, Text, Button, TextInput} from 'react-native';
// import Styles from './Styles';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// export default class SignIn extends Component {
//   render() {
//     return (
//       <View style={Styles.container}>
//         <View style={Styles.header}>
//           <Text style={Styles.benimkiNerede}>Benimki Nerede?</Text>
//         </View>
//         <View style={Styles.main}>
//           <Text style={Styles.signIn}>Giriş Yap</Text>
//           <TextInput
//             style={Styles.textInput}
//             placeholderTextColor="#55AFFB"
//             placeholder="example@example.example"
//           />
//           <TextInput
//             style={Styles.textInput}
//             placeholderTextColor="#55AFFB"
//             placeholder="parola"
//           />
//           <Text style={Styles.newAccount}>
//             Hesabın yok mu? Buraya tıklayarak kaydolabilirsin.
//           </Text>
//           <View style={Styles.vertical}>
//             <View>
//               <Icon
//                 style={Styles.icons}
//                 name={'facebook'}
//                 color={'#55AFFB'}
//                 size={30}></Icon>
//             </View>
//             <View>
//               <Icon
//                 style={Styles.icons}
//                 name={'google-plus'}
//                 color={'#55AFFB'}
//                 size={30}></Icon>
//             </View>
//             <View>
//               <Icon
//                 style={Styles.icons}
//                 name={'twitter'}
//                 color={'#55AFFB'}
//                 size={30}></Icon>
//             </View>
//           </View>
//         </View>
//         <View style={Styles.footer}>
//           <Button style={Styles.SignInButton} title="Giriş Yap" />
//         </View>
//       </View>
//     );
//   }
// }


import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon, PersonIcon, GoogleIcon, FacebookIcon, TwitterIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../redux/actions/loginActions";
import { Actions } from 'react-native-router-flux';
import * as ProfileActions from "../../redux/actions/profileActions";
class SıgnIn extends Component {

  state={
    email:"",
    password:"",
    passwordVisible:false
  }

  onSignUpButtonPress(){
    var paramsNames=["email","password"];
    var paramsValues=["den55@gmail.com","8f10d078b2799206cfe914b32cc6a5e9"];
    this.props.actions.getToken("login",paramsNames,paramsValues);
  }
  componentDidMount(){
  }
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible:!this.state.passwordVisible
    })
  };

  render()
  {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            category='h2'
            status='control'>
            Benimki Nerede?
          </Text>
          <Text
            style={styles.signInLabel}
            category='h6'
            status='control'>
            Giriş Yap
          </Text>
        </View>
        <Layout
          style={styles.formContainer}
          level='1'>
          <Input
            style={this.state.email ? styles.input : styles.emptyInput}
            placeholder='Email'
            icon={PersonIcon}
            value={this.state.email}
            onChangeText={item => this.setState({email:item})}
            textStyle={styles.bnColor}
          />
          <Input
            style={this.state.password ? styles.input : styles.emptyInput}
            placeholder='Password'
            textStyle={styles.bnColor}
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            value={this.state.password}
            onChangeText={item => this.setState({password:item})}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
          />
          <Button
          style={styles.signInButton}
          textStyle={styles.buttonColor}
          size='giant'
          onPress={() => this.onSignUpButtonPress()}>
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
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
        
        <Button
          textStyle={styles.bnColor}
          style={styles.signUpButton}
          appearance='ghost'
          status='basic'
          >
          Don't have an account? Create
        </Button>
        </Layout>
        
      </KeyboardAwareScrollView>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F0F3F6'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: '#55AFFB',
  },
  buttonColor: {
    color:"white"
  },
  bnColor: {
    color:'#55AFFB'
  },
  formContainer: {
    flex: 1,
    paddingTop:'5%',
    paddingHorizontal:'5%',
    backgroundColor:'#F0F3F6'
  },
  signInButton: {
    marginVertical:'4%',
    backgroundColor:'#55AFFB',
    borderColor:'#55AFFB',
    borderRadius:15
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16
  },
  input: {
    marginTop:'4%',
    borderColor: '#55AFFB',
  },
  emptyInput:{
    marginTop:'4%',
    borderColor: '#FF3D71',
  }, 
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
    color:'#55AFFB'
  },
});

function mapStateToProps(state) {
  return {
    login: state.loginReducer,
    profile: state.profileReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getToken: bindActionCreators(LoginActions.getToken, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(SıgnIn);
