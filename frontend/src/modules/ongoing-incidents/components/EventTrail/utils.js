import moment from 'moment';

export function getDateDiff(event){
    const hours = moment(new Date().getTime()).diff(event.createdDate, "hours");

    if(hours < 24){
        if(hours === 0){
            return "a moment ago";
        }
        return `${hours} hours ago`;
    }else if(hours < 720){
        const days = moment(new Date().getTime()).diff(event.createdDate, "days");
        return `${days} days ago`;
    }else if(hours < 8640){
        const months = moment(new Date().getTime()).diff(event.createdDate, "months");
        return `${months} months ago`; 
    }else{
        const years = moment(new Date().getTime()).diff(event.createdDate, "years")
        return `${years} years ago`;
    }
}

export function  calculateDeadline(incident){
    console.log(incident)
    //
    return "2 hours remaining"
}