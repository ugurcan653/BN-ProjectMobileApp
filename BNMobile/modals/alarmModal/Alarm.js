import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Vibration} from 'react-native';
import {Text, Icon, Button} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LostBeaconModalActions from "../../redux/actions/lostBeaconModalActions";
import Torch from 'react-native-torch';
import Sound from 'react-native-sound';


class Alarm extends Component {
  sound=null;
    
    constructor(props)
    {
        super(props);
        this.state={
            scrollOffset: null,
            loading:false,
            beacon_name:null,
            visible:false,
            beaconIsNotSeeing:null,
            error:null,
            missingCounter:0,

        }
        this.scrollViewRef = React.createRef();
        this.sound = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            return;
          }
        })
    }
    handleOnScroll = event => {
        this.setState({
          scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };
    handleScrollTo = p => {
        if (this.scrollViewRef.current) {
          this.scrollViewRef.current.scrollTo(p);
        }
      };
    control = () => {
        if(this.props.alarmControl.flash)
        {
            Torch.switchState(true); // Turn ON
        }
        if(this.props.alarmControl.music)
        {
          if(this.sound!=null)
          {
            this.sound.play()
          }
        }
        if(this.props.alarmControl.vibration)
        {
            Vibration.vibrate([1000,2000],true);
        }
    }
    componentDidUpdate(prevProps) {
      if (this.props.getBeaconRange !== prevProps.getBeaconRange && this.props.getBeaconRange.length>0) {
        var tempArray =[];
        for(let item in this.props.getBeacons){
          var notFound= true;
          for(let range in this.props.getBeaconRange){
            if(range.uuid==item.uuid){
                notFound=false;
            }
          }
          if(notFound){
            tempArray.push(item);
          }
        }
        if(tempArray.length>0)
          this.isBeaconFar(tempArray);
      }
      else if(this.props.getBeaconRange.length==0 && this.state.missingCounter<40){
        this.setState({missingCounter:this.state.missingCounter+1},function(){
          if(this.state.missingCounter>=40){
            this.isBeaconFar(this.props.getBeacons);
          }
        });
      }
    }
    isBeaconFar = (beacons) => {
      let lostBeacons = beacons;
      if(!lostBeacons)
      {
        if(Array.isArray(this.props.getBeaconRange) && this.props.getBeaconRange.length){
          for(let range in this.props.getBeaconRange){
            for(let item in this.props.getBeacons){
              if(range.uuid==item.uuid){
                if(Math.floor(range.distance)>item.variance){
                  this.setState({
                    beacon_name:item.beacon_name,
                    error:2,
                    loading:true,
                    visible:true
                  })
                  this.control()
                }
              }
            }
          }
        }
      }
      else
      {
        if(this.props.getBeaconRange.length>0){
        for(let range in this.props.getBeaconRange){
          for(let item in this.props.getBeacons){
            if(range.uuid==item.uuid){
              for(let lostBeacon in lostBeacons){
                if(range.uuid==lostBeacon.uuid)
                {
                  lostBeacons=lostBeacons.map(x=>{
                    if(x!=lostBeacon)
                    {
                      return x;
                    }
                  })
                }
              }
            }
          }
          this.setState({
            beacon_name:lostBeacons,
            error:1,
            loading:true,
            visible:true
          })
          this.control()
        }
      }
      else{
        this.setState({
          beacon_name:lostBeacons,
          error:1,
          loading:true,
          visible:true
        })
        this.control()
      }
    }
    }
    renderBeacons(beacons)
    {
      if(Array.isArray(beacons))
      {
        return beacons.map((beacon) =>{
          if(this.state.error==1)
          {
            return(
              <>
            <Text style={styles.scrollableModalText1}>
                    Erişilemiyor: {beacon.beacon_name}
            </Text>
            <View style={styles.space}></View>
            </>
            )
          }
          if(this.state.error==2)
          {
            return(
              <>
            <Text style={styles.scrollableModalText1}>
                    Çok uzakta: {beacon.beacon_name}
            </Text>
            <View style={styles.space}></View>
            </>
            )
          }
        })
      }
      else{
        if(this.state.error==1)
          {
            return(
            <Text style={styles.scrollableModalText1}>
                    Erişilemiyor: {beacons.beacon_name}
            </Text>
            )
          }
          if(this.state.error==2)
          {
            return(
            <Text style={styles.scrollableModalText1}>
                    Çok uzakta: {beacons.beacon_name}
            </Text>
            )
          }
      }
      this.setState({
        beacon_name:null
      })
    }
    renderLoading = () => (
      <View style={styles.loading}>
        <Spinner/>
      </View>
    );
    close = () => {
        this.setState({
            loading:false,
            beacon_name:'',
            visible:false,
            missingCounter:0
        })
        Vibration.cancel();
        Torch.switchState(false); // Turn OFF
        if(this.sound!=null)
        {
          this.sound.stop();
        }
    }
    render() {
    return(
        <View>
          {
            this.state.loading==false && this.state.beacon== null
            ? this.renderLoading
            :
            <Modal
            testID={'modal'}
            isVisible={this.state.visible}
            swipeDirection={['down']}
            scrollTo={this.handleScrollTo}
            scrollOffset={this.state.scrollOffset}
            scrollOffsetMax={400 - 300} // content height - ScrollView height
            propagateSwipe={true}
            style={styles.modal}>
            <View style={styles.scrollableModal}>
              <ScrollView
                ref={this.scrollViewRef}
                onScroll={this.handleOnScroll}
                scrollEventThrottle={16}>
                <View style={styles.scrollableModalContent1}>
                    { this.renderBeacons(this.state.beacon_name) }
                  <Button onPress={this.close}
                  style={styles.save} 
                  size="giant" 
                  textStyle={styles.buttonColor}>Tamam</Button>
                </View>
              </ScrollView>
            </View>
            </Modal>
          
          }
        </View>
      )
    // return(
    //   <></>
    // )
  }
}
function mapStateToProps(state) {
    return {
      alarmControl:state.alarmControlReducer,
      getBeacons:state.beaconListReducer,
      getBeaconRange:state.beaconRangeReducer
    };
}
export default connect(mapStateToProps)(Alarm);
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    black:{
        fontSize: 20,
        color:'black'
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    space:{
        height: 10,
    },
    scrollableModal: {
        maxHeight: 1000,
    },
    scrollableModalContent1: {
      maxHeight: 1000,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText1: {
        fontSize: 20,
        color: 'white',
        marginTop:10
    },
    buttonColor: {
        color:"white"
    },
      save: {
        backgroundColor:'#55AFFB',
        borderColor:'#55AFFB',
        borderRadius:15,
        marginBottom:10
      },
});
