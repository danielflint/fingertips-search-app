var app = new Vue({
    el: '#app',
    data: {
        message: 'Ready to search',
        searchText: '',
        indicators: []
    },
    methods: {
        doSearch: function () {
            this.message = '';
            this.indicators = [];

            var index = 'indicators-staging';
            axios.get(`/api/search/${index}/${this.searchText}`).then(response => {
                this.indicators = response.data;
            }, error => {
                console.log(error);
            });
        }
    }
})