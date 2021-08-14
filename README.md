# xcx-example
An example extension for ([Xcratch: Extendable Scratch3 Programming Environment](https://xcratch.github.io/))

## ✨ What You can Do with Xcratch

Open [Example Project](https://xcratch.github.io/editor/#https://xcratch.github.io/xcx-example/projects/example.sb3) to look at what you can do with "Xcratch Example" extension. 

Or, load this extension on [Xcratch](https://xcratch.github.io/) with the Extension URL

```
https://xcratch.github.io/xcx-example/dist/xcratchExample.mjs
```


This project using "Xcratch Example" extension which add an extra-block "do it" to normal Scratch. This "do it" block executes string in its input field as a sentence in Javascript and return the result.

## How to Develop

### Environment Settings

First of all, download [yokobond/scratch-gui at xcratch](https://github.com/yokobond/scratch-gui/tree/xcratch) and setup it as your extension to be registered. 

```sh
git clone -b xcratch https://github.com/yokobond/scratch-gui.git
cd ./scratch-gui
npm install
cd ..
```

Clone [xcratch/xcx-example](https://github.com/xcratch/xcx-example).

```sh
git clone https://github.com/xcratch/xcx-example.git
cd ./xcx-example
npm install
```

Then register your extension in a Scratch server for debugging. Script `register.js` adds a extension in a local Scratch server. It makes links of source path to local Scratch code, and modifies code of the Scratch to appear the extension in its extension selector. 

Run the register-script by node.js as follows.

```sh
node ./scripts/register.js --link --id=extensionID -C
```

When you could not use Xcratch with some reason, you can register your extension to the normal "LLK/scratch-gui" with `--base=LLK`.

```sh
node ./scripts/register.js --id=extensionID -C --base=LLK
```

register.js accepts these command-line arguments.

- --base : base code to register in (optional, options: "LLK")
- --link : use symbolic link instead of copy sources
- --id : extensionID of this extension
- --dir : directory name of the extension will be copied (optional, default: extensionID)
- --gui : location of scratch-gui from current dir (optional, default: "../scratch-gui")
- --vm : location of scratch-vm form current dir (optional, default: "gui/node_modules/scratch-vm")
- --url : URL to get this module as a loadable extension for Xcratch (optional)
- -C : make the extension as a member of core-extensions


After your extension is registered, start dev-server of scratch-gui and debug using browser's dev-tools.

```sh
cd ../scratch-gui && npm run start -- --https
```


### Module Building

Build-script bundles entry/block code and resources into one module file. It copy files to temporal directories in scratch-gui/scratch-vm and bundles by [rollup.js](https://rollupjs.org/guide/en/).

Run the script by node.js as follows.

```sh
node ./scripts/build.js --name=extensionName --block="./src/block" --entry="./src/entry" --gui="../scratch-gui" --output="./dist"
```

build.js accepts these command-line arguments.

- --name: name of the module file (without '.mjs')
- --block : location of block files from current dir
- --entry : location of entry files from current dir
- --gui : location of scratch-gui from current dir (optional, default: "../scratch-gui")
- --vm : location of scratch-vm form current dir (optional, default: "gui/node_modules/scratch-vm")
- --url : URL to get its module as a loadable extension for Xcratch (optional)
- --output : location to save module form current dir (optional, default: "./build")


### Module Deployment

This repo has github-workflow scripts to deploy your module on its 'gh-pages'. 

First, you make 'gh-pages' branch and set it to publish according with [Configuring a publishing source for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source). 

When you push it to 'master' branch, your code is published under `https://<user>.github.io/<repository>/`. 

So that the URL of your extension module will be `https://<user>.github.io/<repository>/dist/<moduleName>.mjs` . 

Published module can be used in [Xcratch](https://xcratch.github.io/). Select 'Extension Loader' extension and input this URL, your extension blocks will appear in the block pallette. 

When you push it to 'develop' branch, `deploy-gh-pages-dev.yml` will be activated. This script publishes all your code under `https://<user>.github.io/<repository>/dev/`. 

When you would like to publish your extension module on another server, check the server accepts [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) from `https://xcratch.github.io/`. If the server was not enabled CORS, Xcratch cannot import your module. 


### How to Auto-load Extension

Xcratch loads all extensions which is used in the project automatically. 

If you make a project using at least one block of your extension and save as `projects/example.sb3`. The project can be opened with Xcratch by URL like following. 

```
https://xcratch.github.io/editor/#<project URL>
``` 

When this URL was opened in a web browser, Xcratch loads your extension module automatically then opens the project. 


## Author

👤 **Koji Yokokawa**

* Website: http://www.yengawa.com/
* Github: [@yokobond](https://github.com/yokobond)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/xcratch/xcx-example/issues). 
## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [Koji Yokokawa](https://github.com/yokobond).<br />
This project is [MIT](https://github.com/xcratch/xcx-example/blob/master/LICENSE) licensed.
