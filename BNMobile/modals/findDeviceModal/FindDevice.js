import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import { EmailIcon, PhoneIcon, MapIcon } from './extra/icons';
import { ProfileAvatar } from './extra/profile-avatar.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CheckLostDeviceActions from "../../redux/actions/checkLostDeviceActions";
import Communications from 'react-native-communications';
class FindDevice extends Component {
  state = {
    loadingBeacon:false,
    loadingPage:false,
  };
  constructor(props)
  {
    super(props);
    props.actions.clearLostDevice("")
  }
  componentDidUpdate()
  {
    if(Array.isArray(this.props.getBeaconRange) && this.props.getBeaconRange.length && this.state.loadingBeacon==false)
    {
      this.props.getBeaconRange.map((range) =>{
        if(range.distance<1)
        {
          this.props.actions.setLostDevice([range.uuid]);
        }
      })
      this.setState({
        loadingBeacon:true
      })
    }
    if(this.props.getLostDevice != "" && this.state.loadingPage==false)
    {
      this.setState({
        loadingPage:true
      })
    }
   }
  renderModalElement = () => (
    <KeyboardAwareScrollView style={styles.bnBackgroundColor}>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar}
            resizeMode='center'
            source={require('./assets/image-person.png')}
          />
        </View>
        <View style={styles.socialAuthContainer}>
        <Text style={styles.socialAuthHintText}
            status='control'
            category="h6">
            Bulunan Cihaz
          </Text>
          <Text style={styles.socialAuthHintText}
            status='control'
            category="p1">
              {
                this.state.loadingPage==true && this.props.getLostDevice.error==false
                ? this.props.getLostDevice.BeaconInfos.beacon_name
                : "Cihaz Taranıyor ..."
              }
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              onPress={this.state.loadingPage==true && this.props.getLostDevice.error==false?() => Communications.email([this.props.getLostDevice.UserInfos.user_mail],null,null,null,null):null}
              appearance='ghost'
              size='giant'
              icon={EmailIcon}
            >
            </Button>
            <Button
            onPress={this.state.loadingPage==true && this.props.getLostDevice.error==false?() => Communications.phonecall(this.props.getLostDevice.UserInfos.user_phone,true):null}
              appearance='ghost'
              size='giant'
              icon={PhoneIcon}>
            </Button>
          </View>
        </View>
    </KeyboardAwareScrollView>
  );

  render() {
    return (
      this.props.data.state.findDeviceModalVisible
      ? <Layout style={styles.container}>
          <Modal
            backdropStyle={styles.backdrop}
            onBackdropPress={this.props.data.modalIsVisible.bind(this.props.data)}
            visible={this.props.data.state.findDeviceModalVisible}>
            {this.renderModalElement()}
          </Modal>
        </Layout>
      :<></>
    );
  }
}
function mapStateToProps(state) {
  return {
    getBeaconRange:state.beaconRangeReducer,
    getLostDevice:state.checkLostDeviceReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setLostDevice: bindActionCreators(CheckLostDeviceActions.setLostDevice, dispatch),
      clearLostDevice: bindActionCreators(CheckLostDeviceActions.checkLostDevice, dispatch),
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(FindDevice);

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    alignSelf: 'center',
    borderColor:'#55AFFB',
    borderRadius:46,
    borderWidth:1,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  buttonColor:{
    color:'#55AFFB'
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:'10%',
    marginHorizontal:'15%'
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 8,
    color:'#55AFFB'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  editAvatarButton: {
    width: 32,
    height: 32
  },
  backdrop: {
    // backgroundColor: 'rgba(0, 0, 0, 0.9)'
    backgroundColor:'#55AFFB'
  },
  bnBackgroundColor:{
      backgroundColor:"white",
      marginVertical:'20%',
      marginHorizontal:'10%',
      borderRadius:15,
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
  }
});
