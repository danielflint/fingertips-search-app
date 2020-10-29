'use strict'
var _ = require('lodash');
var natural = require('natural');

module.exports = class QueryBuilder {

    constructor() {
        this.stopwords = [
            'and',
            'in', // children in care
            'to',
            'due', // injuries due to falls
            'health' // oral health / mental health
        ];

        this.doNotChangeWords = [
            'childhood',
            'families', // famili
            'decay', // deca
        ];
    }

    getQuery(userText) {

        // Init query text
        var queryText = userText
            .trim()
            .toLowerCase()
            .replace(/\s+/g, ' '); // collapse spaces

        var terms = queryText.split(' ');

        var operator = 'and';
        terms = _.map(terms, term => {

            // Words to skip
            if (term === 'or') {
                // Skip or
                operator = 'or';
                return '';
            } else if (_.includes(this.stopwords, term)) {
                // Skip stop words
                return '';
            }

            // Words to use
            if (_.includes(this.doNotChangeWords, term)) {
                // Use as entered
            } else if (term.length < 5) {
                // Only singulise short words

                // Inflect - children -> child
                var inflector = new natural.NounInflector();
                term = inflector.singularize(term);
            } else {
                // Stem longer words
                term = natural.PorterStemmer.stem(term);

                if (term.length > 4) {

                    var lastChar = term[term.length - 1];

                    /* Trim last i
                    circulatory => circulatori, decayed => decai, delayed => delai
                    ambulatory -> ambulatori, unemployed -> unemploi, poverty => poverti
                    anxiety => anxieti */
                    if (lastChar === 'i') {
                        term = term.substring(0, term.length - 1);
                    }
                }
            }

            // Add wildcard
            return term.length > 2 ? term + "*" : term;
        });

        var queryString = terms.join(' ').replace(/\s+/g, ' '); // collapse spaces;
        return {
            queryString: queryString,
            operator: operator
        };
    }

}