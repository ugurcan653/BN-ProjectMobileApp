import React, {Component} from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button, Icon, Spinner, Card, Layout, Input} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import * as LostBeaconListActions from "../../redux/actions/lostBeaconListActions";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from "redux";
import { Actions } from 'react-native-router-flux';
import LostBeacon from '../../modals/lostBeaconModal/LostBeacon';
import * as LostBeaconModalActions from "../../redux/actions/lostBeaconModalActions";
import Geolocation from '@react-native-community/geolocation';
const pin = style => <Icon {...style} fill={'#fff'} name="pin" />;
const ArrowRightIcon = style => <Icon {...style} name='arrow-right' fill="#fff"/>
const CloseOutlineIcon = style => <Icon {...style} name='close-outline' fill="#55AFFB"/>
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 41.117138,
        longitude: 29.003904,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker:"",
      scrollOffset: null,
      spinner: false,
      addItemModalVisible:false,
      newItemDes:'',
    };
    this.scrollViewRef = React.createRef();
    this.map = React.createRef();
  }
  isValid ={
    newItemDesIsValid: false,
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
  regNewItemDes = (newItemDes) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(newItemDes))
    {
      this.isValid.newItemDesIsValid=true
      return true
    }
    else{
      this.isValid.newItemDesIsValid=false
      return false
    }
  }
  isVisible = (id, mail, phone, desc) => {
    this.props.actions.setLostBeaconModalActions({isActive:true, beacon_id:id, user_mail:mail, user_phone:phone, desc:desc})
  };
  zoomDelta = 0.005;
  onZoom = zoomSign => {
    let zoomedRegion = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta:
        this.state.region.latitudeDelta - this.zoomDelta * zoomSign,
      longitudeDelta:
        this.state.region.longitudeDelta - this.zoomDelta * zoomSign,
    };
    this.onRegionChange(zoomedRegion);
    if (this.map.current != null) {
      this.map.current.animateToRegion(zoomedRegion);
    }
  };
  onZoomIn = () => this.onZoom(1);
  onZoomOut = () => this.onZoom(-1);
  async componentDidMount()
  {
    this.props.actions.getLostBeacons([this.props.profile.user_id]);
    const grantedLocation = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (grantedLocation===PermissionsAndroid.RESULTS.GRANTED) {
      var watchId=Geolocation.watchPosition(
          position => {
            this.setState({
              region:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            })
          },
          (error) =>{
           Alert.alert(
            "",
          "Eğer geçerli konumunuz ile işlem yapmak istiyorsanız lütfen konumlama sisteminizi aktif hale getiriniz.",
          [
            { text: "Kabul et"}
          ],
          { cancelable: false }
        )});
    }
    else{
      Actions.replace("Device")
    }
  }
  renderLoading = () => (
    <View style={styles.loading}>
      <Spinner/>
    </View>
  );
  onRegionChange = region => {
    this.setState({
      region: region,
    });
  };
  showLostBeaconsMarkers(lostBeacons)
  {
    if(lostBeacons=="")
    {
      return <View></View>
    }
    else{
      return lostBeacons.map((marker, index) => {
        let coordinate = {
          latitude: marker.lost_lat,
          longitude: marker.lost_long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
        return (
          <Marker
            pinColor={'#55AFFB'}
            coordinate={coordinate}
            key={index}
            onPress={() => this.isVisible(marker.beacon_id,marker.user_mail,marker.user_phone, marker.lost_desc)}
          />
        );
      });
    }
  }
  showaddItemModal = () => {
    this.setState({
        addItemModalVisible:!this.state.addItemModalVisible,
    })
  }
  addMarker(state) {
    this.regNewItemDes(state.newItemDes);
    if(this.isFormValid())
    {
      this.showaddItemModal();
    let regionToBeMarked = {
        latitude: state.region.latitude,
        longitude: state.region.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    this.setState({
        marker: regionToBeMarked,
    });
    this.showMarker();
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
  showMarker() {
      return (
        <Marker
          pinColor={'#55AFFB'}
          coordinate={this.state.marker}
          description={this.state.newItemDes}
          onPress={this.isVisible}
        />
      );
  }
  addModal()
  {
    return(
      <Modal style={styles.modalContainer}
          visible={this.state.addItemModalVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.setState({addItemModalVisible:false})}>
          <Card disabled={true}>
              
        <KeyboardAwareScrollView>
            <Layout style={styles.formContainer} level="1">
                <Input
                    style={this.regNewItemDes(this.state.newItemDes) ? styles.successInput : this.state.newItemDes=='' ? styles.input : styles.emptyInput }
                    value={this.state.newItemDes}
                    label="Detay"
                    labelStyle={styles.customizeLabelStyle}
                    textStyle={styles.customizeTextStyle}
                    icon={CloseOutlineIcon}
                    onChangeText={item => this.setState({ newItemDes:item})}
                    onIconPress={() => this.setState({ newItemDes: '' })}
                />
            </Layout>
            <Button 
            onPress={() => this.addMarker(this.state)} 
            style={styles.save} 
            size="giant" 
            textStyle={styles.buttonColor}  >
            Devam et
            </Button>
            </KeyboardAwareScrollView>
          </Card>
        </Modal>
       
    )
  }
  goToAddLostDevice(state)
  {
    Actions.replace("MissingDeclaration",{ coordinate: state.marker , desc:state.newItemDes})
  }
  render() {
    return (
        <View style={styles.container}>
            <MapView
              style={styles.map}
              ref={this.map}
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChange}
              provider="google">
              {this.state.marker=="" ? <View></View> : this.showMarker()}
              {this.props.lostBeacons=="" ? <View></View> : this.showLostBeaconsMarkers(this.props.lostBeacons)}
            </MapView>
            <View style={styles.buttonContainer}> 
              <TouchableOpacity style={styles.button} onPress={this.onZoomIn}>
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
              <View style={styles.spacer} />
              <TouchableOpacity style={styles.button} onPress={this.onZoomOut}>
                <Text style={styles.text}>-</Text>
              </TouchableOpacity>
              <View style={styles.spacer} />
              <TouchableOpacity style={styles.button}>
                <Button
                  onPress={() => this.showaddItemModal()}
                  style={styles.add}
                  size={'tiny'}
                  icon={pin}
                  status={'control'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.continueContainer}>
              <TouchableOpacity style={styles.button}>
                <Button
                  disabled={this.state.marker=="" ? true : false}
                  style={styles.add}
                  size={'tiny'}
                  icon={ArrowRightIcon}
                  status={'control'}
                  onPress={() => this.goToAddLostDevice(this.state)}
                />
              </TouchableOpacity>
            </View>
            <LostBeacon></LostBeacon>
            {this.addModal()}
           </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    lostBeacons: state.lostBeaconListReducer,
    profile: state.profileReducer,
    isModalVisible: state.lostBeaconModalReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getLostBeacons: bindActionCreators(LostBeaconListActions.getLostBeacons, dispatch),
      setLostBeaconModalActions: bindActionCreators(LostBeaconModalActions.lostBeaconModal, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    end: 20,
    borderRadius: 5,
    backgroundColor: '#55AFFB',
    paddingVertical: 3,
  },
  continueContainer: {
    position: 'absolute',
    top: 30,
    end: 20,
    borderRadius: 5,
    backgroundColor: '#55AFFB',
    paddingVertical: 3,
  },
  button: {},
  text: {
    textAlign: 'center',
    color: '#fff',
  },
  spacer: {
    marginVertical: 5,
  },
  add: {
    backgroundColor: '#55AFFB',
    borderWidth: 0,
  },
  buttonColor: {
    color:"white"
  },
  save: {
    backgroundColor:'#55AFFB',
    borderColor:'#55AFFB',
    borderRadius:15
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  successInput: {
    marginTop:'2%',
    borderColor: '#28a745',
  },
  input: {
    marginTop:'2%',
    borderColor: '#55AFFB',
  },
  emptyInput:{
    marginTop:'2%',
    borderColor: '#FF3D71',
  },
});
