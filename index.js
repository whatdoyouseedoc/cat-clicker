const model = {
    cats: [
        {
            url: 'images/299.jpg',
            name: 'Cat 1',
            id: 1,
            counter: 0
        },
        {
            url: 'images/300.jpg',
            name: 'Cat 2',
            id: 2,
            counter: 0
        },
        {
            url: 'images/301.jpg',
            name: 'Cat 3',
            id: 3,
            counter: 0
        },
        {
            url: 'images/302.jpg',
            name: 'Cat 4',
            id: 4,
            counter: 0
        },
        {
            url: 'images/303.jpg',
            name: 'Cat 5',
            id: 5,
            counter: 0
        },
    ],

    currentCat: null
};

const octopus = {
    getCats() {
        return model.cats;
    },

    getCurrentCat() {
        return model.currentCat
    },

    setCat(id) {
        model.currentCat = model.cats.filter(cat => cat.id === id)[0];
        view.renderCurrentCat(model.currentCat);
    },

    clickHandler(cat) {
        view.renderCounter(++cat.counter);
    }
};

const view = {
    init() {
        this.$catsList = $('#cats-list');
        this.$currentCat = $('#current-cat');

        this.renderCatsList();
        this.$currentCat.on('click', () => {
            octopus.clickHandler(octopus.getCurrentCat());
        });
    },

    renderCatsList() {
        octopus.getCats().forEach(cat => {
            const node = $('<li class="item" onclick="octopus.setCat(' + cat.id + ')">' + cat.name + '</li>');
            this.$catsList.append(node);
        });
    },

    renderCounter(value) {
        $('#counter').text('Counter: ' + value);
    },

    renderCurrentCat(cat) {
        const htmlStr = $('<figure>' +
            '<img src="' + cat.url + '" />' +
            '<figcaption>' + cat.name +
                '<span id="counter" class="counter">Counter: ' + cat.counter + '</span>' +
            '</figcaption>' +
        '</figure>');
        
        this.$currentCat.html(htmlStr);
    }
};

view.init();