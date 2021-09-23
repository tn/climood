import { Command, flags } from '@oclif/command'
import { magentaBright } from 'chalk'
import { get as emoji } from 'node-emoji'
import * as inquirer from 'inquirer'
import { Jobs } from '../consts/jobs'
import { Moods } from '../consts/moods'
import { Conditions } from '../consts/conditions'
import { read, write } from '../utils/fs'
import { join } from 'path'

export default class Add extends Command {
  static description = 'Save mood of the day'

  static flags = {
    mood: flags.integer({ options: Moods.map(m => String(m.value)) }),
    condition: flags.string({ options: Object.values(Conditions) }),
    job: flags.string({ options: Object.values(Jobs) }),
    describe: flags.boolean({ default: false, allowNo: true }),
    text: flags.string({ required: false, default: '' }),
  }

  async run() {
    const { flags } = this.parse(Add)
    let { mood, condition, job, text } = flags
    const { dataDir, pjson: { name } } = this.config
    const dataPath = join(dataDir, `database.${name}`)

    if (!mood) {
      const responses: any = await inquirer.prompt([{
        name: 'mood',
        message: 'My mood is...',
        type: 'list',
        choices: Moods,
      },
      {
        name: 'condition',
        message: 'My condition is...',
        type: 'list',
        choices: Object.entries(Conditions).map(([k, v]) => ({name: v, value: k})),
      },
      {
        name: 'job',
        message: 'I\'m working on...',
        type: 'list',
        choices: Object.entries(Jobs).map(([k, v]) => ({name: v, value: k})),
      },
      {
        name: 'describe',
        message: 'I want to add text...',
        type: 'confirm',
      },
      {
        name: 'text',
        message: 'My text...',
        type: 'editor',
        when: a => {
          return a.describe
        },
      }])
      mood = responses.mood
      condition = responses.condition
      job = responses.job
      text = responses.text
    }

    let file
    let data = []

    try {
      file = await read(dataPath)
      data = JSON.parse(file as unknown as string)
    } catch {}

    const result = {
      date: new Date(),
      mood,
      condition,
      job,
      text,
    }

    data = [...data, result]

    try {
      await write(dataPath, JSON.stringify(data))
    } catch (error) {
      this.error(error as string)
    }

    this.log(`${emoji('tada')} ${magentaBright('Mood saved')} ${emoji('tada')}`)
  }
}
