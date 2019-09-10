const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const ScoreKeeperSchema = new mongoose.Schema({
    playerA: {
        name: {
            type: String,
            required: true,
        },
        scores: {
            type: Array,
        },
    },
    playerB: {
        name: {
            type: String,
            required: true,
        },
        scores: {
            type: Array,
        },
    },
    playerC: {
        name: {
            type: String,
            required: true,
        },
        scores: {
            type: Array,
        },
    },
    playerD: {
        name: {
            type: String,
            required: true,
        },
        scores: {
            type: Array,
        },
    },
});

const ScoreKeeperModel = mongoose.model('Score-keeper', ScoreKeeperSchema);
module.exports = ScoreKeeperModel;