import axios from 'axios';

const IAM_TOKEN = "t1.7euelSbPyceKx87JqpuRl1qZiY-Ryi3rnpWaksrKaZqUppnLncmDnpeajZvl8_dZNAFl-e8ENXMH_t3z9xljfmT57wQ1cwf-.-LErty1vRh4S__VEp-aDnM5huB5MEfm_Iu1u2IzNgyrn0emiWDYA6rSQXDvzjE0O3HBbUlqoDeCmXYYInzZ6Cg";
const folder_id = "YYYYY";
const target_language = "en";

// Hide implementation?
export async function getTranslation(text) {
  const texts = ["Hello"];

  const json = {
    targetLanguageCode: target_language,
    texts: texts,
    folderId: folder_id,
  };

  return response = await axios.post({
    url: 'https://translate.api.cloud.yandex.net/translate/v1/translate',
    data: JSON.stringify(json),
    config: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${IAM_TOKEN}`
      }
    }
  });
}