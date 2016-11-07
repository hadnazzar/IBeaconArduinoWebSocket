#include <SoftwareSerial.h>
//time.h library must be downloaded
#include "Timer.h"

SoftwareSerial BTSerial(12, 13); // RX | TX
 int counter=0;
 int serialCounter=0;
 Timer t;
void setup(){
  pinMode(8, OUTPUT);  // this pin will pull the BT Module pin 34 (key pin) HIGH to switch module to AT mode
  digitalWrite(8, HIGH);
  Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(9600);  // your own BT Module default speed in AT command more
   
    delay(500);
BTSerial.write("AT+CON884AEA7D105C");
t.every(1000, takeReading);
}

void loop(){
 t.update();

  // Keep reading from BT Module and send to Arduino Serial Monitor
  if (BTSerial.available())
    
    Serial.write(BTSerial.read());


  // Keep reading from Arduino Serial Monitor and send to BT Module
  if (Serial.available())
  {
    counter=1;
    BTSerial.write(Serial.read());

       
  }
  
  if (!Serial.available() && counter==1)
  {
      counter=0;
      Serial.print("\n");
    }
  
  
}
void takeReading()
{
BTSerial.write("AT+RSSI?");
 Serial.print("\n");
}

