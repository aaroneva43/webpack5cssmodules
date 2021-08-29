import * as React from 'react';
import * as ReactDOM from 'react-dom';
// const css = require('./app.css')
import styles from './app.module.less';
import Button from './components/form/Button/';

const App = () => {
  return (
    <div className={styles.hello}>
      hello<p className={styles.world}>world</p>
      <Button><a href="https://google.com">href</a></Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
