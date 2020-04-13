import React from 'react';
import ImageStyle from 'react-native'
import { Icon, IconElement } from '@ui-kitten/components';

export const SearchIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill="#55AFFB" name='search' size={100}/>
);

