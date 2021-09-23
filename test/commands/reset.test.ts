import { expect, test } from '@oclif/test'
import * as promises from '../../src/utils/fs'
import { SinonSandbox, createSandbox } from 'sinon'

describe('reset', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
    sandbox.stub(promises, 'rm').value(() => true)
  })

  afterEach(() => {
    sandbox.restore()
  })

  test
  .stdout()
  .command(['reset'])
  .it('runs reset', ctx => {
    expect(ctx.stdout).to.contain('🎉 Data cleared 🎉\n')
  })
})
