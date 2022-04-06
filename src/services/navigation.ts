import * as React from 'react';
import {RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const isReadyRef: RefObject<boolean> = React.createRef();

export const navigationRef: RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.log('Navigation not ready yet');
  }
}
