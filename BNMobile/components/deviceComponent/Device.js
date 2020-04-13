import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, List, Text, Layout, Spinner} from '@ui-kitten/components';
import {ArrowRightIcon} from './extra/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconListActions from "../../redux/actions/beaconListActions";
import * as ProfileActions from "../../redux/actions/profileActions";
import { Actions } from 'react-native-router-flux';
class Device extends Component {
  constructor(props) {
    super(props);
    this.state={
      spinner: false
    }
  }
  onItemPress = (ID) => {
    Actions.DeviceDetail({ ID: ID })
  };
  renderLoading = () => (
    <View style={styles.loading}>
      <Spinner/>
    </View>
  );
  componentDidMount = () =>{
    this.props.actions.getProfile("profile",["token"],[this.props.login])
  }
  componentDidUpdate = () => {
    if(this.props.profile !="" && this.state.spinner==false){
      this.getBeaconList()
    }
  }
  getBeaconList()
  {
    console.log("asda "+this.props.profile.user_id)
    this.props.actions.getBeacons("devices",["userId"],[this.props.profile.user_id]);
    this.setState({
      spinner:true
    })
  }
  renderItem = info => (
    <View style={styles.item}>
      <Layout style={styles.itemImage}>
        <View style={styles.layout}>
          <View style={styles.left}>
            <Text style={styles.itemTitle} category="h4" status="control">
              {info.item.beacon_name}
            </Text>
            <Text style={styles.itemDescription} category="s1" status="control">
              Tür: {info.item.type}
            </Text>
          </View>
          {/* <View style={styles.right}>
            <Text style={styles.itemDescription} category="h6" status="control">
              {info.item.metre}
            </Text>
          </View> */}
        </View>

        <View style={styles.itemFooter}>
          <Image
            style={styles.headerImage}
            source={{
              uri:
                'https://clipartart.com/images/default-profile-picture-clipart-1.jpg',
            }}
          />
          <View style={styles.space}></View>
          <Button
            style={styles.iconButton}
            appearance="outline"
            status="control"
            icon={ArrowRightIcon}
            onPress={() => this.onItemPress(info.item.beacon_id)}>
            {'Details'}
          </Button>
        </View>
      </Layout>
    </View>
  );
  render() {
    return (
      <Layout style={styles.layout}>
        {
          this.state.spinner == false ?
          this.renderLoading()
        :
          <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={this.props.beacons}
          renderItem={this.renderItem.bind()}
          />
        }
      
      </Layout>
      
    );
  }
}
function mapStateToProps(state) {
  return {
    beacons: state.beaconListReducer,
    profile: state.profileReducer,
    login:state.loginReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getBeacons: bindActionCreators(BeaconListActions.getBeacons, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(Device);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 75,
    flex: 1,
  },
  item: {
    marginVertical: '3%',
    height: 180,
    borderRadius: 15,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#55AFFB',
    borderRadius: 15,
  },
  itemDescription: {
    marginVertical: '5%',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconButton: {
    flex: 3
  },
  space: {
    flex:3
  },
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    borderRadius: 75,
    flex: 2,
  },
});
