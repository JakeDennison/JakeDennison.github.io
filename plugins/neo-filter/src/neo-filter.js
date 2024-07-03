import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterArea from './FilterArea'; // Assuming FilterArea is in the same directory

class neoFilterElement extends Component {
  static propTypes = {
    inputObj: PropTypes.object.isRequired,
    outputObj: PropTypes.object.isRequired,
    src: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    inputObj: {},
  };

  static getMetaConfig() {
    return {
      controlName: 'neo-filter',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: '',
      groupName: 'NEO',
      version: '1.0',
      properties: {
        inputObj: {
          type: 'object',
          title: 'Input Object',
          description: 'Insert the input object you want to filter',
        },
        outputObj: {
          type: 'object',
          title: 'Output Object',
          description: 'Automatically stored in the form, do not use',
          isValueField: true,
        },
      },
      events: ['ntx-value-change'],
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  render() {
    const { onChange } = this.props;

    return (
      <div className="neoFilter-element">
        <FilterArea onChange={onChange} />
      </div>
    );
  }
}

export default neoFilterElement;
