import './query-assigned-elements-214d6340.js.js';
import { Z as ZincVersion } from './zinc-api-f0859f9f.js.js';

const config = {
  title: 'nac-table',
  fallbackDisableSubmit: false,
  description: 'Renders a table based on json data',
  iconUrl: 'rich-text',
  groupName: 'Visual',
  pluginAuthor: 'Jake Dennison',
  version: ZincVersion.CurrentVersion,
  properties: {
    Object: {
      type: 'string',
      title: 'object as a string',
      description: 'Store the object in a variable to use here'
    },
  },
  standardProperties: {
    readOnly: true,
    required: true,
    description: true
  }
};

export { config };