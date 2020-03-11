import React, {Component} from 'react';
import {
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Text,
} from '@ui-kitten/components';
import {HeartIcon, MessageCircleIcon} from './extra/icons';
import {Article} from './extra/data';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const data = [
  {
    title: 'Bildirim gibi bildirim bee',
    content:
      'buraya reklam koyabilirdik',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/46/BN_Logo_1000px.png',
    site: 'Benimkinerede.com',
    time: '1h ago',
  },
];

export default class Notification extends Component {
  constructor(props) {
    super(props);
  }
  onItemPress = index => {
    // navigation && navigation.navigate('Article1');
  };

  renderItemHeader = info => (
    <ImageBackground
      style={{
        height: responsiveHeight(30),
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
      }}
      source={{
        uri: info.item.image,
      }}
    />
  );

  renderItemFooter = info => (
    <View style={styles.itemFooter}>
      <View style={styles.itemAuthoringContainer}>
        <Text style={styles.bnColor} category="s2">
        <Icon
        name={'globe'}
        color={'#55AFFB'}
        size={15}></Icon>    {info.item.site}
        </Text>
      </View>
        <Text style={(styles.iconButton, styles.bnColor)}>
        <Icon
        name={'clock'}
        color={'#55AFFB'}
        size={15}></Icon>   {info.item.time}</Text>
    </View>
  );

  renderItem = info => (
    <Card
      style={styles.item}
      header={() => this.renderItemHeader(info)}
      footer={() => this.renderItemFooter(info)}
      onPress={() => this.onItemPress(info.index)}>
      <Text category="h5" style={styles.title}>
        {info.item.title}
      </Text>
      <Text style={styles.itemContent} appearance="hint" category="s1">
        {info.item.content}
      </Text>
    </Card>
  );
  render() {
    return (
      <KeyboardAwareScrollView>
        <Layout style={styles.container} level="2">
          <List
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={this.renderItem.bind(data)}
          />
        </Layout>
        <Layout style={styles.container} level="2">
          <List
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={this.renderItem.bind(data)}
          />
        </Layout>
        <Layout style={styles.container} level="2">
          <List
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={this.renderItem.bind(data)}
          />
        </Layout>
        <Layout style={styles.container} level="2">
          <List
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={this.renderItem.bind(data)}
          />
        </Layout>
        <Layout style={styles.container} level="2">
          <List
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={this.renderItem.bind(data)}
          />
        </Layout>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
    color: '#55AFFB',
  },
  itemFooter: {
    flexDirection: 'row',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  bnColor: {
    color: '#55AFFB',
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  title: {
    color: '#55AFFB',
    fontWeight: 'bold',
  },
});
