import React from 'react';
import { ApplicationProvider, IconRegistry,Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {DrawerMenu} from './DrawerMenu';
import Notification from './components/notificationComponent/Notification';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import MapView from 'react-native-maps';
import IndoorMap from './IndoorMap';

import {
  TouchableOpacity,
} from 'react-native';
const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <IconRegistry icons={EvaIconsPack} />
    <DrawerMenu renderPage={pageChange("Kartlar")}></DrawerMenu>
  </ApplicationProvider>
);
const MapPage = ()=>(
  <Layout style={{flex:1,backgroundColor:'#cccccc'}}>
    <IndoorMap></IndoorMap>
  </Layout>
);
const Page = ()=>(
  <Layout style={{flex:1,backgroundColor:'#cccccc'}}>
        <TouchableOpacity onPress={()=>scanCard()}>
          <Text>Scan card!</Text>
        </TouchableOpacity>
        <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={{
                color: "black",
                fontSize: 12,
              }}
              inputStyle={{
                fontSize: 16,
                color: "black",
              }}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}/>
  </Layout>
);
const scanCard = async () => {
  try {
    const card = await CardIOModule.scanCard()
    alert(JSON.stringify(card))
  } catch (err) {
    console.log(err)
  }
}
const pageChange=(pageName)=>{
  if(pageName=="Anasayfa"){
    return <Page></Page>
  }
  else if(pageName=="Kartlar"){
    return <Notification></Notification>
  }
  else if(pageName=="Haritalar"){
    return <IndoorMap></IndoorMap>
  }

}
export default App;