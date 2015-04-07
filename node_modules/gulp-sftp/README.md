# [gulp](http://gulpjs.com)-sftp [![Build Status](https://travis-ci.org/gtg092x/gulp-sftp.svg?branch=master)](https://travis-ci.org/gtg092x/gulp-sftp)

> Upload files via SSH

Useful for uploading and deploying things via sftp. Right now this plugin just uploads everything. Caching and hash comparison are two TODO items.  

[![NPM](https://nodei.co/npm/gulp-sftp.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-sftp/)

## Install

```bash
$ npm install --save-dev gulp-sftp
```


## Usage

```js
var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('default', function () {
	return gulp.src('src/*')
		.pipe(sftp({
			host: 'website.com',
			user: 'johndoe',
			pass: '1234'
		}));
});
```


## API

### sftp(options)

#### options.host

*Required*  
Type: `String`

#### options.port

Type: `Number`  
Default: `22`

#### options.user

Type: `String`  
Default: `'anonymous'`

#### options.pass

Type: `String`  
Default: `null`

If this option is not set, gulp-sftp assumes the user is using private key authentication and will default to using keys at the following locations:

`~/.ssh/id_dsa` and `/.ssh/id_rsa`

If you intend to use anonymous login, use the value '@anonymous'.

#### options.remotePath

Type: `String`  
Default: `'/'`

The remote path to upload to. If this path does not yet exist, it will be created, as well as the child directories that house your files.

#### options.remotePlatform

Type: `String`
Default: `'unix'`

The remote platform that you are uploading to. If your destination server is a Windows machine, use the value `windows`.

#### options.key

type `String` or `Object`
Default: `null`

A key file location. If an object, please use the format `{location:'/path/to/file',passphrase:'secretphrase'}`


#### options.passphrase

type `String`
Default: `null`

A passphrase for secret key authentication. Leave blank if your key does not need a passphrase.

#### options.keyContents

type `String`
Default: `null`

If you wish to pass the key directly through gulp, you can do so by setting it to options.keyContents.

#### options.auth

type `String`
Default: `null`

An identifier to access authentication information from `.ftppass` see [Authentication](#authentication) for more information.

#### options.authFile

type `String`
Default: `.ftppass`

A path relative to the project root to a JSON formatted file containing auth information.

#### options.timeout
type `int`
Default: Currently set by ssh2 as `10000` milliseconds.

An integer in milliseconds specifying how long to wait for a server response.

#### options.agent
type `String`
Default: `null`

Path to ssh-agent's UNIX socket for ssh-agent-based user authentication.

#### options.agentForward
type `bool`
Default: `false`

Set to true to use OpenSSH agent forwarding. Requires that `options.agent` is configured.


##Authentication

For better security, save authentication data in a json formatted file named `.ftppass` (or to whatever value you set options.authFile to). **Be sure to add this file to .gitignore**. You do not typically want auth information stored in version control.

```js
var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('default', function () {
	return gulp.src('src/*')
		.pipe(sftp({
			host: 'website.com',
			auth: 'keyMain'
		}));
});
```

`.ftppass`

```json
{
  "keyMain": {
    "user": "username1",
    "pass": "password1"
  },
  "keyShort": "username1:password1",
  "privateKey": {
    "user": "username"
  },
  "privateKeyEncrypted": {
    "user": "username",
    "passphrase": "passphrase1"
  },
  "privateKeyCustom": {
    "user": "username",
    "passphrase": "passphrase1",
    "keyLocation": "/full/path/to/key"
  }
}
```

##Known Issues

###SFTP error or directory exists: Error: No such file /remote/sub/folder

Version 0.1.2 has an issue for Windows clients when it comes to resolving remote paths. Please upgrade to 0.1.3.

###Error:: SFTP abrupt closure

~~Some conditions can cause the [ssh2](https://github.com/mscdex/ssh2) connection to abruptly close. The issues that commonly cause this are large files (though they are checked for and are automatically converted to streams) and heavy memory usage.~~

~~To solve problems related to [ssh2](https://github.com/mscdex/ssh2) closures, try to use streams instead of buffers. Do this by passing `{buffer:false}` as an option with `gulp.src`. This isn't always an option, so I would suggest exploring ways to move between streams and buffers. Lars Kappert has a [great article on managing this](https://medium.com/web-code-junk/a2010c13d3d5).~~

Some awesome work via @mscdex addressed this issue. Please make sure you have the latest version or greater of gulp-sftp (0.1.1) and the latest version or greater of ssh2 (0.3.4) and you should not see abrupt disconnects with large files.

## License

[MIT](http://opensource.org/licenses/MIT)

