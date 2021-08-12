const path = require('path');
const replace = require('replace-in-file');

function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            if (arg.slice(0, 2) === '--') {
                // long arg
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2, longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            else if (arg[0] === '-') {
                // flags
                const flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

const args = getArgs();


if (!args['username']) {
    process.stderr.write('"--username <github username>" is not set\n');
    process.exit(1);
}
const username = args['username'];

if (!args['repo']) {
    process.stderr.write('"--repo <github repository>" is not set\n');
    process.exit(1);
}
const repo = args['repo'];

if (!args['extensionID']) {
    process.stderr.write('"--extensionID <extension ID>" is not set\n');
    process.exit(1);
}
const extensionID = args['extensionID'];

if (!args['extensionName']) {
    process.stderr.write('"--extensionName <extension name>" is not set\n');
    process.exit(1);
}
const extensionName = args['extensionName'];

if (!args['extensionClass']) {
    process.stderr.write('"--extensionClass <extension class name>" is not set\n');
    process.exit(1);
}
const extensionClass = args['extensionClass'];

const options = {
    files:[
        'package.json',
        'README.md',
        '.github/workflows/*.yml',
        'src/**/*.js',
        'src/**/*.jsx',
    ],
    from: [
        /yokobond/g,
        /xcratch-example/g,
        /xcratchExample/g,
        /Xcratch Example/g,
        /XcratchExample/g
    ],
    to: [
        username,
        repo,
        extensionID,
        extensionName,
        extensionClass
    ],
};

async function replaceAllProperties() {
    try {
        const results = await replace(options)
        console.log('Replacement results:', results);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

replaceAllProperties();