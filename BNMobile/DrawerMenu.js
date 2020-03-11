/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Animated,
  Image,
  Easing
} from 'react-native';

import {BeaconMonitoringAndRanging} from './beaconMonitoringAndRanging';
import BouncyDrawer from 'react-native-bouncy-drawer';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Drawer from 'react-native-drawer';
import {
  Icon,
  Menu,
} from '@ui-kitten/components';
import {
  TopNavigation,
} from '@ui-kitten/components';
const Ap: () => React$Node = () => {
  // return (
  //   <>
  //     <StatusBar barStyle="dark-content" />
  //     <SafeAreaView>
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={styles.scrollView}>
  //         <BeaconMonitoringAndRanging/>
  //       </ScrollView>
  //     </SafeAreaView>
  //   </>
  // );
};
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
    title: 'Item 1',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Item 2',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Item 3',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
  {
    title: 'Item 4',
    icon: StarIcon,
    style: styles.menuItem,
    titleStyle:styles.menuItemTitle,
  },
];

export class DrawerMenu extends Component{
  constructor(props){
    super(props);
    this.state={
      menuContent: null,
    }
    
  }
  renderMenuContent(){
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
            <DrawerMenuContent drawer={this._drawer}></DrawerMenuContent>
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
      tweenDuration={350}
      panThreshold={0.10}
      disabled={this.state.drawerDisabled}
      openDrawerOffset={(viewport) => {
        return viewport.width/2.75
      }}
      closedDrawerOffset={() => 0}
      panOpenMask={0.9}
      negotiatePan
      
      >
      <TopNavigation
      title='BN Mobil'
      titleStyle={{color:'#0bc1f1'}}
      alignment='center'
      leftControl={this.renderLeftControl()}
    />
      {
        this.props.renderPage
      }
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
            <Text style={{marginLeft:15,color:'#f9f9f9'}}>Çıkış Yap</Text>
          </View>
        </View>
      </View>
    )
  }
  setSelectedIndex(index){
    this.setState({ index });
    this.props.drawer.close();
    //this.props.pageChange(index)
  }
}

export default Menu;
