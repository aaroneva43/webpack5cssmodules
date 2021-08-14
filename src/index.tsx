import * as React from 'react';
import * as ReactDOM from 'react-dom';
// const css = require('./app.css')
import styles from './app.module.css';

const App = () => {
  return <div className={styles.hello}>hello</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
