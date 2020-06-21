import React, { Component } from 'react';
import { ApplicationProvider, IconRegistry,Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {DrawerMenu} from './components/drawerMenuComponent/DrawerMenu';
import Notification from './components/notificationComponent/Notification';
import MissingDeclaration from './components/missingDeclarationComponent/MissingDeclaration';
import DeviceEdit from './components/deviceEditComponent/DeviceEdit';
import AddCreditCard from './components/addCreditCardComponent/AddCreditCard';
import FindDevice from './modals/findDeviceModal/FindDevice';
import Scanner from './modals/scannerModal/Sccanner';
import Success from './modals/successModal/Success';
import Error from './components/errorComponent/Error';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as pageActions from "./redux/actions/pageActions";
import About from './components/aboutComponent/About'
import ProfileAccount from './components/profileAccountComponent/ProfileAccount';
import Device from './components/deviceComponent/Device';
import SıgnIn from './components/signInComponent/SignIn';
import DeviceDetail from './components/deviceDetailComponent/DeviceDetail';
import { Router, Scene, Modal, Actions } from 'react-native-router-flux';
import * as LoginActions from "./redux/actions/loginActions";
import Map from './components/mapComponent/map';
import ChangePass from './components/changePassComponent/ChangePass';
import Settings from './components/settingsComponent/Settings'
import OneSignal from 'react-native-onesignal';
import * as PushActions from "./redux/actions/pushActions";
import * as ProfileActions from "./redux/actions/profileActions";
class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      loading:false
    }
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);
    
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("56914a6b-2697-4b79-a35c-0ecc952047c3", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    

     OneSignal.addEventListener('received', this.onReceived);
     OneSignal.addEventListener('opened', this.onOpened);
     OneSignal.addEventListener('ids', (device)=> this.onIds(device));
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
    this.props.actions.push(device.userId)
  }
  componentDidMount(){
    this.props.actions.login("")
    console.log("token "+this.props.token)
    if(this.props.token=="")
    {
      Actions.Login();
    }
    else{
      console.log("gidiyor")
      Actions.drawerMenu();
      Actions.Device();
    }
  }

  // componentDidMount(){
  //   this.props.actions.login("")
  //   console.log(this.props.all)
  //   if(this.props.token!="")
  //   {
  //     console.log("token var")
  //     this.props.actions.getProfile([this.props.token])
  //   }
  //   else{
  //     Actions.Login();
  //   }
  // }
  // componentDidUpdate()
  // {
  //   if(this.props.all.error==false && this.state.loading==false)
  //   {
  //     console.log(this.props.all)
  //     console.log("false")
  //     this.setState({
  //       loading:true
  //     })
  //     Actions.drawerMenu();
  //     Actions.Device();
  //   }
  //   if(this.props.all.error==true && this.state.loading==false)
  //   {
  //     console.log("true")
  //     Actions.Login();
  //     this.setState({
  //       loading:true
  //     })
  //   }
  // }
  render()
  {
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <Router>
          <Modal>
            <Scene key="root" hideNavBar>
              <Scene initial key="Login" component={SıgnIn} />
            </Scene>
            <Scene 
              overlay
              hideNavBar
              key="drawerMenu"
              contentComponent={DrawerMenu}
            >
              <Scene key="mainNav" hideNavBar={true}>
                <Scene key="About" component={About}/>
                <Scene key="Device" component={Device}/>
                <Scene key="Notification" component={Notification}/>
                <Scene key="DeviceDetail" path={"/detail/device/:id/"} component={DeviceDetail}/>
                <Scene key="DeviceEdit" path={"/edit/device/:device/"} component={DeviceEdit}/>
                <Scene key="ProfileAccount" component={ProfileAccount}/>
                <Scene key="MissingDeclaration" component={MissingDeclaration}/>
                <Scene key="FindDevice" component={FindDevice}/>
                <Scene key="Map" component={Map}/>
                <Scene key="Card" component={AddCreditCard}/>
                <Scene key="Settings" component={Settings}/>
                <Scene key="Error" component={Error}/>
                <Scene key="ChangePass" component={ChangePass}/>
              </Scene>
            </Scene>
          </Modal>
        </Router>
      </ApplicationProvider>
    )
  }
}
function mapStateToProps(state) {
  return {
    token: state.loginReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(LoginActions.login, dispatch),
      push: bindActionCreators(PushActions.push, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch)
    }
  };
}//actions alındı
export default connect(mapStateToProps,mapDispatchToProps)(App);