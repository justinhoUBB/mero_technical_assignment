import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homescreen';
import SubmitReviewScreen from './screens/submitreviewscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="inputscreen" component={SubmitReviewScreen}/>
      </Stack.Navigator>
    </NavigationContainer>  
    );
};
