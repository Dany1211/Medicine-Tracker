import moment from "moment";

export const formatDate = (timestamp) => {
  return new Date(timestamp).setHours(0,0,0,0)
};

export const formatDateForText = (date) => {
  return moment.locale(), moment(date).format("ll");
};


export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString =  date.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
  return timeString;
};

export const getDatesRange = (startDate,endDate)=>{
     const start=moment(new Date(startDate),'DD/MM/YYYY');
     const end=moment(new Date(endDate),'DD/MM/YYYY');
     const dates=[];

     while(start.isSameOrBefore(end)){
      dates.push(start.format('DD/MM/YYYY' ));
      start.add(1,'days')
     }

     return dates;
}

export const getDateRangeTODisplay = () => {
  const dateList = []
  for(let i=0 ;i<=7; i++){
    dateList.push({
      date:moment().add(i,'day').format('DD'),
      day:moment().add(i,'day').format('dd'),
      formatedDate:moment().add(i,'day').format('DD/MM/YYYY'),
    })
  }
  return dateList;
}
