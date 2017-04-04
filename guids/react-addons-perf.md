# react-addons-perf

## install npm
npm install --save-sev react-addons-perf

## usage
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';

import { App } from './containers';

// ...codes

Perf.start();

ReactDOM.render(<App />, document.getElementById('app'));

Perf.stop();
const measurements = Perf.getLastMeasurements()
Perf.printInclusive(measurements)
Perf.printExclusive(measurements)
Perf.printWasted(measurements)
```
