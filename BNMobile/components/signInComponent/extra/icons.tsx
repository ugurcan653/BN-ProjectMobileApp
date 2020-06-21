import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye' fill="#55AFFB"/>
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye-off'/>
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person' fill="#55AFFB"/>
);

export const FacebookIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='facebook' fill="#55AFFB"/>
);

export const GoogleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='google' fill="#55AFFB"/>
);

export const TwitterIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='twitter' fill="#55AFFB"/>
);

