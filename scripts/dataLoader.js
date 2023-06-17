import fs from 'fs'
import readline from 'readline'
import { addBatchData, writeBatchData } from '@pkg/firestore'

const filePath = 'sentences.jsonl'

const fileStream = fs.createReadStream(filePath)

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

// Event handler for each line read from the file
rl.on('line', (line) => {
  try {
    const record = JSON.parse(line)

    addBatchData(record)
  } catch (error) {
    console.error('Error parsing record:', error)
  }
})

// Event handler for when all lines have been read
rl.on('close', async () => {
  try {
    await writeBatchData()
  } catch (err) {
    console.log(err)
  }
  console.log('File reading completed.')
})
