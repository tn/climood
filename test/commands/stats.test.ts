import { expect, test } from '@oclif/test'
import * as promises from '../../src/utils/fs'
import { createSandbox, SinonSandbox } from 'sinon'

const fixture = {
  mood: 2,
  date: new Date(),
  condition: 'Motivated',
  job: 'Other',
  text: 'bla',
}

describe('stats', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
    sandbox.stub(promises, 'read').value(() => Buffer.from(JSON.stringify([fixture])))
  })

  afterEach(() => {
    sandbox.restore()
  })

  test
  .stdout()
  .command(['stats'])
  .it('runs stats', ctx => {
    expect(ctx.stdout).to.contain('Awesome')
  })

  test
  .stdout()
  .command(['stats', '--detail'])
  .it('runs stats with detailed text', ctx => {
    expect(ctx.stdout).to.contain('bla')
  })
})
