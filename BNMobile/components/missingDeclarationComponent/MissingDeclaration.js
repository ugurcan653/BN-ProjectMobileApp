import Styles from './Styles';
import React, {Component} from 'react';
import {Select, Layout, Input, Button, CheckBox, Text} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IndoorMap from '../../IndoorMap'
import { Callout } from 'react-native-maps';
export default class MissingDeclaration extends Component {
  data = [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}];
  state = {
    selectedOption: null,
    checkedInformations:false,
    checkedAutoFind:false,
    coordinate:""
  };
  componentDidMount()
  {
    coordinate = this.props.coordinate
  }
  onCheckedInformations = () => {
    this.setState({
        checkedInformations:!this.state.checkedInformations
    })
  };
  onAutoFind = () => {
    this.setState({
        checkedAutoFind:!this.state.checkedAutoFind
    })
  };

  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <Layout style={Styles.formContainer} level="1">
          <Select
            style={Styles.input}
            data={this.data}
            placeholder="Cihazınızı seçiniz"
            onSelect={item =>
              this.setState({
                selectedOption: item,
              })
            }
            selectedOption={this.state.selectedOption}
            textStyle={Styles.customizeTextStyle}
          />
          <CheckBox
            style={Styles.input}
            text='Kullanıcı iletişim bilgilerini kullan'
            checked={this.state.checkedInformations}
            onChange={this.onCheckedInformations}
        />
          <Input
          style={Styles.input}
            label="Telefon numaranız"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            keyboardType={'numeric'}
          />
          <Input
          style={Styles.input}
            label="Email"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
          />
          <Text 
          style={Styles.text}
          category="s2"
          >Cihazın son görüldüğü yer</Text>
          <CheckBox
            style={Styles.input}
            text='Cihazın son konumu otomatik olarak belirlensin'
            checked={this.state.checkedAutoFind}
            onChange={this.onAutoFind}
        />
        </Layout>
        <Button style={Styles.save} size="giant">
            Go ahead
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}
