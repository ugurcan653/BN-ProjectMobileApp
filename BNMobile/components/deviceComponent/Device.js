import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, List, Text, Layout} from '@ui-kitten/components';
import {ArrowRightIcon} from './extra/icons';

export default class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  devices = [
    {type: 'animal', name: 'cihaz1', metre: '5 metre'},
    {type: 'sıvık', name: 'cihaz2', metre: 'bulmasakta olur'},
    {type: 'hapaz', name: 'cihaz3', metre: 'buldum bunu ben'},
  ];
  onItemPress = index => {
    navigation && navigation.navigate('Article3');
  };

  renderItem = info => (
    <View style={styles.item}>
      <Layout style={styles.itemImage}>
        <View style={styles.layout}>
          <View style={styles.left}>
            <Text style={styles.itemTitle} category="h4" status="control">
              {info.item.name}
            </Text>
            <Text style={styles.itemDescription} category="s1" status="control">
              Tür: {info.item.type}
            </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.itemDescription} category="h6" status="control">
              {info.item.metre}
            </Text>
          </View>
        </View>

        <View style={styles.itemFooter}>
          <Image
            style={styles.headerImage}
            source={{
              uri:
                'https://clipartart.com/images/default-profile-picture-clipart-1.jpg',
            }}
          />
          <View style={styles.bosluk}></View>
          <Button
            style={styles.iconButton}
            appearance="outline"
            status="control"
            icon={ArrowRightIcon}
            onPress={() => onItemPress(info.index)}>
            {'Details'}
          </Button>
        </View>
      </Layout>
    </View>
  );
  render() {
    return (
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={this.devices}
        renderItem={this.renderItem.bind(this.devices)}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 75,
    flex: 1,
  },
  item: {
    marginVertical: '3%',
    height: 180,
    borderRadius: 15,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#55AFFB',
    borderRadius: 15,
  },
  itemDescription: {
    marginVertical: '5%',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconButton: {
    flex: 3
  },
  bosluk: {
    flex:3
  },
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    borderRadius: 75,
    flex: 2,
  },
});
