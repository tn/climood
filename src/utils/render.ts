import * as boxen from 'boxen'
import * as chart from 'asciichart'
import { blueBright, ChalkFunction, gray, greenBright, magentaBright, redBright, whiteBright, yellowBright } from 'chalk'
import { Jobs } from '../consts/jobs'
import { Moods } from '../consts/moods'
import { emojify as emoji } from 'node-emoji'
import { Conditions } from '../consts/conditions'

export interface Data {
  date: Date;
  mood: number;
  condition: keyof typeof Conditions;
  job: keyof typeof Jobs;
  text?: string;
}

interface RenderParams {
  name: string;
  data: Data[];
  version: string;
}

interface RenderParamsList extends RenderParams {
  detail: boolean;
}

const IntlOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  year: 'numeric',
  month: 'short',
  minute: '2-digit',
  hour: '2-digit',
}

const moodColors: { [k: string]: ChalkFunction } = {
  0: whiteBright,
  1: blueBright,
  2: greenBright,
  '-1': yellowBright,
  '-2': redBright,
}

const boxenConfig: boxen.Options = {
  padding: 2,
  borderColor: 'magenta',
  borderStyle: 'round',
  dimBorder: true,
}

export const renderList = (params: RenderParamsList) => {
  if (!params.data?.length) {
    return
  }

  const heading = `\n${magentaBright(`${params.name} v${params.version}`)}\n\n`

  return boxen(heading + params.data.reduce((acc, curr) => {
    const date = (new Intl.DateTimeFormat('en', IntlOptions).format(new Date(curr.date)))?.padEnd(22)
    const name = moodColors[curr.mood](Moods.find(m => m.value === Number(curr.mood))?.name?.padEnd(8))
    const condition = Conditions[curr.condition]?.padEnd(14)
    const job = Jobs[curr.job]
    const detail = params.detail && curr.text ? `${curr.text}\n` : ''
    const hasText = curr.text ? emoji(':notebook:') : ''
    const result = acc + `${gray(date)} ${name} ${condition} ${job?.padEnd(12)} ${hasText} \n${detail}`

    return result
  }, ''), boxenConfig)
}

export const renderPlot = (params: RenderParams) => {
  const heading = magentaBright(`${params.name} v${params.version}\n\n`)
  const plot = chart.plot(params.data.map(d => d.mood), {
    format: x => {
      return (Moods.find(m => m.value === Number(x))?.name || '').padEnd(8)
    },
  })

  return boxen(heading + plot, boxenConfig)
}
