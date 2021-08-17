import * as React from 'react';
import * as ReactDOM from 'react-dom';
// const css = require('./app.css')
import styles from './app.module.less';

const App = () => {
  return (
    <div className={styles.hello}>
      hello<p className={styles.world}>world</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
