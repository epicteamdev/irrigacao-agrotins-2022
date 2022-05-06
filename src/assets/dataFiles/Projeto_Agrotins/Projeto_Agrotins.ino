#include "DHT.h"
#define DHTPIN A1 //Entrada digital para o sensor DHT11
#define DHTTYPE DHT11 //Tipo do sensor
#define sensor A0 //Entrada para o sensor de umidade do solo
int ValorAnalog = 0;
byte UmidPercent = 0,umidade = 0, ValorAnterior = 0;
 
//Constante que representa o pino onde o positivo 
//do buzzer será ligado.
int LED_VERDE = 11;
int LED_VERMELHO = 10;
int BOMBA=2;
DHT dht(DHTPIN, DHTTYPE);

//Método setup, executado uma vez ao ligar o Arduino.
void setup() {
  //Definindo o pino buzzer como de saída.
  pinMode(LED_VERMELHO,OUTPUT);
  pinMode(LED_VERDE,OUTPUT);
 // pinMode(BOMBA,OUTPUT);
  Serial.begin(9600); // configura a porta serial
  Serial.println(F("Testando DHT11 e o sensor capacitivo!"));

  dht.begin();
  //####################################
  pinMode(sensor, INPUT); //Configura o Pino do Sensor como Entrada
  ValorAnterior = analogRead(sensor); //Captura um primeiro valor de referencia inicial para a variavel ValorAnterior
}
 
//Método loop, executado enquanto o Arduino estiver ligado.

void loop() { 

//#########################################################
//SENSOR DE TEMPERATURA E UMIDADE DO AR - DHT11
//#########################################################
 // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Umidade do ar: "));
  Serial.print(h);
  Serial.print(F("% | Temperatura: "));
  Serial.print(t);
  Serial.print(F("°C "));
 //Serial.print(f);
 //Serial.print(F("°F  Heat index: "));
 //Serial.print(hic);
 //Serial.print(F("°C "));
 //Serial.print(hif);
// Serial.println(F("°F"));
//#########################################################
//SENSOR DE UMIDADE CAPACITIVO (SOLO) - HW-390
//#########################################################
//Le o valor do pino A0 do sensor
  ValorAnalog = analogRead(sensor); //Leitura do Valor Analógico do Sensor
 
  //UmidPercent = map(ValorAnalog, 285, 603, 0, 100); //Mapeando o valor entre 0 e 100
  UmidPercent = map(ValorAnalog, 319, 670, 0, 100); //Mapeando o valor entre 0 e 100
  umidade = 100 - UmidPercent;
  Serial.print(F("| Umidade do solo: "));
  Serial.print(umidade);
  Serial.println(F("% "));
 // Serial.println(ValorAnalog);
 // Serial.println(UmidPercent);
  Serial.println(F("------------------------------------------------------------------ "));

if (umidade<23){
  //#########################################################
//LED VERMELHO PSICANDO - UMIDADE ABAIXO DE 23%
//######################################################### 
  //Ligando o buzzer com uma frequencia de 1500 hz.
  digitalWrite(LED_VERMELHO, HIGH);  
  delay(500);
  tone(7, 2000, 500);
   
  //Desligando o buzzer.
  digitalWrite(LED_VERMELHO, LOW);
  delay(500); 
 // digitalWrite(BOMBA, HIGH);
}
else{
  //#########################################################
//LED VERDE PSICANDO - UMIDADE ACIMA DE 23%
//######################################################### 
  //Ligando o buzzer com uma frequencia de 1500 hz.
  digitalWrite(LED_VERDE, HIGH);  
  delay(500);
   
  //Desligando o buzzer.
  digitalWrite(LED_VERDE, LOW);
  delay(500);
  //digitalWrite(BOMBA, LOW); 
}
  

}
