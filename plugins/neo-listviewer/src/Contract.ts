import { PluginContract, PropType as PluginProperty } from '@nintex/form-plugin-contract';

const dataobject: PluginProperty = {
  type: 'string',
  title: 'DSV Object JSON',
  description: 'Insert the DSV JSON string for your list of records.',
};

const listURL: PluginProperty = {
  type: 'string',
  title: 'List URL',
  description: 'The URL of the list used in the DSV, for this to work you need to ensure ID is returned in the DSV data',
};

const pageItemLimit: PluginProperty = {
  type: 'string',
  enum: ['5', '10', '15', '30', '50', '100'],
  title: 'Page Item Limit',
  description: 'Number of items to show per page',
  defaultValue: '5',
};

const selectedItems: PluginProperty = {
  type: 'string',
  title: 'Selected Items',
  description: 'Store selected item IDs, ID must be available in JSON to work.',
  isValueField: true,
};

const ignoredKeys: PluginProperty = {
  type: 'string',
  title: 'Keys to ignore',
  description: 'Insert a comma separated list of keys to ignore.',
};

const renamedKeys: PluginProperty = {
  type: 'string',
  title: 'Keys to Rename',
  description: 'Use key-value pairs to rename columns separating by colon e.g. oldKey1:newKey1,oldKey2:newKey2',
};

const orderKeys: PluginProperty = {
  type: 'string',
  title: 'Specify the order of keys',
  description: 'Semicolon separate a list of keys to define the order e.g. Key1;Key2;Key3',
};

const editableKeys: PluginProperty = {
  type: 'string',
  title: 'Specify the columns that should be editable',
  description: 'Semicolon separate a list of keys (column names) to define the order e.g. Key1;Key2;Key3',
};

const dateFormat: PluginProperty = {
  type: 'string',
  title: 'Preferred date format',
  description: 'Enter a common data format to set the dates returned accordingly e.g. YYYY-MM-DD HH:mm:ss',
};

const boolFilter: PluginProperty = {
  title: 'Show filter options?',
  type: 'boolean',
  defaultValue: true,
};

export const pluginContract: PluginContract = {
  controlName: 'neo-listviewer',
  fallbackDisableSubmit: false,
  description: 'Display a list of records',
  iconUrl: "group-control",
  groupName: 'Visual Data',
  version: '1.0',
  properties: {
    dataobject,
    listURL,
    pageItemLimit,
    selectedItems,
    ignoredKeys,
    renamedKeys,
    orderKeys,
    editableKeys,
    dateFormat,
    boolFilter,
  },
  events: ["ntx-value-change"],
  standardProperties: {
    fieldLabel: true,
    description: true,
  },
};
