import React from 'react';
import ImageStyle from 'react-native'
import { Icon, IconElement } from '@ui-kitten/components';

export const EmailIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill="#55AFFB" name='email'/>
);
export const MapIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill="#55AFFB" name='map' />
);

export const PhoneIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} fill="#55AFFB" name='phone'/>
);

