import React from 'react';
import createReactClass from 'create-react-class';
import { FormattedMessage, IntlProvider } from 'react-intl';

const PageHeader = createReactClass({
  render() {
    return (
        <div className="bs-docs-header" id="content">
          <div className="container">
            <IntlProvider
              textComponent="h1"
            >
              <FormattedMessage
                id={this.props.titleFormatMessageId}
                description={this.props.titleFormatMessageDescription}
                defaultMessage={this.props.titleFormatMessageDefaultMessage}
              />
            </IntlProvider>
            <IntlProvider
              textComponent="p"
            >
              <FormattedMessage
                id={this.props.subTitleFormatMessageId}
                description={this.props.subTitleFormatMessageDescription}
                defaultMessage={this.props.subTitleFormatMessageDefaultMessage}
              />
            </IntlProvider>
          </div>
        </div>
    );
  }
});

export default PageHeader;
