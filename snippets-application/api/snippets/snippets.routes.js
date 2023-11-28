// MAIN ROUTER FUNCTION
const router = require('express').Router();
const controller = require('./snippet.controller')


router.get('/', controller.getSnippets);
router.get('/:id', controller.getSnippetById);
router.post('/', controller.createSnippet);
router.delete('/:id', controller.deleteSnippet);


module.exports = router;