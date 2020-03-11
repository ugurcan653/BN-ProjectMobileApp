import React , {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Avatar, Button, Card, List, Text } from '@ui-kitten/components';
import { HeartIcon, MessageCircleIcon } from './extra/icons';
import { Article } from './extra/data';
const data: Article[] = [
  Article.howToEatHealthy(),
  Article.morningWorkouts(),
  Article.whyWorkoutImportant(),
];
export class NotificationsPage extends Component{
  render(){
    return (
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={this.renderItem}
      />
    );
  }
  renderItemHeader = (info: ListRenderItemInfo<Article>) => (
    <ImageBackground
    style={styles.itemHeader}
    source={info.item.image}
  />
  );

  renderItem = (info: ListRenderItemInfo<Article>) => (
    <Card
    style={styles.item}
    header={() => this.renderItemHeader(info)}
    footer={() => this.renderItemFooter(info)}
    onPress={() => onItemPress(info.index)}>
    <Text category='h5'>
      {info.item.title}
    </Text>
    <Text
      style={styles.itemContent}
      appearance='hint'
      category='s1'>
      {`${info.item.content.substring(0, 82)}...`}
    </Text>
  </Card>
  );
  renderItemFooter = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Avatar source={info.item.author.photo}/>
      <View style={styles.itemAuthoringContainer}>
        <Text
          category='s2'>
          {info.item.author.fullName}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {info.item.date}
        </Text>
      </View>
      <Button
        style={styles.iconButton}
        appearance='ghost'
        status='basic'
        icon={MessageCircleIcon}>
        {`${info.item.comments.length}`}
      </Button>
      <Button
        style={styles.iconButton}
        appearance='ghost'
        status='danger'
        icon={HeartIcon}>
        {`${info.item.likes.length}`}
      </Button>
    </View>
  );
  
}

const styles = StyleSheet.create({
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
  itemDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  itemDescription: {
    marginHorizontal: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});