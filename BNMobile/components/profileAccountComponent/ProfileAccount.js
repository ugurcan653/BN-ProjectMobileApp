// import Styles from './Styles';

// import React, {Component} from 'react';
// import {View, Image, StyleSheet} from 'react-native';
// import {Button, Input, Layout} from '@ui-kitten/components';
// import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Uğur',
//       surname: 'Çakar',
//       email: 'ugurcakar@hotmail.com',
//       phone: '5555555555',
//       password: 'baguvix',
//       passwordVisible: false,
//     };
//   }

//   onSignUpButtonPress = () => {
//     navigation && navigation.navigate('SignUp2');
//   };
//   onPasswordIconPress = () => {
//     this.setState({
//       passwordVisible: !this.state.passwordVisible,
//     });
//   };
//   setEmail = () => {};
//   render() {
//     return (
//       <KeyboardAwareScrollView>
//         <View style={Styles.container}>
//         <View style={Styles.headerContainer}>
//           <Image
//             style={Styles.headerImage}
//             source={{
//               uri:
//                 'https://lh6.googleusercontent.com/proxy/Bqqq2DHYLI-9bYWmUQkSz7UdLfvGavr6tPysMgBl6y7GDFFwc1dwlxqOr0tCtkWVVRfXI9j-fx-0LM5f-GW2jWfm4aCIkj5HJmwDuTL8h4mh5uzlR0plpUk',
//             }}
//           />
//         </View>
//         <Layout style={Styles.formContainer} level="1">
//         <Input
//             style={this.state.name ? Styles.input : Styles.emptyInput}
//             placeholder='name'
//             icon={PersonIcon}
//             value={this.state.name}
//             onChangeText={item => this.setState({name:item})}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.surname ? Styles.input : Styles.emptyInput}
//             placeholder='surname'
//             icon={PersonIcon}
//             value={this.state.surname}
//             onChangeText={item => this.setState({surname:item})}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.email ? Styles.input : Styles.emptyInput}
//             placeholder='Email'
//             icon={PersonIcon}
//             value={this.state.email}
//             onChangeText={item => this.setState({email:item})}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.phone ? Styles.input : Styles.emptyInput}
//             placeholder='Email'
//             icon={PersonIcon}
//             value={this.state.phone}
//             onChangeText={item => this.setState({phone:item})}
//             keyboardType={"numeric"}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.password ? Styles.input : Styles.emptyInput}
//             placeholder='Password'
//             textStyle={Styles.bnColor}
//             icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
//             value={this.state.password}
//             onChangeText={item => this.setState({password:item})}
//             secureTextEntry={!this.state.passwordVisible}
//             onIconPress={this.onPasswordIconPress}
//           />
//           <Button 
//             onPress={this.onPress} 
//             style={Styles.save} 
//             size="giant" 
//             textStyle={Styles.buttonColor} 
//             disabled={this.state.name && this.state.type && this.state.securityArea?false:true} >
//               Save Changes
//           </Button>
//         </Layout>
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
// // const Styles = StyleSheet.create({
// //   container: {
// //     backgroundColor:'#F0F3F6'
// //   },
// //   headerContainer: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     minHeight: 216,
// //     backgroundColor: '#55AFFB',
// //   },
// //   buttonColor: {
// //     color:"white"
// //   },
// //   save: {
// //     marginVertical:'4%',
// //     backgroundColor:'#55AFFB',
// //     borderColor:'#55AFFB',
// //     borderRadius:15
// //   },
// //   bnColor: {
// //     color:'#55AFFB'
// //   },
// //   formContainer: {
// //     flex: 1,
// //     paddingTop:'5%',
// //     paddingHorizontal:'5%',
// //     backgroundColor:'#F0F3F6'
// //   },
// //   signInButton: {
// //     marginVertical:'4%',
// //     backgroundColor:'#55AFFB',
// //     borderColor:'#55AFFB',
// //     borderRadius:15
// //   },
// //   signUpButton: {
// //     marginVertical: 12,
// //     marginHorizontal: 16
// //   },
// //   input: {
// //     marginTop:'4%',
// //     borderColor: '#55AFFB',
// //   },
// //   emptyInput:{
// //     marginTop:'4%',
// //     borderColor: '#FF3D71',
// //   }, 
// //   socialAuthContainer: {
// //     marginTop: 32,
// //   },
// //   socialAuthButtonsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-evenly',
// //   },
// //   socialAuthHintText: {
// //     alignSelf: 'center',
// //     marginBottom: 16,
// //     color:'#55AFFB'
// //   },
// // });



import Styles from './Styles';
import React, { Component } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon, EyeIcon, EyeOffIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProfileActions from "../../redux/actions/profileActions";
import * as ProfileEditActions from "../../redux/actions/profileEditActions";
import { Actions } from 'react-native-router-flux';

const options={
  title: 'Add image',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
  }

class ProfileAccount extends Component {
  profile = Profile.jenniferGreen();
  isValid ={
    nameIsValid: false,
    surnameIsValid: false,
    emailIsValid: false,
    phoneIsValid: false,
    passwordIsValid: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      id:'',
      passwordVisible: false,
      avatarSource: this.profile.photo,
      pic:null
    };
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
  onPress(state)
  {
    console.log(state)
    this.regName(state.name);
    this.regSurname(state.surname);
    this.regEmail(state.email);
    this.regPhone(state.phone);
    this.regPassword(state.password);
    
    if(this.isFormValid())
    {
      console.log("form geçerli")
      var paramsNames=["name","surname","email","phone","password","id"];
      var paramsValues=[state.name, state.surname, state.email, state.phone, state.password, state.id];
      this.props.actions.putProfileEdit("updateprofile",paramsNames,paramsValues)
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
  //regPhone'a bak
  regPhone = (phone) => {
    //buraya bakılacak
    var re = "";
    if(true)
    {
      this.isValid.phoneIsValid=true
      return true
    }
    else{
      this.isValid.phoneIsValid=false
      return false
    }
  }
  regPassword = (password) => {
    var re = /(.|\s)*\S(.|\s)*/;
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
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible:!this.state.passwordVisible
    })
  };
  componentDidMount = () =>{
    console.log(this.props.profil)
    this.setState({
      name:this.props.profil.user_real_name,
      surname:this.props.profil.user_surname,
      email:this.props.profil.user_mail,
      phone:this.props.profil.user_phone,
      password:this.props.profil.user_password,
      id:this.props.profil.user_id
    })
  }
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
            style={this.regName(this.state.name) ? Styles.input : Styles.emptyInput}
            value={this.state.name}
            label="İsim"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ name:item})}
            onIconPress={() => this.setState({ name: '' })}
            captionStyle={Styles.red}
            caption={this.regName(this.state.name) ? '' : 'Can not be empty'}
          />
          <Input
            style={this.regSurname(this.state.surname) ? Styles.input : Styles.emptyInput}
            value={this.state.surname}
            label="Soyisim"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ surname:item})}
            onIconPress={() => this.setState({ surname: '' })}
            captionStyle={Styles.red}
            caption={this.regSurname(this.state.surname) ? '' : 'Can not be empty'}
          />
          <Input
           style={this.regEmail(this.state.email) ? Styles.input : Styles.emptyInput}
           value={this.state.email}
           label="Email"
           labelStyle={Styles.customizeLabelStyle}
           textStyle={Styles.customizeTextStyle}
           icon={CloseOutlineIcon}
           onChangeText={item => this.setState({ email:item})}
           onIconPress={() => this.setState({ email: '' })}
           captionStyle={Styles.red}
           caption={this.regEmail(this.state.email) ? '' : 'Can not be empty'}
          />
          <Input
            style={this.regPhone(this.state.phone) ? Styles.input : Styles.emptyInput}
            value={this.state.phone}
            label="Telefon numarası"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ phone:item})}
            onIconPress={() => this.setState({ phone: '' })}
            captionStyle={Styles.red}
            caption={this.regPhone(this.state.phone) ? '' : 'Can not be empty'}
            keyboardType={'numeric'}
          />
          <Input
            style={this.regPassword(this.state.password) ? Styles.input : Styles.emptyInput}
            value={this.state.password}
            label="Şifre"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            onChangeText={item => this.setState({ password:item})}
            captionStyle={Styles.red}
            caption={this.regPassword(this.state.password) ? '' : 'Can not be empty'}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
          />
        </Layout>
        <Button 
        onPress={() => this.onPress(this.state)}
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor} >
          Save Changes
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    profil: state.profileReducer,
    login:state.loginReducer,
    profileEdit:state.profileEditReducer,
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
      putProfileEdit: bindActionCreators(ProfileEditActions.putProfileEdit, dispatch)

    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAccount);