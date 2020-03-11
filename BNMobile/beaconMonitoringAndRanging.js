
import React, {Component} from 'react';
import Beacons  from 'react-native-beacons-manager';
import moment   from 'moment';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import ListView from 'deprecated-react-native-listview';
const TIME_FORMAT = 'MM/DD/YYYY HH:mm:ss';
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
  },
  btleConnectionStatus: {
    // fontSize: 20,
    // paddingTop: 20
  },
  headline: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 16,
  },
  iconContainer: {
    flexDirection: 'column',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  majorMinorContainer: {
    flexDirection: 'row',
  },
  smallText: {
    fontSize: 11,
  },
  actionsContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 160,
    backgroundColor: '#A6A6A6',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  actionText: {
    alignSelf: 'center',
    fontSize: 11,
    color: '#F1F1F1',
  },
});
export class BeaconMonitoringAndRanging extends Component {
  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;
  // will be set as a reference to "regionDidEnter" event:
  regionDidEnterEvent = null;
  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;

  state = {
    // region information
    uuid: 'fda50693-a4e2-4fb1-afcf-c6eb07647825',
    identifier: 'some id',

    rangingDataSource:     new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
    regionEnterDatasource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
    regionExitDatasource:  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])
  };
  async requestFinePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  componentDidMount() {
    this.requestFinePermission();
   // Tells the library to detect iBeacons
Beacons.detectIBeacons()

// Start detecting all iBeacons in the nearby
try {
  Beacons.startRangingBeaconsInRegion('REGION1')
  console.log(`Beacons ranging started succesfully!`)
} catch (err) {
  console.log(`Beacons ranging not started, error: ${error}`)
}

// Print a log of the detected iBeacons (1 per second)
DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
  console.log('Found beacons!', data.beacons)
})
  }

  componentDidUnMount() {
    const { uuid, identifier } = this.state;
    const region = { identifier, uuid };

    // stop ranging beacons:
    Beacons
    .stopRangingBeaconsInRegion(identifier, uuid)
    .then(() => console.log('Beacons ranging stopped succesfully'))
    .catch(error => console.log(`Beacons ranging not stopped, error: ${error}`));

    // stop monitoring beacons:
    Beacons
    .stopMonitoringForRegion(region)
    .then(() => console.log('Beacons monitoring stopped succesfully'))
    .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`));

    // remove ranging event we registered at componentDidMount
    this.beaconsDidRangeEvent.remove();
    // remove beacons events we registered at componentDidMount
    this.regionDidEnterEvent.remove();
    this.regionDidExitEvent.remove();
  }

  render() {
    const { bluetoothState, rangingDataSource, regionEnterDatasource, regionExitDatasource } =  this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          ranging beacons in the area:
        </Text>
        <ListView
          dataSource={ rangingDataSource }
          enableEmptySections={ true }
          renderRow={this.renderRangingRow}
        />
        <Text style={styles.headline}>
          monitoring enter information:
        </Text>
        <ListView
          dataSource={ regionEnterDatasource }
          enableEmptySections={ true }
          renderRow={this.renderMonitoringEnterRow}
        />

        <Text style={styles.headline}>
          monitoring exit information:
        </Text>
        <ListView
          dataSource={ regionExitDatasource }
          enableEmptySections={ true }
          renderRow={this.renderMonitoringLeaveRow}
        />
      </View>
    );
  }

  renderRangingRow = (rowData) => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
        </Text>
      </View>
    );
  }


  renderMonitoringEnterRow = ({ identifier, uuid, minor, major, time }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          Identifier: {identifier ? identifier : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          UUID: {uuid ? uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {major ? major : ''}
        </Text>
        <Text style={styles.smallText}>
          Minor: { minor ? minor : ''}
        </Text>
        <Text style={styles.smallText}>
          time: { time ? time : 'NA'}
        </Text>
      </View>
    );
  }

  renderMonitoringLeaveRow = ({ identifier, uuid, minor, major, time }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          Identifier: {identifier ? identifier : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          UUID: {uuid ? uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {major ? major : ''}
        </Text>
        <Text style={styles.smallText}>
          Minor: { minor ? minor : ''}
        </Text>
        <Text style={styles.smallText}>
          time: { time ? time : 'NA'}
        </Text>
      </View>
    );
  }
  
}