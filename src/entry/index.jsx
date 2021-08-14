/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the React component.
 * @param {*} messageData - data for format-message
 * @returns {string} - message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

import iconURL from './entry-icon.png';
import insetIconURL from './inset-icon.svg';

const translationMap = {
    'ja': {
        'gui.extension.xcratchExample.description': 'Xcratch 拡張の例'
    },
    'ja-Hira': {
        'gui.extension.xcratchExample.description': 'Xcratch (えくすくらっち)かくちょうのれい'
    }
};

const entry = {
    name: 'Xcratch Example',
    extensionId: 'xcratchExample',
    extensionURL: 'https://xcratch.github.io/xcx-example/dist/xcratchExample.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'example extension for Xcratch',
            description: 'Description for example extension for Xcratch',
            id: 'gui.extension.xcratchExample.description'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/xcratch/xcx-example/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
