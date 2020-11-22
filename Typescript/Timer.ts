import BackgroundTimer from 'react-native-background-timer';

export module DifTimer {
    export function calculate_diff(selected_date: Date){
        var today = new Date();
        var Seconds_In_Minute  = today.getSeconds();
        var Difference_In_Time = selected_date.getTime() - today.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        return ( Difference_In_Days * 86400 ) - Seconds_In_Minute
      }
      


      /*
        Na n seconden, voer de functie callback uit. Zelfs wanneer de app in de achtergrond staat.
      */
      export function set_timer_for_n_seconds(n : number, callback: Function){
      
        if(n>0){
          const intervalId = BackgroundTimer.setInterval(() => {
            BackgroundTimer.clearInterval(intervalId);
            callback();

          }, n*1000);
        }
        else{
          console.log('err');
        }
      }  
}
