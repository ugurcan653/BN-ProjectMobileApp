import Styles from './Styles';
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Button, Input, Layout, Spinner} from '@ui-kitten/components';
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
      name: '',
      variance: '',
      type:'',
      image:'',
      spinner: false
    };
    var paramsValues=[this.props.ID];
    this.props.actions.getBeaconDetail(paramsValues,this);
  }
  distance(uuid){
    if(Array.isArray(this.props.getBeaconRange) && this.props.getBeaconRange.length)
    {
      var condition = this.props.getBeaconRange.map((range) =>{
        if(range.uuid==uuid)
        {
          let distance= Math.floor(range.distance);
          if(distance<1)
          {
            return "Bir metreden daha az uzaklıkta";
          }
          else{
          return distance+" metre civarı uzaklıkta";
          }
        }
        else{
          return "Tanımsız"
        }
      })
      return(condition+"");
    }
    else{
      return "Tanımsız"
      
    }
  }
  batteryLevel(uuid){
    if(Array.isArray(this.props.getBeaconRange) && this.props.getBeaconRange.length)
    {
      var condition = this.props.getBeaconRange.map((range) =>{
        if(range.uuid==uuid)
        {
          if(range.battery_level== -1){
            return "-"
          }
          else{
            return Math.floor(range.battery_level)
          }    
        }
        else{
          return "-"
        }
      })
      return(condition+"");
    }
    else{
      return "Tanımsız"
      
    }
  }
  renderLoading = () => (
    <View style={Styles.loading}>
      <Spinner/>
    </View>
  );
  onItemPress = (beacon) => {
    beacon["deviceId"]=this.props.ID
    Actions.replace("DeviceEdit",{ beacon: beacon })
    // Actions.DeviceEdit({ beacon: beacon })
  };
  render() {
    return (
      <Layout style={Styles.layout}>
        {
          this.state.spinner == false ?
          this.renderLoading()
        :
        <KeyboardAwareScrollView style={Styles.container}>
          <Image
            style={{height:responsiveHeight(30),width:responsiveWidth(100),justifyContent: "center",alignItems: "center",resizeMode: 'contain'}}
            source={{
              uri:this.state.image? this.state.image :
              'https://lh6.googleusercontent.com/proxy/Bqqq2DHYLI-9bYWmUQkSz7UdLfvGavr6tPysMgBl6y7GDFFwc1dwlxqOr0tCtkWVVRfXI9j-fx-0LM5f-GW2jWfm4aCIkj5HJmwDuTL8h4mh5uzlR0plpUk',
            }}
          />
        <Layout style={Styles.formContainer} level="1">
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Cihaz adı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.type}
            label='Türü'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.variance ? this.state.variance + "" : "" }
            label='Güven aralığı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.batteryLevel(this.state.uuid)}
            label='Batarya seviyesi'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.distance(this.state.uuid)}
            label='Cihazın güncel uzaklığı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
            keyboardType={'numeric'}
          />
        </Layout>
        <Button style={Styles.save} size="giant" onPress={() => this.onItemPress(this.props.beaconDetail)}>
          Güncelle
        </Button>
        </KeyboardAwareScrollView>
   
        }
        </Layout>
       );
  }
}
function mapStateToProps(state) {
  return {
    beaconDetail: state.beaconDetailReducer,
    getBeaconRange:state.beaconRangeReducer
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
