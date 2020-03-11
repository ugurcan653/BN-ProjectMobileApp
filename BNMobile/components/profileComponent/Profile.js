import Styles from './Styles';

import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Button, Input, Layout} from '@ui-kitten/components';
import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';

export default class Profile extends Component {
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

  onSignUpButtonPress = () => {
    navigation && navigation.navigate('SignUp2');
  };
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  };
  setEmail = () => {};
  render() {
    return (
      <KeyboardAvoidingView style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Image
            style={Styles.headerImage}
            source={{
              uri:
                'https://lh6.googleusercontent.com/proxy/Bqqq2DHYLI-9bYWmUQkSz7UdLfvGavr6tPysMgBl6y7GDFFwc1dwlxqOr0tCtkWVVRfXI9j-fx-0LM5f-GW2jWfm4aCIkj5HJmwDuTL8h4mh5uzlR0plpUk',
            }}
          />
        </View>
        <Layout style={Styles.formContainer} level="1">
          <Input
            placeholder="Name"
            style={Styles.input}
            icon={PersonIcon}
            value={this.state.name}
          />
          <Input
            placeholder="Surname"
            style={Styles.input}
            icon={PersonIcon}
            value={this.state.surname}
          />
          <Input
            placeholder="Email"
            style={Styles.input}
            icon={PersonIcon}
            value={this.state.email}
          />
          <Input
            placeholder="Phone Number"
            style={Styles.input}
            icon={PersonIcon}
            value={this.state.phone}
          />
          <Input
            style={Styles.input}
            placeholder="Password"
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
            value={this.state.password}
          />
        </Layout>
        <Button style={Styles.save} size="giant">
          Save changes
        </Button>
      </KeyboardAvoidingView>
    );
  }
}
