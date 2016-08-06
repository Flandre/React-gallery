#README

[示例页面](https://flandre.github.io/React-gallery/)

##需要环境

[node](https://nodejs.org) ：主要运行环境

[node-gyp](https://github.com/nodejs/node-gyp) ：用于安装 node-sass

> You can install with `npm`:
``` bash
$ npm install -g node-gyp
```
You will also need to install:
  * On Unix:
    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported)
    * `make`
    * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org)
  * On Mac OS X:
    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported) (already installed on Mac OS X)
    * [Xcode](https://developer.apple.com/xcode/download/)
      * You also need to install the `Command Line Tools` via Xcode. You can find this under the menu `Xcode -> Preferences -> Downloads`
      * This step will install `gcc` and the related toolchain containing `make`
  * On Windows:
    * Visual C++ Build Environment:
      * Option 1: Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the **Default Install** option.
      * Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select *Common Tools for Visual C++* during setup. This also works with the free Community and Express for Desktop editions.
      >> :bulb: [Windows Vista / 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)
    * Install [Python 2.7](https://www.python.org/downloads/) (`v3.x.x` is not supported), and run `npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)
    * Launch cmd, `npm config set msvs_version 2015`
    If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.

如不在服务器根目录，dist中index.html文件需要更改路径

##运行

```bash
$ npm install
$ npm run serve
```
