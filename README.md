# Weather-Dashboard

## Horiseon-Webpage

# Description

This project is a functional weather dashboard that uses server side APIs to display an accurate weather forecast. When the user inputs their city, the website displays the current weather, temperature, humidity, wind speed, and the UV index; as well as the forecast for the next five days as well. My motivation behind this application is to create an easy and user friendly weather forecast, so that anyone can know what to expect for the next couple days in terms of local weather. This way I can know how to dress for work every day, since I mainly work outside. The code for this is done with one HTML document and one JavaScript document. The HTML is pretty straight forward, with a couple divs and header; and also links to all of the APIs used. The Javascript is also pretty straight forward, but a little more complicated than the HTML. First we establish the API we are going to be using, OpenWeatherMap, and then define all our variables. We then use a couple GET calls to get the information from our API, and some functions to parse all of the information out. We then grab all our items from local storage if there is any, and make sure that gets parsed too. We then create all items that aren't mentioned in the HTML like some of the buttons, and finish by appending any and all parsed information.

## Usage

The title of this application is called "Weather Dashboard". Under that is a header and box where the user searches for a city. They then click the icon next to it to search the forecast of the city. The city then pops up with accurate information on the date, temperature, humididty, wind speed, and UV index as of the time the city is searched. Under all of that, there are fice boxes that determine the forecast for the next five days, with an icon of the weather expected; and the termperature and humidity as well. The city is also placed into a history, where you can see all of the cities you searched until the "Clear History" button is clicked.

Screenshot of Deployed Application: ![screenshot](https://github.com/BrettGlerum/Weather-Dashboard/blob/main/assets/images/Screenshot%20(11).png)
## License

MIT License

Copyright (c) 2022 BrettGlerum

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
