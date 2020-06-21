import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye' fill="#55AFFB"/>
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye-off'/>
);

export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='camera'/>
);

export const CloseOutlineIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='close-outline' fill="#55AFFB"/>
);

