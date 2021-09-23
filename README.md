climood
=======

Mood tracking cli app

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/climood.svg)](https://npmjs.org/package/climood)
[![Downloads/week](https://img.shields.io/npm/dw/climood.svg)](https://npmjs.org/package/climood)
[![License](https://img.shields.io/npm/l/climood.svg)](https://github.com/tn/\climood/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g climood
$ climood COMMAND
running command...
$ climood (-v|--version|version)
climood/0.0.1 darwin-x64 node-v15.14.0
$ climood --help [COMMAND]
USAGE
  $ climood COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`climood add`](#climood-add)
* [`climood help`](#climood-help-command)
* [`climood reset`](#climood-reset)
* [`climood stats`](#climood-stats)

## `climood add`

save mood of the day

```
USAGE
  $ climood add

OPTIONS
  --job=Main job|Side project|Open Source
  --mood=-2|-1|0|1|2
  --text="Lorem ipsum"
  --condition=Procrastinated|Motivated|Tired
```

_See code: [src/commands/add.ts](https://github.com/tn/climood/blob/v0.0.1/src/commands/add.ts)_

## `climood help [COMMAND]`

display help for climood

```
USAGE
  $ climood help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `climood reset`

delete database

```
USAGE
  $ climood reset

OPTIONS
  -h, --help       show CLI help
```

_See code: [src/commands/reset.ts](https://github.com/tn/climood/blob/v0.0.1/src/commands/reset.ts)_

## `climood stats`

display statistics

```
USAGE
  $ climood stats

OPTIONS
  -h, --help               show CLI help
  -p, --period=a|y|m|w     filter results by date period, default: w
  --plot=true|false        show results as plot
  -d, --detail=true|false  show detailed text
```

_See code: [src/commands/stats.ts](https://github.com/tn/climood/blob/v0.0.1/src/commands/stats.ts)_
<!-- commandsstop -->
