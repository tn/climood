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
climood/0.0.2 darwin-x64 node-v16.9.1
$ climood --help [COMMAND]
USAGE
  $ climood COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`climood add`](#climood-add)
* [`climood help [COMMAND]`](#climood-help-command)
* [`climood reset`](#climood-reset)
* [`climood stats`](#climood-stats)

## `climood add`

Save mood of the day

```
USAGE
  $ climood add

OPTIONS
  --condition=Procrastinated|Motivated|Tired
  --[no-]describe
  --job=Main job|Side project|Other
  --mood=2|1|0|-1|-2
  --text=text
```

_See code: [src/commands/add.ts](https://github.com/tn/climood/blob/v0.0.2/src/commands/add.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `climood reset`

Reset database

```
USAGE
  $ climood reset
```

_See code: [src/commands/reset.ts](https://github.com/tn/climood/blob/v0.0.2/src/commands/reset.ts)_

## `climood stats`

Shows your moods stat

```
USAGE
  $ climood stats

OPTIONS
  -d, --detail          Render text of mood in list

  -p, --period=w|m|y|a  [default: w] You can filter records by passing date period; w - 1 week or last 7 days, m - 1
                        month or last 30 days, y - 1 year or last 365 days, a - for all time

  --plot                Render stats with plot chart
```

_See code: [src/commands/stats.ts](https://github.com/tn/climood/blob/v0.0.2/src/commands/stats.ts)_
<!-- commandsstop -->
