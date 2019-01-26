# The Anagram Finder

![Anagram screenshot](https://media.giphy.com/media/DC5oCoIwtrR6CfxDaB/giphy.gif "The Anagram Finder")

## Getting Started

The Anagram Finder is an app built using JavaScript/ES6. To get started, clone this repository and then download all the necessary dependancies using npm (or yarn). 

`npm install` 

Let’s run this on your local machine. To run the backend, you need to `cd` into the /backend folder, then run 

`PORT=3001 npm start`

to run client, you need to `cd` into the /client folder, then run 

`npm start`

The client will not work without the backend.

## How it works

The entire application is written with **JavaScript/ES6**. The backend makes use of Node's Express library, while the client uses React.

Using Node/Express, an API to **localhost3001** is created and reads the **dictionary.txt** file with fs.readFileSync and sends it to the **/users** route

Using a proxy, the frontend is able to communicate with the data being stored at **localhost3001** and run its own React application on **localhost3000**

The data (words) being stored in the local api are then passed into the App component by fetching **/words**. This array of words is stored in the state as an array.

The component’s state is updated every time the input field changes. When the button is clicked, the state’s word array uses a built-in ‘includes’ method, to see if the word in the current input field exists in the array.

If it does not exist in the array, we’re done. The state changes to mention it’s not contained in the dictionary. However, if the word does exist in the area, all possible anagrams are then calculated.

In order to order by the second letter, all anagrams are then filtered into two separated variables, which are passed into the state, which orders the anagramsBySecondLetter list before the rest.

## Why This Approach Was Made

I knew that React would be used, since it is fast and would allow for an interface. Since we would need to connect to an API, I used Express since it was a quick set-up. Django would have been another good choice, but Express felt more lightweight for what the project asked for.

Since there was really one call-to-action that was needed (finding anagrams), there was no real need for multiple components, so only a List component was added. 

## Libraries Used 

⋅⋅* **React** - for its amazing UI prowess and virtual DOM speed⋅⋅
⋅⋅* **Node / Express** - for its ease of connecting an API/routing and compatibility with React⋅⋅
⋅⋅* **Bootstrap** - for styling purposes⋅⋅
⋅⋅* **Enzyme** - for testing⋅⋅

## Testing 

Testing can be performed while in the **/client** folder by running:

`npm test`

I would have loved to add more testing if timing allowed. My tests are mainly to check the instances of the React methods. More testing could have been added for Routing on the backend.

## Some Features if More Time Were Given

This was put together in a couple nights, so it does have a few pitfalls. One noticeable thing is that bigger words tend to work a little slower, due to the massive array of words being created. In reality, an actual database should be used and not have that much data stored on the client side. However, since the application is so small, it didn’t seem like a big problem in this instance. Considering future concerns, this may be what I would tackle first, especially if the **dictionary.txt** file contained a billion words.

I would add more testing, especially on the backend.

