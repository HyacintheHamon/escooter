import {createBottomTabNavigator, createAppContainer} from 'react-navigation';


import Tier from '../screens/Tier/index';
import Voi from '../screens/Voi/index';
import Map from '../screens/Map/index';


const RootStack = createBottomTabNavigator({
    Tier: Tier,
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
