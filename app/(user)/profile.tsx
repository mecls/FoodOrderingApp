import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';

const profileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>

      <Button title="SignOut" onPress={async()=>await supabase.auth.signOut()}/>
    </View>
  )
}

export default profileScreen;
//rnfe