import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LostBeaconModalActions from "../../redux/actions/lostBeaconModalActions";

class LostBeacon extends Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            scrollOffset: null,
            beacon_name:"",
            loading:false
        }
        this.scrollViewRef = React.createRef();
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
    setVisible = () => {
      this.setState({
        loading:false,
        beacon_name:""
      })
      this.props.actions.setLostBeaconModalActions({isActive:false,beacon_id:"",user_mail:"",user_phone:"", desc:""})
    }
    componentDidUpdate()
    {
        if(this.props.isModalVisible.beacon_id!="" && this.state.loading==false)
        {
          let name = this.props.getBeacons.map((beacon) =>{
            if(beacon.beacon_id==this.props.isModalVisible.beacon_id)
            {
              return beacon.beacon_name
            }
          })
          this.setState({
            beacon_name:name,
            loading:true
          })
        }
    }
    renderLoading = () => (
      <View style={styles.loading}>
        <Spinner/>
      </View>
    );
    render() {
    return(
        <View>
          {
            this.state.loading==false
            ? this.renderLoading
            :
            <Modal
            testID={'modal'}
            isVisible={this.props.isModalVisible.isActive}
            onSwipeComplete={this.setVisible}
            swipeDirection={['down']}
            scrollTo={this.handleScrollTo}
            onBackdropPress={this.setVisible}
              onBackButtonPress={this.setVisible}
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
                  <Text style={styles.scrollableModalText1}>
                    Beacon adı: {this.state.beacon_name}
                  </Text>
                  <View style={styles.space}></View>
                  <Text style={styles.scrollableModalText1}>
                    Mailiniz: {this.props.isModalVisible.user_mail}
                  </Text>
                  <View style={styles.space}></View>
                  <Text style={styles.scrollableModalText1}>
                    Numaranız: {this.props.isModalVisible.user_phone}
                  </Text>
                  <View style={styles.space}></View>
                  <Text style={styles.scrollableModalText1}>
                    Detay: {this.props.isModalVisible.desc}
                  </Text>
                </View>
              </ScrollView>
            </View>
            </Modal>
          
          }
        </View>
      )
  }
}
function mapStateToProps(state) {
    return {
      getBeacons:state.beaconListReducer,
      isModalVisible: state.lostBeaconModalReducer,
    };
}
function mapDispatchToProps(dispatch) {
    return {
      actions: {
        setLostBeaconModalActions: bindActionCreators(LostBeaconModalActions.lostBeaconModal, dispatch),
      }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LostBeacon);
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
        height: 150,
    },
    scrollableModalContent1: {
        height: 150,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText1: {
        fontSize: 20,
        color: 'white',
    },
});
