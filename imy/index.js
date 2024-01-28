import { registerRootComponent } from 'expo';
import { webImageLibrary, nativeImageLibrary } from './your-image-library-path'; // Adjust the path based on your project structure
import { Platform } from 'react-native';

import App from './App';

export function launchImageLibrary(options, callback) {
    return Platform.OS === 'web'
      ? webImageLibrary(options, callback)
      : nativeImageLibrary(options, callback);
  }

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
