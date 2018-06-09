import { resolve } from 'path'
import { readFileSync } from 'fs'
import { getInterval } from './configHelper'

const {
  MERGERINE_CONFIG = 'mergerine.json',
  MERGERINE_INTERVAL,
  MERGERINE_DELETE_BRANCH_AFTER_MERGE,
  MERGERINE_DRY,
  MERGERINE_GITHUB_TOKEN,
  GITHUB_TOKEN
} = process.env

let config = JSON.parse(
  readFileSync(resolve(process.cwd(), MERGERINE_CONFIG), 'utf8')
)

config.repos = config.repos || []
config.repos = config.repos.map(repo => ({
  ...repo,
  baseUrl: repo.baseUrl || 'https://api.github.com'
}))

const token = MERGERINE_GITHUB_TOKEN || GITHUB_TOKEN || config.token

const rawInterval = parseInt(MERGERINE_INTERVAL) || config.interval || 120000 // 2 minutes
const interval = getInterval(rawInterval)

const deleteBranchAfterMerge =
  MERGERINE_DELETE_BRANCH_AFTER_MERGE === 'true' ||
  config.deleteBranchAfterMerge

const dry = MERGERINE_DRY === 'true' || config.dry

export { config, token, interval, deleteBranchAfterMerge, dry }
