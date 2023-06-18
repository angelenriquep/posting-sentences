import axios from 'axios'
import 'dotenv/config'

const url = 'https://api-free.deepl.com/v2/translate'
const TARGET_LANG = 'en-GB'

const headers = {
  Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
  'Content-Type': 'application/x-www-form-urlencoded'
}

/**
 * Hits the deepl api to get the data. Defaulted to 10 secs timeout.
 *
 * @param {string} text - The text to be traslated
 * @returns <Promise<AxiosResponse> A fullfilled or rejected promise qiwht the data
 */
export const getTraslationForText = async (text) => {
  const data = new URLSearchParams()
  data.append('text', text)
  data.append('target_lang', TARGET_LANG)

  return axios.post(url, data.toString(), { headers, timeout: 10000 })
}
