# xcratch-example
example extension for Xcratch ([yokobond/xcratch: Extendable Scratch3 Programming Environment](https://github.com/yokobond/xcratch/))

## ✨ What You can Do with Xcratch

Open [Xcratch Example](https://yokobond.github.io/xcratch/?project=https://yokobond.github.io/xcratch-example/examples/Xcratch%20Example.sb3) to look at what you can do with Xcratch. 

This project using "Xcratch Example" extension which add an extra-block "do it" to normal Scratch. This "do it" block executes string in its input field as a sentence in Javascript and return the result.

You can make own extension based on this repo and publish a project using your extension on the web. 

## How to Develop Own Extension

There are some node scripts in "package.json" to develop original extension.
Extension name, ID must be changed for your extension.
These scripts assumed the scratch-gui is "../scratch-gui". Download scratch-gui on that location or change the script argument.

- `install` : install extension in local scratch-gui for development
- `build` : build module file for distribution

### Extension Development

Install-script installs an extension in a local Scratch server for development. 
It makes links of source to local scratch-gui/scratch-vm and modifies code of Scratch to appear the extension on its extension selector. 

Run the script by node.js as follows.

```sh
node ./scripts/install.js --link -C --id="xcratchExample" --gui="../scratch-gui"
```

install.js accepts these commandline arguments.

- --link : use symbolic link instead of copy sources
- --id : extensionID of this extension
- --dir : directory name of the extension will be copied (optional, default: extensionID)
- --gui : location of scratch-gui from current dir (optional, default: "../scratch-gui")
- --vm : location of scratch-vm form current dir (optional, default: "gui/node_modules/scratch-vm")
- --url : URL to get this module as a lodable extension for Xcratch (optional)
- -C : make the extension as a member of core-extensions


After your extension is installed, start dev-server of scratch-gui and debug using browser's dev-tools.

```sh
cd ../scratch-gui && npm run start -- --https
```



### Module Building

Build-script bundles entry/block code and resources into one module file. It copy files to temporal directories in scratch-gui/scratch-vm and bundles by [rollup.js](https://rollupjs.org/guide/en/).

Run the script by node.js as follows.

```sh
node ./scripts/build.js --name=xcratchExample --block="./src/block" --entry="./src/entry" --gui="../scratch-gui" --output="./dist"
```

build.js accepts these commandline arguments.

- --name: name of the module file (without '.mjs')
- --block : location of block files from current dir
- --entry : location of entry files from current dir
- --gui : location of scratch-gui from current dir (optional, default: "../scratch-gui")
- --vm : location of scratch-vm form current dir (optional, default: "gui/node_modules/scratch-vm")
- --url : URL to get its module as a lodable extension for Xcratch (optional)
- --output : location to save module form current dir (optional, default: "./build")

## Author

👤 **Koji Yokokawa**

* Website: http://www.yengawa.com/
* Github: [@yokobond](https://github.com/yokobond)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/yokobond/xcratch-example/issues). 
## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [Koji Yokokawa](https://github.com/yokobond).<br />
This project is [MIT](https://github.com/yokobond/xcratch-example/blob/master/LICENSE) licensed.
