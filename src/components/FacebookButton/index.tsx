import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SocialIcon } from 'react-native-elements';

import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

type FacebookButtonProps = {
  title: string,
  loading: boolean,
  onSucess: Function,
  onError: Function,
  onStart: Function
  onEnd: Function
}

export function FacebookButton(props : FacebookButtonProps) {
  const [hasClicked, setClicked] = useState<boolean>(false);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '185907723324795',
    responseType: ResponseType.Token,
    scopes: ['public_profile', 'email']
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      props.onSucess(response.params.access_token)
      props.onEnd();
    }
    else {
      if (hasClicked) {
        props.onError();
        props.onEnd();
      }
    }
  }, [response]);

  return (
    <TouchableOpacity onPress={() => { setClicked(true); props.onStart(); promptAsync(); }}>
      <SocialIcon
        title={props.title}
        type='facebook'
        button
        // light
        onPress={() => { setClicked(true); props.onStart(); promptAsync(); }}
        loading={props.loading}
        disabled={!request}
      />
    </TouchableOpacity>
  );
}