const getUrl = ((req, res) => {
    console.log('getUrl');
});

const createUrl = ((req, res) => {
    console.log('createUrl');
});

const updateUrl = ((req, res) => {
    console.log('updateUrl');
});

const deleteUrl = ((req, res) => {
    console.log('deleteUrl');
});

const shortenUrl = ((req, res) => {
    console.log('shortenUrl');
});

module.exports = {
    getUrl,
    createUrl,
    updateUrl,
    deleteUrl,
    shortenUrl
};
