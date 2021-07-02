import * as React from 'react';
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';


export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name : string, params? : ParamListBase) {
  navigationRef.current?.navigate<string>(name, params);
}

// export function push(...args) {
//   navigationRef.current?.dispatch(StackActions.push(...args));
// }