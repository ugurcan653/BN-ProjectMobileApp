import React, {Component} from 'react';
import { View, Alert, RefreshControl,ScrollView } from 'react-native';
import {Card,Layout,List,Text,Spinner} from '@ui-kitten/components';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as NotificationActions from "../../redux/actions/notificationActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import 'moment/locale/tr';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state={
      spinner:true,
      refreshing:false
    }
    props.actions.getNotification([props.profile.user_id])
  }
  _onRefresh(){
    this.setState({refreshing: true}, function(){
      this.props.actions.getNotification([this.props.profile.user_id])
    });
      this.setState({refreshing: false});
  }
  renderLoading = () => (
    <View style={Styles.loading}>
      <Spinner/>
    </View>
  );
  componentDidUpdate()
  {
    if(this.props.notification.error==false && this.state.spinner==true)
    {
      this.setState({
        spinner:false
      })
    }
    if(this.props.notification.error==true && this.state.spinner==true)
    {
      this.setState({
        spinner:false
      })
    }
  }

  renderItemFooter = info => (
    <View style={Styles.itemFooter}>
      <View style={Styles.itemAuthoringContainer}>
        <View style={Styles.leftFooter}>
          <Text style={Styles.footerText}>
          <Icon
          name={'globe'}
          color={'#55AFFB'}
          size={15}></Icon>    Benimkinerede.com
          </Text>
        </View>
        <View style={Styles.rightFooter}>
          <Text style={Styles.footerText}>
          <Icon
          name={'clock'}
          color={'#55AFFB'}
          size={15}></Icon>   {this.dateTime(info.item.date)}</Text>
        </View>
        </View>
        
    </View>
  );

  renderItem = info => (
    <Card
      style={Styles.item}
      footer={() => this.renderItemFooter(info)}
      >
      <Text category="h5" style={Styles.title}>
        {info.item.title}
      </Text>
      <Text style={Styles.itemContent} appearance="hint" category="s1">
        {info.item.description}
      </Text>
    </Card>
  );
  dateTime = (date) =>{
    date=moment(date).format('MMMM Do YYYY, h:mm:ss a');
    var currentDate = moment();

    let minute =currentDate.diff(date, 'minutes')
    let hour =currentDate.diff(date, 'hours')
    let day =currentDate.diff(date, 'days')
    let week =currentDate.diff(date, 'weeks')
    if(minute<60)
    {
      return minute+" dakika önce"
    }
    else if(hour<24)
    {
      let time = minute%60;
      return hour +" saat " + time + " dakika önce"
    }
    else if(day<7)
    {
      return day+" gün önce"
    }
    else
    {
      return week+" hafta önce"
    }
  }
  render() {
    return (
      <View style={Styles.container}>
      <KeyboardAwareScrollView
      contentContainerStyle={{
      flex: 1
      }}
        refreshControl={
          <RefreshControl
            colors={['#55AAFB']}
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
      >
        {
          this.state.spinner == true ?
          this.renderLoading()
        : this.props.notification.error==true ?
        <View style={Styles.formContainer}>
        <Text status="danger" style={Styles.text}>Herhangi bir bildiriminiz bulunmamaktadır!</Text>
        </View>
        :
          <List
            style={Styles.list}
            contentContainerStyle={Styles.listContent}
            data={this.props.notification.notifications}
            renderItem={this.renderItem.bind(this.props.notification.notifications)}
          />
        }
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profileReducer,
    notification:state.notificationReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getNotification: bindActionCreators(NotificationActions.getNotification, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(Notification);