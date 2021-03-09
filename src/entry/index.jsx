import React from 'react';
import {FormattedMessage} from 'react-intl';

import xcratchExampleIconURL from './entry-icon.png';
import xcratchExampleInsetIconURL from './inset-icon.svg';

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
    extensionURL: 'https://yokobond.github.io/xcratch-example/dist/xcratchExample.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: xcratchExampleIconURL,
    insetIconURL: xcratchExampleInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="example extension for Xcratch"
            description="Description for example extension for Xcratch"
            id="gui.extension.xcratchExample.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/yokobond/xcratch-example/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
