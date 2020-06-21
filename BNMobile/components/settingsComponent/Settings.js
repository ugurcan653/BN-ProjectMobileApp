import Styles from './Styles';
import React, {Component} from 'react';
import {Select, Layout, Input, Button, CheckBox, Text, Spinner, Icon, Datepicker} from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconListActions from "../../redux/actions/beaconListActions";
import * as ProfileActions from "../../redux/actions/profileActions";
import * as LostBeaconActions from "../../redux/actions/lostBeaconActions";
import { Actions } from 'react-native-router-flux';
import * as AlarmControlActions from "../../redux/actions/alarmControlActions";


class Settings extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      allChecked:props.getAlarmSetting.flash==true && props.getAlarmSetting.music==true && props.getAlarmSetting.vibration ? true : false, 
      flash: props.getAlarmSetting.flash,
      music: props.getAlarmSetting.music,
      vibration: props.getAlarmSetting.vibration
    };
  }
  componentDidMount()
  {
  }
  onPress = (state) => {
    let alarm={
      flash:state.flash,
      music:state.music,
      vibration:state.vibration
    }
    this.props.actions.setAlarmSetting(alarm);
    Actions.Device()
  }
  onGroupCheckedChange=()=>{
    this.setState({
      flash: true,
      music: true,
      vibration: true,
      allChecked:true
    })
  }
  control = (state) =>
  {
    if(state.flash && state.music && state.vibration)
    {
      this.onGroupCheckedChange()
    }
    else{
      this.setState({
        allChecked:false
      })
    }
  }
  changeFlash = () =>
  {
    this.setState({flash:!this.state.flash}, () => {this.control(this.state)})
  }
  changeMusic = () =>
  {
    this.setState({music:!this.state.music}, () => {this.control(this.state)})
  }
  changeVibration = () =>
  {
    this.setState({vibration:!this.state.vibration}, () => {this.control(this.state)})
  }
  render() {
    return (
        <View style={Styles.formContainer}>
            <Text status="danger" style={Styles.text}>Cihazınız sizden uzaklaştığında size haber vermemiz için lütfen alarm tipini belirleyiniz!</Text>
            <CheckBox
              style={Styles.group}
              checked={this.state.allChecked}
              onChange={this.onGroupCheckedChange}
              text='Hepsini seç'
              status="control"
              textStyle={Styles.bnColor}
            />
            <CheckBox
              style={Styles.option}
              checked={this.state.music}
              onChange={this.changeMusic}
              text='Sesli alarm'
              status="control"
              textStyle={Styles.bnColor}
            />
            <CheckBox
              style={Styles.option}
              checked={this.state.flash}
              onChange={this.changeFlash}
              text='Flaş ışıklı alarm'
              status="control"
              textStyle={Styles.bnColor}
            />
            <CheckBox
              style={Styles.option}
              checked={this.state.vibration}
              onChange={this.changeVibration}
              text='Titreşimli alarm'
              status="control"
              textStyle={Styles.bnColor}
            />
            <Button 
            onPress={() => this.onPress(this.state)} 
            style={Styles.save} 
            size="giant" 
            textStyle={Styles.buttonColor}  >
              Değişiklikleri kaydet
            </Button>
        </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    getAlarmSetting:state.alarmControlReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setAlarmSetting: bindActionCreators(AlarmControlActions.alarmControl, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
