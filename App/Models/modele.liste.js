const mongoose = require('mongoose');


const ProfileSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    idClient:{ type: Number, required: true },
    idService:{ type: Number, required: true },
    afficheList: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('liste',ProfileSchema);