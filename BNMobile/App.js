import React, { Component } from 'react';
import { ApplicationProvider, IconRegistry,Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {DrawerMenu} from './DrawerMenu';
import Notification from './components/notificationComponent/Notification';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import MapView from 'react-native-maps';
import IndoorMap from './IndoorMap';
import { TouchableOpacity} from 'react-native';
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
class App extends Component{
  componentDidMount(){
    this.props.actions.login("")
    console.log("token "+this.props.token)
    if(this.props.token=="")
    {
      Actions.Login();
    }
    else{
      Actions.drawerMenu();
      Actions.Device();
    }
    // Actions.drawerMenu();
    // Actions.Map();
  }
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
                {/* üste dinamik path gelecek */}
              </Scene>
            </Scene>
          </Modal>
        </Router>
      </ApplicationProvider>
    )
  }
}
const MapPage = ()=>(
  <Layout style={{flex:1,backgroundColor:'#cccccc'}}>
    <IndoorMap></IndoorMap>
  </Layout>
);
const pageChange=(pageName)=>{
  console.log(pageName)
  if(pageName=="Anasayfa"){
    return <AddCreditCard></AddCreditCard>
  }
  else if(pageName=="Bildirimlerim"){
    return <Notification></Notification>
  }
  else if(pageName=="Haritalar"){
    return <IndoorMap></IndoorMap>
  }
  else if(pageName=="Kayıp İlanı"){
    return <MissingDeclaration></MissingDeclaration>
  }
  else if(pageName=="Düzenle"){
    return <DeviceEdit></DeviceEdit>
  }
  else if(pageName=="Detay"){
    return <DeviceDetail></DeviceDetail>
  }
  else if(pageName=="Kartlar"){
    return <AddCreditCard></AddCreditCard>
  }
  else if(pageName=="Cihaz Tarama"){
    return <FindDevice></FindDevice>
  }
  else if(pageName=="TarayıcıModal"){
    return <Scanner></Scanner>
  }
  else if(pageName=="BaşarılıModal"){
    return <Success></Success>
  }
  else if(pageName=="Hakkımızda"){
    return <About></About>
  }
  else if(pageName=="Profil"){
    return <ProfileAccount></ProfileAccount>
  }
  else if(pageName=="Cihazlarım"){
    return <Device></Device>
  }
  else if(pageName=="Giriş Yap"){
    return <SıgnIn></SıgnIn>
  }
  else{
    return <Error></Error>
  }
}
function mapStateToProps(state) {
  return {
    token: state.loginReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(LoginActions.login, dispatch),
    }
  };
}//actions alındı
export default connect(mapStateToProps,mapDispatchToProps)(App);