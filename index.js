const model = {
    cats: [
        {
            url: 'images/299.jpg',
            name: 'Tim',
            id: 1,
            counter: 0
        },
        {
            url: 'images/300.jpg',
            name: 'Puff',
            id: 2,
            counter: 0
        },
        {
            url: 'images/301.jpg',
            name: 'Buff',
            id: 3,
            counter: 0
        },
        {
            url: 'images/302.jpg',
            name: 'Smith',
            id: 4,
            counter: 0
        },
        {
            url: 'images/303.jpg',
            name: 'Tom',
            id: 5,
            counter: 0
        },
    ],

    currentCat: null
};

const octopus = {
    init() {
        view.init();
        this.setCat(1);
    },

    getCats() {
        return model.cats;
    },

    getCurrentCat() {
        return model.currentCat
    },

    setCat(id) {
        model.currentCat = model.cats.filter(cat => cat.id === id)[0];
        view.renderCurrentCat(model.currentCat);
        this.actualizeAdmin();
    },

    clickHandler(cat) {
        view.renderCounter(++cat.counter);
        this.actualizeAdmin();
    },

    toggleAdmin() {
        view.$adminForm.toggle();

    },

    actualizeAdmin() {
        view.$adminForm.find('input[name="name"]').val(model.currentCat.name);
        view.$adminForm.find('input[name="url"]').val(model.currentCat.url);
        view.$adminForm.find('input[name="counter"]').val(model.currentCat.counter);
    },

    save() {
        view.$adminForm.serializeArray().forEach(item => {
            model.currentCat[item.name] = item.value;
        });
        view.renderCatsList();
        view.renderCurrentCat(model.currentCat);
    }
};

const view = {
    init() {
        this.$catsList = $('#cats-list');
        this.$currentCat = $('#current-cat');
        this.$adminButton = $('#admin-button');
        this.$adminForm = $('#admin-form');

        this.renderCatsList();
        this.$currentCat.on('click', () => {
            octopus.clickHandler(octopus.getCurrentCat());
        });
        this.$adminButton.on('click', octopus.toggleAdmin);
    },

    renderCatsList() {
        this.$catsList.empty();
        octopus.getCats().forEach(cat => {
            const node = $('<li class="item" onclick="octopus.setCat(' + cat.id + ')">' + cat.name + '</li>');
            this.$catsList.append(node);
        });
    },

    renderCounter(value) {
        $('#counter').text('Clicks: ' + value);
    },

    renderCurrentCat(cat) {
        const htmlStr = $('<figure>' +
            '<img src="' + cat.url + '" />' +
            '<figcaption>' + cat.name +
                '<span id="counter" class="counter">Clicks: ' + cat.counter + '</span>' +
            '</figcaption>' +
        '</figure>');
        
        this.$currentCat.html(htmlStr);
    }
};

octopus.init();