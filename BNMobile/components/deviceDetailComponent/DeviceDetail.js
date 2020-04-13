import Styles from './Styles';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {Button, Input, Layout} from '@ui-kitten/components';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconDetailActions from "../../redux/actions/beaconDetailActions";
import { Actions } from 'react-native-router-flux';
class DeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Uğur',
      surname: 'Çakar',
      email: 'ugurcakar@hotmail.com',
      phone: '5555555555',
      password: 'baguvix',
      passwordVisible: false,
    };
  }
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  };
  componentDidMount = () =>{
    var paramsNames=["deviceId"];
    var paramsValues=[this.props.ID];
    this.props.actions.getBeaconDetail("devicedetail",paramsNames,paramsValues);
  }
  setEmail = () => {};
  onItemPress = (beacon) => {
    beacon["deviceId"]=this.props.ID
    Actions.DeviceEdit({ beacon: beacon })
  };
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
          <Image
            style={{height:responsiveHeight(30),width:responsiveWidth(100),justifyContent: "center",alignItems: "center",resizeMode: 'contain'}}
            source={{
              uri:
              'https://lh6.googleusercontent.com/proxy/Bqqq2DHYLI-9bYWmUQkSz7UdLfvGavr6tPysMgBl6y7GDFFwc1dwlxqOr0tCtkWVVRfXI9j-fx-0LM5f-GW2jWfm4aCIkj5HJmwDuTL8h4mh5uzlR0plpUk',
            }}
          />
        <Layout style={Styles.formContainer} level="1">
            <Input 
            style={Styles.input}
            value={this.props.beaconDetail.beacon_name}
            label='Cihaz adı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.props.beaconDetail.type}
            label='Türü'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.props.beaconDetail.variance ? this.props.beaconDetail.variance + "" : "" }
            label='Güven aralığı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Batarya seviyesi'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={"he"}
            label='Cihazın güncel uzaklığı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
            keyboardType={'numeric'}
          />
        </Layout>
        <Button style={Styles.save} size="giant" onPress={() => this.onItemPress(this.props.beaconDetail)}>
          Edit
        </Button>
        </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    beaconDetail: state.beaconDetailReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getBeaconDetail: bindActionCreators(BeaconDetailActions.getBeaconDetail, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
