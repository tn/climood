import { expect, test } from '@oclif/test'
import * as promises from '../../src/utils/fs'
import { createSandbox, SinonSandbox } from 'sinon'

describe('add', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
    sandbox.stub(promises, 'write').value(() => true)
  })

  afterEach(() => {
    sandbox.restore()
  })

  test
  .stdout()
  .command(['add', '--condition=Motivated', '--job=Other', '--mood=2', '--text=bla'])
  .it('runs add', ctx => {
    expect(ctx.stdout).to.contain('🎉 Mood saved 🎉\n')
  })
})
