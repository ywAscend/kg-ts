import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import RouterCom from './router';
import './index.less';

ReactDOM.render(
  <Provider store={store}>
    <RouterCom/>
  </Provider>,
  document.getElementById('root')
);


