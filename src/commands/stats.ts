import { Listr } from 'listr2'
import { startOfWeek, startOfMonth, startOfYear } from 'date-fns'
import { Command, flags } from '@oclif/command'
import { read } from '../utils/fs'
import { join } from 'path'
import { Data, renderList, renderPlot } from '../utils/render'
import { magentaBright } from 'chalk'

interface TasksContext {
  data: any;
  output: any;
}

interface DateFilters {
  [key: string]: typeof startOfWeek | typeof startOfMonth | typeof startOfYear;
}

const dateFilters: DateFilters = {
  w: startOfWeek,
  m: startOfMonth,
  y: startOfYear,
}

export default class Stats extends Command {
  static description = 'Shows your moods stat'

  static flags = {
    period: flags.string({
      description: 'You can filter records by passing date period; w - current week, m - current month, y - current year, a - for all time',
      options: ['w', 'm', 'y', 'a'],
      default: 'w',
      required: false,
      char: 'p',
    }),
    plot: flags.boolean({ default: false, description: 'Render stats with plot chart' }),
    detail: flags.boolean({ default: false, description: 'Render text of mood in list', char: 'd' }),
  }

  async run() {
    const { flags } = this.parse(Stats)
    const { period, plot, detail } = flags
    const { dataDir, pjson: { name, version }} = this.config
    const dataPath = join(dataDir, `database.${name}`)
    const filterStartDate = dateFilters[period]

    const tasks = new Listr<TasksContext>([
      {
        title: 'Preparing data',
        task: (ctx, task): Listr => task.newListr([{
          title: 'Reading',
          task: async (): Promise<void> => {
            try {
              const data = JSON.parse((await read(dataPath)).toString()) as Data[]
              const now = new Date()

              ctx.data = (period === 'a' ? data : data.filter(item => new Date(item.date) > filterStartDate(now))).reverse()
            } catch {}
          },
        }]),
      },
      {
        title: 'Output',
        task: (ctx, task): Listr => task.newListr([{
          title: 'Drawing',
          task: () => {
            if (!ctx.data?.length) {
              ctx.output = `\nNo data found. Create record: ${magentaBright(`${name} add`)}`
              return
            }

            if (plot) {
              ctx.output = renderPlot({
                name,
                version,
                data: ctx.data,
              })
            } else {
              ctx.output = renderList({
                name,
                version,
                data: ctx.data,
                detail,
              })
            }
          },
        }]),
      },
    ], { concurrent: false })

    try {
      const ctx = await tasks.run({ data: null, output: null })
      this.log(ctx.output)
    } catch (error) {
      this.error(error as string)
    }
  }
}
