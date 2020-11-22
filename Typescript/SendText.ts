import SendSMS from 'react-native-sms-x';


export module SendTextHelper{

    var TextInputValue = "";
    var TextInputNumber = "";
    //wordt opgeroepen wanneer het bericht versuurd moet worden
    export function sendSMSFunction() {
        console.log(getSmsNumber());
        //vraag de huidige waardes op van het telefoonnummer en het bericht
        SendSMS.send(123, getSmsNumber(), getSmsValue(), (msg: any)=>{
            console.log(msg)
        });
    }

    export function sendSMSFunctionWith(SmsNumber : String, SmsValue = String) {
        console.log(getSmsNumber());
        //vraag de huidige waardes op van het telefoonnummer en het bericht
        SendSMS.send(123, SmsNumber, SmsValue, (msg: any)=>{
            console.log(msg)
        });
    }

    //Elke keer als er een nieuw character in de textinput van het Phone number wordt geplaatst, update deze waarde. 
    export function updateSmsNumber(value: string){
        TextInputNumber = value;
    }

    //Elke keer als er een nieuw character in de textinput van de Message wordt geplaatst, update deze waarde. 
    export function updateSmsValue(value: string){
        TextInputValue = value;
    }

    export function getSmsValue(){
        return TextInputValue
    }
    export function getSmsNumber(){
        return TextInputNumber
    }
}
