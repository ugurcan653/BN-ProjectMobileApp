import React , {Component} from 'react';
import {StyleSheet,View,Text,Platform,TouchableOpacity,Animated,Image,Easing} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/pageActions";
import BouncyDrawer from 'react-native-bouncy-drawer';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Drawer from 'react-native-drawer';
import {Icon,Menu} from '@ui-kitten/components';
import {TopNavigation} from '@ui-kitten/components';
import {Actions} from 'react-native-router-flux';
import * as LoginActions from "../../redux/actions/loginActions";
import * as LogoutActions from "../../redux/actions/logoutActions";
import Alarm from '../../modals/alarmModal/Alarm';

import SıgnIn from '../signInComponent/SignIn';
import Notification from '../notificationComponent/Notification';
import About from '../aboutComponent/About'
import BeaconMonitoringAndRanging from '../../beaconMonitoringAndRanging';
import FindDevice from '../../modals/findDeviceModal/FindDevice';

const StarIcon = (style) => (
  <Icon {...style} fill={'#0bc1f1'} name='star'/>
);
const styles = StyleSheet.create({
  profileBox:{
    width:'100%',
    backgroundColor:'#f9f9f9',
    height:'25%',
    alignItems:'center',
    justifyContent:'center'
  },
  profileAvatar:{
    width: 54,
    height: 54,
    backgroundColor:'#0bc1f1',
    borderRadius: 54/2,
    justifyContent:'center',
    alignItems:'center',
  },
  profileName:{
    fontSize:20,
    color:'#0bc1f1',
    paddingTop:'2%',
    fontWeight:'bold'
  },
  list:{height:'65%',width:'100%',backgroundColor:'#0bc1f1'},
  listItem:{color:"white",marginLeft:40,marginTop:65,fontSize:14},
  footer:{height:'8%',width:'100%',backgroundColor:'#0bc1f1'},
  footerContent:{flexDirection:'row',marginLeft:40,marginTop:15,color:'#f9f9f9'},
  menuItem:{backgroundColor:'#f9f9f9'},
  menuItemTitle:{color:'#0bc1f1'}
});
const data = [
  {
    title: 'Hakkımızda',
    key:'About',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Kişisel bilgilerim',
    key:'ProfileAccount',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Cihazlarım',
    key:'Device',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Bildirimlerim',
    key:'Notification',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Kayıp Cihazlar',
    key:'Map',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Ayarlar',
    key:'Settings',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
];
var drawer;
export class DrawerMenu extends Component{
  constructor(props){
    super(props);
    this.state={
      menuContent: null,
      findDeviceModalVisible:false
    }
    
  }
  renderMenuContent(){
    drawer = this._drawer;
    if(this.state.open){
      var fadeAnim = new Animated.Value(0);
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
      return(
        <Animated.View style={{flex:1,opacity:fadeAnim}}>
            <ConnectedTest1></ConnectedTest1>
        </Animated.View>
      );
    }
  }
  render(){
    return (
      <Drawer
      ref={(ref) => this._drawer = ref}
      type="static"
      content={
        this.renderMenuContent()
      }
      acceptDoubleTap
      styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15,}}}
      onOpenStart={() => {
        this.setState({open: true})
      }}
      onClose={() => {
        this.setState({open: false})
      }}
      tweenHandler={(ratio) => ({
        main: {
            transform: [
                {skewX: `${1.10 * ratio}deg`},
                {scaleX: (1 - (0.05* ratio))},
                {scaleY: (1 - (0.05* ratio))},
                {rotateY:-1*ratio*0.5}
            ]
        }
    })}
      captureGestures={true}
      acceptPan={Actions.currentScene=="Map" ? false : true}
      tweenDuration={350}
      panThreshold={0.10}
      disabled={this.state.drawerDisabled}
      openDrawerOffset={(viewport) => {
        return viewport.width/2.75
      }}
      closedDrawerOffset={() => 0}
      panOpenMask={0.9}
      negotiatePan
      
      ><Alarm></Alarm>
      <BeaconMonitoringAndRanging></BeaconMonitoringAndRanging>
      <TopNavigation
      title='BN Mobil'
      titleStyle={{color:'#0bc1f1'}}
      alignment='center'
      leftControl={this.renderLeftControl()}
      rightControls={this.renderFindDevice()}
    />
    {
      this.state.findDeviceModalVisible
      ? <FindDevice data={this}></FindDevice>
      : <View></View>
    }
    {this.props.children}
    </Drawer>
    );
  }
  componentDidMount(){
  }
  renderLeftControl = () => (
    <TouchableOpacity style={{width:'50%',height:'50%'}} onPress={()=>this._drawer.open()}>
      <FAIcon style={{color:'#0bc1f1'}} size={18} name={'align-left'}></FAIcon>
    </TouchableOpacity>
  );
  renderFindDevice = () => (
    <TouchableOpacity onPress={this.modalIsVisible.bind(this)}>
      <FAIcon style={{color:'#0bc1f1'}} size={18} name={'search'}></FAIcon>
    </TouchableOpacity>
  )
  modalIsVisible(){
      this.setState({
        findDeviceModalVisible:!this.state.findDeviceModalVisible
      });
  }
}
class DrawerMenuContent extends Component{
  constructor(props){
    super(props);
    this.state={ 
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.profileBox}>
            <View style={styles.profileAvatar}>
                <FAIcon name={'user'} color={'#f9f9f9'} size={20}></FAIcon>
            </View>
            <Text style={styles.profileName}>BN-Mobil</Text>
        </View>
        <Menu
      data={data}
      selectedIndex={this.state}
      style={{backgroundColor:'#f9f9f9'}}
      onSelect={(index)=>this.setSelectedIndex(index)}
    />
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <FAIcon size={16} color='#f9f9f9' name={'door-open'}></FAIcon>
            <Text onPress={(e) => this.logout(e)} style={{marginLeft:15,color:'#f9f9f9'}}>Çıkış Yap</Text>
          </View>
        </View>
      </View>
    )
  }
  componentDidUpdate()
  {
    if(this.props.token=="" && this.props.logout=="logout")
    {
      Actions.replace("Login")
    }
  }
  logout = () => {
    this.props.actions.setLogout("logout");
    this.props.actions.setToken("")
  }
  setSelectedIndex(index){
    Actions.replace(data[index].key)
    //Actions[data[index].key].call();
    drawer.close();
  }
}
const ConnectedTest1 = connect(mapStateToProps,mapDispatchToProps) (DrawerMenuContent);
function mapStateToProps(state) {
  return {
    currentPage: state.changePageReducer,
    token:state.loginReducer,
    logout:state.logoutReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changePage: bindActionCreators(pageActions.changePage,dispatch),
      setToken: bindActionCreators(LoginActions.getToken, dispatch),
      setLogout: bindActionCreators(LogoutActions.logout, dispatch),
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
