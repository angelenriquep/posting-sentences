import fs from 'fs'
import readline from 'readline'

const wordCount = {}

const countWords = (sentence) => {
  const words = sentence.split(/\W+/).filter(Boolean)
  const wordCount = {}

  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1
  }

  return wordCount
}

const fileStream = fs.createReadStream('sentences.jsonl')
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

rl.on('line', (line) => {
  const { text } = JSON.parse(line)
  const sentenceWordCount = countWords(text)

  for (const word in sentenceWordCount) {
    wordCount[word] =
      (wordCount[word] || 0) + sentenceWordCount[word]
  }
})

rl.on('close', () => {
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
  const top100Words = sortedWords.slice(0, 100)

  for (const [word, count] of top100Words) {
    console.log(`${word}: ${count}`)
  }
})
