import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class SignIn extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <Text style={Styles.benimkiNerede}>Benimki Nerede?</Text>
        </View>
        <View style={Styles.main}>
          <Text style={Styles.signIn}>Giriş Yap</Text>
          <TextInput
            style={Styles.textInput}
            placeholderTextColor="#55AFFB"
            placeholder="example@example.example"
          />
          <TextInput
            style={Styles.textInput}
            placeholderTextColor="#55AFFB"
            placeholder="parola"
          />
          <Text style={Styles.newAccount}>
            Hesabın yok mu? Buraya tıklayarak kaydolabilirsin.
          </Text>
          <View style={Styles.vertical}>
            <View>
              <Icon
                style={Styles.icons}
                name={'facebook'}
                color={'#55AFFB'}
                size={30}></Icon>
            </View>
            <View>
              <Icon
                style={Styles.icons}
                name={'google-plus'}
                color={'#55AFFB'}
                size={30}></Icon>
            </View>
            <View>
              <Icon
                style={Styles.icons}
                name={'twitter'}
                color={'#55AFFB'}
                size={30}></Icon>
            </View>
          </View>
        </View>
        <View style={Styles.footer}>
          <Button style={Styles.SignInButton} title="Giriş Yap" />
        </View>
      </View>
    );
  }
}
