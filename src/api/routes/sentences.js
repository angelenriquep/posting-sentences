import { Router } from 'express';
import { getSentences, addSentence, getSentence, deleteSentence, updateSentence } from '../services/sentenceService.js';
import { sentenceValidationRulesAddSentence, addSentenceValidation, sentenceValidationRulesGetSentence } from '../middleware/validateSentenceRequest.js';
import { checkBase64Cookie } from '../middleware/isAuth.js'

const sentencesRoutes = Router();

const sentences = (router) => {
    router.use('/sentences', sentencesRoutes);

    sentencesRoutes.get('/', checkBase64Cookie, sentenceValidationRulesGetSentence(), addSentenceValidation, getSentences);
    sentencesRoutes.post('/', sentenceValidationRulesAddSentence(), addSentenceValidation, addSentence);
    sentencesRoutes.get('/:id', getSentence);
    sentencesRoutes.delete('/:id', deleteSentence);
    sentencesRoutes.patch('/:id', updateSentence);
};

export default sentences;
