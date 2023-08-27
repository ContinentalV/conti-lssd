
const mongoose = require("mongoose");
const dayjs = require('dayjs')


const defaultEmbed = async  (embedArray, client,  member=null) => {
console.log(embedArray)
    if(embedArray.length > 1){
        embedArray.forEach((embed) => {
          embed.addFields({name: 'test adding fn ', value: "true or false mtfck"})

            embed.setThumbnail(client.user.displayAvatarURL())


        })


    }

return embedArray
}

const convertMinutesInHours = minutes => {

    if(minutes >= 1440){
        let days = Math.floor(minutes/1440)
        let remainMinutes = minutes % 1440;
        let hours = Math.floor(remainMinutes /60 )
        let minute = remainMinutes % 60
        return {days, hours, minute  }

   }else  if(minutes >= 60 && minutes < 1440) {
        let hours = Math.floor(minutes/60)
        let minute = minutes % 60;
        return {hours: hours, minute: minute}
    }
    else return {minute: minutes}
}




const showHistoryPds =( objects, format )=> {
    let histoArray = []

    for (const object of objects){
        let pds = dayjs(object.pds).format(format)
        let fds = dayjs(object.fds).format(format)
        let workingByShift = convertMinutesInHours(object.workingTime)
        let working = `${workingByShift.hours ? `${workingByShift.hours} Heures ${workingByShift.minute} minutes` : `${workingByShift.minute} minutes` }`
        histoArray.push({pds,fds, working})
    }

    return histoArray
}


const TimeStampToMinute = (millis) => {
    const minutes = Math.round(millis / 60000);
    return minutes

}










    module.exports = {
    fillEmbed: defaultEmbed,
        minToHeure: convertMinutesInHours,
        showHistoryPds,

        tsToMin: TimeStampToMinute,


    }

