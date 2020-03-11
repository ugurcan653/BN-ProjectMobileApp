import React, {Component} from 'react';
import {View, Text, Button, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from './Styles';
export default class About extends Component {
  render() {
    return (
        <View style={Styles.container}>
          <View style={Styles.main}>
           <View style={Styles.image}>
                <Image></Image>
           </View>
           <View style={Styles.header}>
               <Text style={Styles.headerText}>
                   Günümüz dünyasında artık insanlar çok meşguldür ve her an her şeylerini kaybedebilmektedirler.
               </Text>
           </View>
           <View style={Styles.detail}>
               <Text style={Styles.detailText}>
               Günümüz dünyasında artık insanlar çok meşguldür ve her an her şeylerini kaybedebilmektedirler.
               Bizim projemiz ise insanların bu tip sorunlarını ortadan kaldırmak amacıyla ortaya çıkmış bir sosyal sorumluluk projesi olmaktadır.
               </Text>
           </View>
           <View style={Styles.footer}>
           <Icon
                style={Styles.icons}
                name={'window-maximize'}
                color={'#55AFFB'}
                size={30}></Icon>
               <Text style={Styles.detailText}>Web Sitemizi Ziyaret Edin</Text>
           </View>
          </View>
        </View>
      );
  }
}
