const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const ScoreKeeperSchema = new mongoose.Schema({
    player1: {
        name: {
            type: String,
        },
        score: {
            rounds: {
                type: Array,
            },
            totalScore: {
                type: Number,
            },
        },
    },
    player2: {
        name: {
            type: String,
        },
        score: {
            rounds: {
                type: Array,
            },
            totalScore: {
                type: Number,
            },
        },
    },
    player3: {
        name: {
            type: String,
        },
        score: {
            rounds: {
                type: Array,
            },
            totalScore: {
                type: Number,
            },
        },
    },
    player4: {
        name: {
            type: String,
        },
        score: {
            rounds: {
                type: Array,
            },
            totalScore: {
                type: Number,
            },
        },
    },
});

const ScoreKeeperModel = mongoose.model('Score-keeper', ScoreKeeperSchema);
module.exports = ScoreKeeperModel;