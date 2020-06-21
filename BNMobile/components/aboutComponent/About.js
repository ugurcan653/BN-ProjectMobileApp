import React, {Component} from 'react';
import { View, ImageBackground} from 'react-native';
import {Card, Text } from '@ui-kitten/components';
import Styles from './Styles'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class About extends Component {
  Header = () => (
    <React.Fragment>
      <ImageBackground
      style={{
        height: responsiveHeight(45),
        width: responsiveWidth(90),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
      }}
      // source={{
      //   uri: 'https://upload.wikimedia.org/wikipedia/commons/4/46/BN_Logo_1000px.png',
      // }}
      source={
        require('../../assets/bnLogo.png')
      }
    />
      <Text style={[Styles.headerText,Styles.bnColor]} category="h6">
        Motivasyonumuz hakkında kısa bir yazı.
      </Text>
    </React.Fragment>
  );
  Footer = () => (
    <View style={Styles.footerContainer}>
      <View style={Styles.itemAuthoringContainer}>
      </View>
        <Text style={(Styles.iconButton, Styles.bnColor)}>
        <Icon
        name={'globe'}
        color={'#55AFFB'}
        size={15}> </Icon>Benimkinerede.com</Text>
    </View>
  );

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={Styles.container}>
      <Card header={this.Header} footer={this.Footer}>
        <Text style={Styles.bnColor}>
        Günümüz dünyasında artık insanlar çok meşguldür ve her an her şeylerini kaybedebilmektedirler.
        Bizim projemiz ise insanların bu tip sorunlarını ortadan kaldırmak amacıyla ortaya çıkmış bir sosyal sorumluluk projesi olmaktadır.
        </Text>
      </Card>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}