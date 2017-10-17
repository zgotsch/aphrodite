/* @flow */
import {defaultSelectorHandlers} from './generate';
import makeExports from './exports';

const useImportant = true; // Add !important to all style definitions

const madeExports = makeExports(
    useImportant,
    defaultSelectorHandlers
);
export const StyleSheet = madeExports.StyleSheet;
export const css = madeExports.css;
export const StyleSheetServer = madeExports.StyleSheetServer;
export const StyleSheetTestUtils = madeExports.StyleSheetTestUtils;
