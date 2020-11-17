import BackgroundTimer from 'react-native-background-timer';

export module DifTimer {
    export function calculate_diff(selected_date: Date){
        var today = new Date();
      
        var Difference_In_Time = selected_date.getTime() - today.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        return Difference_In_Days * 86400
      }
      
      export function set_timer_for_n_seconds(n : number){
      
        if(n>0){
          const intervalId = BackgroundTimer.setInterval(() => {
            // Niet exact op uurwissel, maar als je start om 14 seconde na, eindigd het ook om 14 sec na
            console.log('tic');
            BackgroundTimer.clearInterval(intervalId);
          }, n*1000);
        }
      }  
}
