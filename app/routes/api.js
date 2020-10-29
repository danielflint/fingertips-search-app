var express = require('express');
var router = express.Router();
var _ = require('lodash');
const {
    Client
} = require('@elastic/elasticsearch');
var QueryBuilder = require('../helpers/query-builder');

const MAX_RESULTS_COUNT = 100;
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL

router.get('/search/:index/:searchText', async function (req, res, next) {

    const client = new Client({
        node: ELASTICSEARCH_URL
    });

    const index = req.params.index;
    const searchText = req.params.searchText;
    const queryConfig = new QueryBuilder().getQuery(searchText);

    //console.log(queryConfig);

    var query = {
        query_string: {
            query: queryConfig.queryString,
            default_operator: queryConfig.operator,
            default_field: 'keywords',
            analyze_wildcard: true
        }
    };

    var searchBody = {
        '_source': ['id', 'name'],
        from: 0,
        size: MAX_RESULTS_COUNT,
        query: query
    };

    try {
        const {
            body
        } = await client.search({
            index: index,
            body: searchBody
        });

        var results = _.map(body.hits.hits, hit => {
            return hit._source;
        });

        res.send(results);

    } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        next(err);
    }
});

module.exports = router;