# Pack It

A packing assistant app that was built for a four-day competitive hackathon. It takes the weather of the place you're going and the duration of stay, and calculates an optimized packing list based on this information.

Deployed link: https://pack-it-stackathon.herokuapp.com/

# To Install

In order to install, git clone the link, then:

cd packIt
npm install
npm run start-dev

This should start the server on localhost:8080


#Features


#User Sign-up

On sign-up, a user can enter in items that they'd always like to pack (for example toiletries, prescriptions, glasses). Then, on list creation, these items will be included in every user's list

#New List Creation

On creating a list, a user enters in their city and state and duration of stay. The Google Geocoding API then takes the input location string and returns an exact latitude and longitude of the city/state. This is fed to the DarkSky API for a weather summary for the next week. Then, a custom algorithm calculates a packing list based on duration of stay and the weather summary of the week. This list can be added to or have items deleted before being saved to the database.
