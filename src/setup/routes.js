import {createBottomTabNavigator, createAppContainer} from 'react-navigation';


import Bird from '../screens/Bird/index';
import Voi from '../screens/Voi/index';
import Map from '../screens/Map/index';


const RootStack = createBottomTabNavigator({
    Bird: Bird,
    Voi: Voi,
    Map: Map
},{
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});

const App = createAppContainer(RootStack);

export default App;
