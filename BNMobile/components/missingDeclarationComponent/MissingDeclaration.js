import Styles from './Styles';
import React, {Component} from 'react';
import {Select, Layout, Input, Button, CheckBox, Text, Spinner, Icon, Datepicker} from '@ui-kitten/components';
import { View, TouchableOpacity, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconListActions from "../../redux/actions/beaconListActions";
import * as ProfileActions from "../../redux/actions/profileActions";
import * as LostBeaconActions from "../../redux/actions/lostBeaconActions";
import { Actions } from 'react-native-router-flux';
import * as LostBeaconListActions from "../../redux/actions/lostBeaconListActions";

import { CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input';
import Success from '../../modals/successModal/Success';



const CloseOutlineIcon = style => <Icon {...style} name='close-outline' fill="#55AFFB"/>
class MissingDeclaration extends Component {
  constructor(props)
  {
    super(props)
    this.state ={
      selectedOption: null,
      selectedIndex:null,
      checkedInformations:false,
      checkedAutoFind:false,
      coordinate:{},
      description:"",
      spinner:false,
      data:[],
      date:new Date(),
      email: '',
      phone: '',
      creditCard:{},
      visible:false
    }
  }
  _onChange(form)
  {
    this.setState({
      creditCard:form
    })
  }
  isValid ={
    emailIsValid: false,
    phoneIsValid: false,
  }
  componentDidMount()
  {
    let data=[];
    this.setState({
      coordinate : this.props.coordinate,
      description: this.props.desc
    });
    this.props.beacons.map((beacon, index) => {
      if(beacon.lost_status==false)
      {
        let obj = {
          id:beacon.beacon_id,
          text:beacon.beacon_name
        }
        data.push(obj)
      }
    });
    this.setState({
      data:data
    })
  }
  toggleModal = () => {
    this.setState({
        visible:!this.state.visible
    })
  };
  componentDidUpdate()
  {
    if(this.state.data!=[] && this.state.spinner==false)
    {
      this.setState({
        spinner:true
      })
    }
    if(this.props.lostBeacon.error==false)
    {
      this.toggleModal()
      this.props.actions.clearLostDevice("");
      this.props.actions.clearLostBeacons("");
      setTimeout(
        () => {
          this.goToDevice() 
        },
        3000);
    }
    if(this.props.lostBeacon.error==true)
    {
      this.props.actions.clearLostDevice("");
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
  goToDevice = () =>
  {
    this.toggleModal();
    Actions.replace("Device")
  }
  onCheckedInformations = () => {
    this.setState({
        checkedInformations:!this.state.checkedInformations,
        email:'',
        phone:''
    })
  };
  onAutoFind = () => {
    this.setState({
        checkedAutoFind:!this.state.checkedAutoFind
    })
  };
  chooseDevice = (item) => {
    this.setState({
      selectedOption: item.id,
      selectedIndex: item.text
    })
  }
  renderLoading = () => (
    <View style={Styles.loading}>
      <Spinner/>
    </View>
  );
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
  isFormValid = () => {
    for (const item in this.isValid) {
      if(this.isValid[item]==false)
      {
        return false
      }
    }
    return true;
  }
  renderTextbox = () =>(
    <View>
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
            keyboardType={'numeric'}
            disabled={this.state.checkedInformations ? false : true}
            maxLength = {13}
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
           disabled={this.state.checkedInformations ? false : true}
          />
    </View>
  )
  scanCard = async () => {
    let config={
      suppressManualEntry:true,
      suppressConfirmation:true,
      requireCVV:false,
      usePaypalActionbarIcon:false,
      hideCardIOLogo: true,

    }
    try {
      const card = await CardIOModule.scanCard(config);
      //alert(JSON.stringify(card));
    } catch (err) {
    }
  };
  creditCard = () => (
    <KeyboardAwareScrollView>
    <Layout style={Styles.container}>
      <TouchableOpacity onPress={() => this.scanCard()}>
        <CreditCardInput 
          onChange={(item) => this._onChange(item)}
          onPress={() => this.scanCard()}
          requiresName
          requiresCVC
        />
    </TouchableOpacity>
    </Layout>
  </KeyboardAwareScrollView>

  )
  onPress(state)
  {
    if(this.state.checkedInformations==true)
    {
      this.regPhone(state.phone);
      this.regEmail(state.email);
      if(this.isFormValid() && state.selectedOption!=null && state.creditCard.valid)
      {
      let expiry = state.creditCard.values.expiry
      let year = "20";
      let position = 3;
      expiry = [expiry.slice(0, position), year, expiry.slice(position)].join('');
      let number = state.creditCard.values.number.replace(/\s/g, "")
      
      var paramsValues=[state.phone, state.email, number, state.creditCard.values.name, expiry, state.creditCard.values.cvc,
      this.state.date.toLocaleDateString(),state.coordinate.latitude,state.coordinate.longitude,state.selectedOption,state.description];
      this.props.actions.setLostDevice(paramsValues)
      }
      else{
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
    else{
      if(this.state.selectedOption!=null && state.creditCard.valid)
      {
        let expiry = state.creditCard.values.expiry
        let year = "20";
        let position = 3;
        expiry = [expiry.slice(0, position), year, expiry.slice(position)].join('');
        let number = state.creditCard.values.number.replace(/\s/g, "")
        var paramsValues=[this.props.profile.user_phone, this.props.profile.user_mail, number, state.creditCard.values.name, expiry, 
        state.creditCard.values.cvc, this.state.date.toLocaleDateString(),state.coordinate.latitude,state.coordinate.longitude,state.selectedOption,state.description];
        this.props.actions.setLostDevice(paramsValues)
      }
      else{
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
  }
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        {
          this.state.spinner == false ?
          this.renderLoading()
        :
        <View>
        <Layout style={Styles.formContainer} level="1">
          <Select
            style={Styles.input}
            data={this.state.data}
            placeholder={this.state.selectedIndex == null ? "Cihazınızı seçiniz" : this.state.selectedIndex}
            onSelect={index => this.chooseDevice(index)}
            textStyle={Styles.customizeTextStyle}
            status="info"
          />
          <CheckBox
            style={Styles.checkbox}
            status="control"
            textStyle={Styles.bnColor}
            text='Başka bir kullanıcı iletişim bilgisi kullan'
            checked={this.state.checkedInformations}
            onChange={this.onCheckedInformations}
        />
        <Datepicker
          style={Styles.input}
          label="Kaybolduğu gün"
          labelStyle={Styles.bnColor}
          status="info"
          date={this.state.date}
          onSelect={item => this.setState({ date: item })}
          />
        {
          this.state.checkedInformations==true ?
          this.renderTextbox() :
          <View></View>
        }
        <Text style={Styles.textColor}>Kredi Kartı bilgileriniz</Text>
        {
          this.creditCard()
        }
        <Button 
        onPress={() => this.onPress(this.state)} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor}  >
          Gönder
        </Button>
        </Layout>
        </View>
        }
        <Success visible={this.state.visible}></Success>
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    beacons: state.beaconListReducer,
    profile: state.profileReducer,
    login:state.loginReducer,
    lostBeacon: state.lostBeaconReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getBeacons: bindActionCreators(BeaconListActions.getBeacons, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
      setLostDevice: bindActionCreators(LostBeaconActions.setLostBeacon, dispatch),
      clearLostDevice: bindActionCreators(LostBeaconActions.addLostBeacon, dispatch),
      clearLostBeacons: bindActionCreators(LostBeaconListActions.lostBeaconList, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(MissingDeclaration);
