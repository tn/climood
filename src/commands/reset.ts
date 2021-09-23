import { Listr } from 'listr2'
import { join } from 'path'
import { get as emoji } from 'node-emoji'
import { Command } from '@oclif/command'
import { rm } from '../utils/fs'
import { magentaBright } from 'chalk'

export default class Reset extends Command {
  static description = 'Reset database'

  async run() {
    const { dataDir, pjson: { name } } = this.config
    const dataPath = join(dataDir, `database.${name}`)

    const tasks = new Listr([
      {
        title: 'Deleting files',
        task: (ctx, task): Listr => task.newListr([{
          title: 'Deleting data',
          task: async (): Promise<void> => {
            try {
              await rm(dataPath)
            } catch {}
          },
        }]),
      },
    ], {concurrent: false})

    try {
      await tasks.run()

      this.log(`${emoji('tada')} ${magentaBright('Data cleared')} ${emoji('tada')}`)
    } catch (error) {
      this.error(error as string)
    }
  }
}
