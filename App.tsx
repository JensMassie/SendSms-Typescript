/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  PermissionsAndroid,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
    TextInput,
    Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker
import BackgroundTimer from 'react-native-background-timer';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {styles} from './Typescript/style'
import {pickerSelectStyles} from './Typescript/style'
import {DifTimer} from "./Typescript/Timer" 
import {SendTextHelper} from "./Typescript/SendText"


declare const global: {HermesInternal: null | {}};




const items = [
  { label: 'Timed SMS', value: 'Tsms', inputLabel: 'Timed SMS', color: 'black'},
  { label: 'Location based SMS', value: 'Lsms', color: 'black' },
  { label: 'Auto-respond', value: 'Asms', color: 'black' },
  { label: 'Regular SMS', value: 'Rsms', color: 'black' }
]
const App = () => {


  
  //Deze code zorgt er voor dat bij het selecteren van Timed SMS in de dropdown van Rule, de state
  //van de components veranderd. Hierdoor worden regel-specifieke input fields getoont zichtbaar.
  const [showResults, setShowResults] = React.useState("")
  const setVal = (val : string) => setShowResults(val)
  // const setFalse = () => setShowResults(false)

  //Deze code zorgt voor de state, om de Time en Date te laten werken
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  function processDropdownItem(value: string){
    setVal(value);
    //Als je Tsms (Timed SMS) selecteerd in de dropdown, dan word setTrue() opgeroepen. Dit veranderd de state naar true. Hierdoor kan je specifieke invulvelden van Timed SMS zien.
    // if (value === "Tsms"){
    //   setVal("Tsms")
    // }
    // //Als je alles behalven Tsms selecteerd in de dropdown, dan word setFalse() opgeroepen. Dit veranderd de state naar false. Hierdoor kan je de specifieke invulvelden van Timed SMS niet meer zien.
    // else{
    //   setFalse()
    // }
  }

  //deze code laat de date en time picker werken

  //Wanneer de date veranderd, veranderd de current date
  const changeDateTime = (event : Event, selectedDate : Date) => {
    //toon de overlay om uw date/time te veranderen, belangrijk dat dit eerst gebeurt, anders blijft het de time opnieuw tonen na het invullen.
    setShow(false);
    console.log(selectedDate)
    const currentDate = selectedDate || date;
    setDate(currentDate);
    DifTimer.set_timer_for_n_seconds(DifTimer.calculate_diff(selectedDate))
  };


  const showMode = (currentMode : string) => {
    setShow(true);
    setMode(currentMode);
    
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              
              <Text style={styles.sectionTitle}>Send SMS App</Text>
              <Text style={styles.sectionDescription}>
                use the button <Text style={styles.highlight}>Send SMS</Text> to send a text to a person
              </Text>

            <Text style={{paddingTop: 30}}>
                Message:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SendTextHelper.updateSmsValue(text)}/>
            
            <Text style={{paddingTop: 30}}>
                Phone number:
            </Text>

         
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SendTextHelper.updateSmsNumber(text)}
            />
            <Text style={{paddingTop: 30}}>
                Rule:
            </Text>
            <RNPickerSelect onValueChange = {(value) => processDropdownItem(value)}
              items={items}
              style={pickerSelectStyles}
              />

            {/* ----- start Regular SMS field ----- */}
            { showResults == "Rsms" ?
            <Button title={"Send SMS"} onPress={SendTextHelper.sendSMSFunction}/>
            : null}
            {/* ___ end Regular SMS field ___*/}


            {/* ----- start Timed sms fields ----- */}
              { showResults == "Tsms" ?  /*Hier check ik wat de state van showResults is. Als het true is:*/
                <View>
                  <Text style={{paddingTop: 30}}>
                      time:
                  </Text>
                  <View>
                    <Button onPress={showDatepicker} title="Set date" />
                    <Button onPress={showTimepicker} title="Set time" />
                  </View>
                  <Text>
                  
                      {'chosen time and date: '+ date.toLocaleString("nl-BE") /*veranderd de manier dat de date word weergegeven naar die zoals we dat in belgie doen */}
                    </Text>

                  {/*Dit is het stukje dat tevoorschijn komt als je een Time/Date wilt instellen. Dit is de overlau die op je scherm komt*/}
                  <Text>
                    {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={changeDateTime}
                          />
                        )}
                    </Text>
                    <Button title={"Save SMS"} onPress={SendTextHelper.sendSMSFunction}/>
                </View>
              :/*als het false is: */ null }
              {/* ___ end Timed sms fields ____*/}

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};




//Code voor wanneer op te start een melding te krijgen als je de app niet de nodige persmissions gegeven hebt.
const requestSMSPermission  = async () =>{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: "Cool App SMS Permission",
        message:
          "Cool App needs access to SMS ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can send SMS");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

requestSMSPermission();

export default App;