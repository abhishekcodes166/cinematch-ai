import './App.css';
import Login from './components/Login';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utiles/Appstore';

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider> 
  );
}

export default App;
