const mongoose = require('mongoose')


const lssdSchema = mongoose.Schema({
    id: {type: String, required: true},
    discordName: {type: String, required: true},
    nom: {type: String, required: false},
    prenom: {type: String, required: false},
    avatar: String,
    grade: {type: String, required:true },
    matricule: {type:Number, required: true, default: 0},
    service: {pds: {type: Number, default: 0}, fds: {type:Number, default: 0}, workingTime: {type: Number, default:0}},
    isService: {type:Boolean, default: false},
    isCity: {type:Boolean, default: false},
    historique: Array,
    resetTime: Number,
    profileCompleted: {type:Boolean, default: false, required:true}

})



lssdSchema.methods.updateWorkingTime = function() {
    if (this.service.pds === 0 || this.service.fds === 0) {
        throw new Error("La date de PDS ou de FDS n'est pas encore enregistrée");
    }
    const TimeStampToMinute = (millis) => {
        const minutes = Math.round(millis / 60000);
        return minutes

    }
    const pdsMinutes = TimeStampToMinute(this.service.pds)  ; // Conversion en minutes
    const fdsMinutes = TimeStampToMinute(this.service.fds) ; // Conversion en minutes
    const workingTime = fdsMinutes - pdsMinutes + this.service.workingTime;

    this.service.workingTime = workingTime;
    this.historique.push({pds: this.service.pds,   fds: this.service.fds, workingTime: fdsMinutes - pdsMinutes})
    this.service.pds = 0;
    this.service.fds = 0;

    return this.save();
};

lssdSchema.methods.resetTimeFn = function() {

    this.service.workingTime = 0
    this.isService = false
    this.service.pds = 0;
    this.service.fds = 0;
    this.resetTime  = Date.now()
    return this.save()

}

lssdSchema.methods.addTime = function(value){
    this.service.workingTime += value
    return this.save()
}

lssdSchema.methods.removeTime  = function(value){
    this.service.workingTime -= value
    return this.save()
}




module.exports = mongoose.model('lssd',lssdSchema)
