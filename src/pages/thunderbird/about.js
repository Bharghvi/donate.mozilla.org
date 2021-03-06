import React from 'react';
import ThunderbirdFooter from '../../components/thunderbird/footer.js';
import SingleForm from '../../components/single-form.js';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      aboutCopy: null
    };
  },

  componentDidMount: function() {
    var aboutCopy = (<span>{this.context.intl.formatMessage({id: 'additional_info_thunderbird'})}</span>);
    if (this.props.test === "tbdownload") {
      aboutCopy = (
        <span>
          <div><b>{this.context.intl.formatMessage({id: 'thunderbird_thank_you_note'})}</b></div>
          <br/>
          <div>{this.context.intl.formatMessage({id: 'additional_info_thunderbird'})}</div>
        </span>
      );
    }
    this.setState({
      aboutCopy: aboutCopy
    });
  },
  render: function() {
    var className = "row additional-info-container thunderbird";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    var aboutCopy = this.state.aboutCopy;
    return (
      <div className={className}>
        <div className="additional-info-page">
          <div className="container additional-page">
            <img className="internet-graphic" width="224" src="/assets/images/thunderbird/thunderbird-logo-wordmark-small.png"/>
            <div>{aboutCopy}</div>
            <br/>
            <div>{this.context.intl.formatMessage({id: 'additional_info_thunderbird_2'})}</div>
          </div>
          <SingleForm
            appName="thunderbird"
          />
        </div>
        <ThunderbirdFooter/>
      </div>
    );
  }
});
