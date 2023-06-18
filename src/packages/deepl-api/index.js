import axios from 'axios'

const url = 'https://api-free.deepl.com/v2/translate'
const authKey = 'b3a7e4ea-53bf-1e55-d634-b02c8526b380:fx'
const TARGET_LANG = 'en-GB'

const headers = {
  Authorization: `DeepL-Auth-Key ${authKey}`,
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
