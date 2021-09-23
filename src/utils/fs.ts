import { promises as fs } from 'fs'

export const read = async (path: string) => fs.readFile(path)

export const write = async (path: string, data: string) => fs.writeFile(path, data)

export const rm = async (path: string) => fs.rmdir(path)
