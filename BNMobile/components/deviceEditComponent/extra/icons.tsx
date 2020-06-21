import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='camera'/>
);

export const CloseOutlineIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='close-outline' fill="#55AFFB"/>
);

