import fs from 'fs'
import readline from 'readline'
import { addBatchData, commitBatch, createBatch } from '@pkg/firestore'
import logger from '@pkg/logger'

const FILE_PATH = 'sentences.jsonl'
// In order to prevent exausting the quota for the free tier, we use a batch
// size of 100
// @info https://firebase.google.com/docs/functions/quotas
const BATCH_SIZE = 100

const pauseExecution = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

const fileStream = fs.createReadStream(FILE_PATH)
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

let lineCount = 0
let batchLineCount = 0

const loadBatchData = async () => {
  try {
    logger.info(`Loading the data from ${FILE_PATH}`)
    let batch = createBatch()

    for await (const line of rl) {
      lineCount++
      const record = JSON.parse(line)
      await addBatchData(batch, record)
      batchLineCount++

      if (batchLineCount === BATCH_SIZE) {
        await commitBatch(batch)
        batchLineCount = 0
        batch = await createBatch()

        logger.info('Pausing execution for 10 seconds...')
        await pauseExecution(10000)
      }
    }

    if (batchLineCount > 0) {
      await commitBatch(batch)
    }

    logger.info(`File reading completed. Total lines processed: ${lineCount}`)
  } catch (err) {
    logger.error(err.message)
  } finally {
    rl.close()
  }
}

loadBatchData()
