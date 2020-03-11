import Styles from './Styles';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {Button, Input, Layout} from '@ui-kitten/components';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class DeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Uğur',
      surname: 'Çakar',
      email: 'ugurcakar@hotmail.com',
      phone: '5555555555',
      password: 'baguvix',
      passwordVisible: false,
    };
  }
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  };
  setEmail = () => {};
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
          <Image
            style={{height:responsiveHeight(30),width:responsiveWidth(100),justifyContent: "center",alignItems: "center",resizeMode: 'contain'}}
            source={{
              uri:
                'url',
            }}
          />
        <Layout style={Styles.formContainer} level="1">
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Cihaz adı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Türü'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Güven aralığı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Batarya seviyesi'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
            <Input 
            style={Styles.input}
            value={this.state.name}
            label='Cihazın güncel uzaklığı'
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            disabled={true}
          />
        </Layout>
        <Button style={Styles.save} size="giant">
          Edit
        </Button>
        </KeyboardAwareScrollView>
    );
  }
}
