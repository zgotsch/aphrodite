/* @flow */
import ReactDOM from 'react-dom';
import React from 'react';
import { StyleSheet } from '../../src/index.js';

import StyleTester from './StyleTester.js';

StyleSheet.rehydrate(window.renderedClassNames);
const root = document.getElementById('root');

if (root !== null) {
    ReactDOM.render(
        <StyleTester />,
        root);
}
