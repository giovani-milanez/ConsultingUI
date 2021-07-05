import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SocialIcon } from 'react-native-elements';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

type GoogleButtonProps = {
  title: string,
  loading: boolean,
  onSucess: Function,
  onError: Function
}

export function GoogleButton(props : GoogleButtonProps) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: '298374665465-8pqbsk0j8taauo015v0otjias4d9bd6r.apps.googleusercontent.com',
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: '298374665465-7a45vnk7rtgluiop788juljjhlqbaqpl.apps.googleusercontent.com',
  });
  const [hasClicked, setClicked] = useState<boolean>(false);

  React.useEffect(() => {
    if (response?.type === 'success') {
      props.onSucess(response.params.id_token)
    }
    else {
      if (hasClicked)
        props.onError();
    }
  }, [response]);

  return (
    <TouchableOpacity onPress={() => { setClicked(true); promptAsync() }}>
      <SocialIcon
        title={props.title}
        type='google'
        button
        // light
        onPress={() => { setClicked(true); promptAsync() }}
        loading={props.loading}
        disabled={!request}
      />
    </TouchableOpacity>
  );
}