import Styles from './Styles';

import React, {Component} from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
export default class AddCreditCard extends Component {
  scanCard = async () => {
    try {
      const card = await CardIOModule.scanCard();
      alert(JSON.stringify(card));
    } catch (err) {
    }
  };
  _onChange(form)
  {
  }
  render() {
    return (
      <KeyboardAwareScrollView>
        <Layout style={Styles.container}>
          <TouchableOpacity onPress={() => this.scanCard()}>
            <CreditCardInput 
              onChange={(form) => this._onChange(form)}
              onPress={() => this.scanCard()}
              requiresName
              requiresCVC
            />
        <Button 
        onPress={this.onAddButtonPress} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor}  >
          ADD NEW CARD
        </Button>
        </TouchableOpacity>
        </Layout>
      </KeyboardAwareScrollView>
    );
  }
}

