# Inline Styles that Work

Support for colocating your styles with your React component.

- Supports media queries without window.matchMedia
- Supports pseudo-selectors like `:hover`, `:active`, etc. without needing to
  store hover or active state in components. `:visited` works just fine too.
- Respects precedence order when specifying multiple styles
- Requires no AST transform (though you can have one to replace
  `StyleSheet.create` with a pre-computed value at compile time if you'd like).
- Injects only the exact styles needed for the render into the DOM.
- Can be used for server rendering (this is TODO at the moment).
- No dependencies, tiny
- No external CSS file generated for inclusion

# API

    import React, { Component } from 'react';
    import StyleSheet, { css } from 'inline-styles-that-work';

    class App extends Component {
        render() {
            return <div>
                <span className={css([styles.red])}>
                    This is red.
                </span>
                <span className={css([styles.hover])}>
                    This turns red on hover.
                </span>
                <span className={css([styles.small])}>
                    This turns red when the browser is less than 600px width.
                </span>
                <span className={css([styles.red, styles.blue])}>
                    This is blue.
                </span>
                <span className={css([styles.blue, styles.small])}>
                    This is blue and turns red when the browser is less than
                    600px width.
                </span>
            </div>;
        }
    }

    const styles = StyleSheet.create({
        red: {
            backgroundColor: 'red'
        },

        blue: {
            backgroundColor: 'blue'
        },

        hover: {
            ':hover': {
                backgroundColor: 'red'
            }
        },

        small: {
            '@media (max-width: 600px)': {
                backgroundColor: 'red',
            }
        }
    });

# Buffering

To avoid making a new style tag for each individual call to `css`, you can use 
buffering. A similar technique will enable server rendering.

On the client, instead of just this:

    ReactDOM.render(<App/>, document.getElementById('root'));

You can do this:

    StyleSheet.startBuffering();
    ReactDOM.render(<App/>,
                    document.getElementById('root'),
                    StyleSheet.flush);

Note that this is an optimization, and the first option will work just fine.

Once implemented, server rendering will look something like this:

    StyleSheet.clearClassNameCache();
    StyleSheet.startBuffering();

    // Contains the markup with references to generated class names
    var html = ReactDOMServer.renderToString(<App/>);

    // Contains the CSS referenced by the html string above, and the references 
    // to the classNames generated during the rendering of html above.
    var {css, classNames} = StyleSheet.collect();

    return `
        <html>
            <head>
                <style>{css}</style>
            </head>
            <body>
                <div id='root'>{html}</div>
                <script src="./bundle.js"></script>
                <script>StyleSheet.markInjected({classNames});</script>
            </body>
        </html>
    `;

# TODO

- Autoprefixing
- Serverside rendering
- Optional AST transformation to replace StyleSheet.create with an object
  literal.
- Add Flow annotations
- Add JSdoc
- Enable ESlint
- Automatic conversion of numbers to strings for properties where we know what
  the unit is. See
  [CSSProperty.js](https://github.com/facebook/react/blob/master/src/renderers/dom/shared/CSSProperty.js)
  in React.
- Consider removing !important from everything.

# Other solutions

- [js-next/react-style](https://github.com/js-next/react-style)
- [dowjones/react-inline-style](https://github.com/dowjones/react-inline-style)
- [martinandert/react-inline](https://github.com/martinandert/react-inline)
