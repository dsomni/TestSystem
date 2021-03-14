const mongoose = require('mongoose');
const config = require('../../config/configs');

var connectionString;
if (config.mongodbConfigs.User.Username != "" && config.mongodbConfigs.User.Password != "") {
    connectionString = "mongodb://" + config.mongodbConfigs.User.Username + ":" + config.mongodbConfigs.User.Password + "@" + config.mongodbConfigs.Host + "/" + config.mongodbConfigs.dbName
} else {
    connectionString = "mongodb://" + config.mongodbConfigs.Host + "/" + config.mongodbConfigs.dbName
};

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Tournament = require('../../config/models/Tournament');

var deletedTask = process.argv[3];
var TourId = process.argv[2];

let tournament = await Tournament.find({ identificator: TourId });

tournament.tasks.pop(deletedTask);

for (let i = 0; i < tournament.tasks.length; i++){
    if (tournament.tasks[i] > deletedTask) tournament.tasks[i].identificator -= 1;
};