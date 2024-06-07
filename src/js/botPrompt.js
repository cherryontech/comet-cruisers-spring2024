import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import star from '../assets/star_mascot.svg';

const messages = [
  'Why did the computer go to bed? It needed to crash.',
  'What did one plate say to another plate? Tonight, dinner is on me.',
  'You are a shining star!',
  'Keep up the great work!',
  'Believe in yourself!',
  'You can achieve anything!',
  'Stay positive and happy!',
  'Give yourself the time and opportunity to heal!',
  'Show yourself love and compassion!',
  'Today, you choose to love yourself just as you are.',
  'You are worthy of good things!',
  'With every challenge, you will understand yourself better!',
  'Every opportunity provides a chance to learn and grow!',
  'What kind of sandals do frogs wear? Open-toad.',
  'Why did the cookie go to the doctor? It was feeling crumby.',
  'How many tickles does it take to make an octopus laugh? Ten-tickles.',
  'What did the blanket say to the bed? I’ve got you covered.',
  'How do birds learn to fly? They wing it.',
  'What happens when ice cream gets angry? It has a meltdown.',
  'What do you call spaghetti in disguise? An impasta.',
  'Why didn’t the sun go to college? It already had a million degrees.',
  'The world is a better place because you are in it.',
  'Embrace your imperfections. They make you unique!',
  'I hate my job — all I do is crush cans all day. It’s soda pressing.',
  'Mom keeps asking why I have so much candy. She does not know I always keep a few Twix up my sleeve.',
  'I only know 25 letters of the alphabet — I just don`t know y.',
  'My dream job is to clean mirrors, because I can really see myself doing that.',
  'I lost 25% of my roof last night...oof.',
  'RIP, boiling water. You will be mist.',
  'I had a dream that I weighed less than a thousandth of a gram. I was like, 0mg.',
  'Mom said I should do lunges to stay in shape. That would be a big step forward.',
  'Time flies like an arrow. Fruit flies like a banana.',
  'My dog is a genius. I asked him, "What`s two minus two?" He said nothing.',
  'Justice is a dish best served cold. If it were served warm, it would be justwater.',
  'I used to hate facial hair, but then it grew on me.',
  'My boss asked me why I only get sick on work days. I said it must be my weekend immune system.',
  'I was wondering why the baseball kept getting bigger and bigger. Then it hit me.',
  'I just paid $100 for a belt that doesn’t fit — what a huge waist!',
  'I ordered a chicken and an egg online. I’ll let you know what comes first.',
  'It’s raining cats and dogs, so be careful not to step in a poodle.',
  'My boss told me to have a good day, so I went home!',
  'If money doesn’t grow on trees, then why do banks have branches?',
  'Mom is mad at me because she asked me to sync her phone, so I threw it in the ocean.',
  'I can tell when you`re lying just by looking at you. I can also tell when you`re standing.',
  'Mom asked me to put ketchup on the grocery list, and now I can`t read what else is on it.',
  'Lance isn`t that common a name these days, but in medieval times, they were called lance-a-lot.',
  'I want to name my puppies Rolex and Timex so I can have watch dogs.',
  'I love telling Dad jokes. Sometimes, he even laughs.',
  'I have a joke about putting in a light bulb, but I`m afraid I`ll screw it up.',
  'I have a joke about chemistry, but I don’t think it’ll get a reaction.',
  'I have a joke about banking, but I lost interest.',
  'I have a joke about cows, but I don`t want to milk it.',
  'I have a joke about kites, but it would just sail over your head.',
  'I have a scary joke about math, but I`m 2² to say it.',
  'I have a joke about construction, but I’m still working on it.',
  'I have a joke about time travel, but you guys didn’t get it.',
  'I have a joke about being an electrician, but it’s too shocking.',
  'I have a joke about hunting for fossils, but you probably wouldn’t dig it.',
  'I have a joke about a broken pencil, but it’s pointless.',
  'I have a joke about the flu, but I hope you don’t get it.',
  'I have a joke about statistics, but it’s not significant.',
  'I have a joke about pizza, but it’s too cheesy.',
  'I have a joke about immortality, and it never gets old.',
  'I have a joke about paper, but it’s tearable.',
  'I have a joke about trickle-down economics, but 99% of you will never get it.',
  'I have a joke about drilling, but it’s boring.',
  'I have a joke about being a rejected organ donor, but I just don`t have the guts to tell it.',
  'I had a joke about canned juice, but I couldn`t concentrate.',
  'I have a few jokes about retired people, but none of them work.',
  'I have a joke about a broken clock, but it’s not the right time.',
  'I have a joke about nepotism, but I`ll only give it to my kids.',
  'I have a joke about butter, but I`m not going to spread it.',
  'I have a joke about a roof, but it would just go over your head.',
  'I have a joke about inferiority complexes, but it’s not very good.',
  'I have a joke about procrastination, but I’ll tell it to you later.',
  'To the person who stole my glasses: I will find you. I have contacts.',
  'To the person who stole my case of energy drinks: I hope you can`t sleep at night.',
  'You`re amazing, even on your toughest days.',
  'Take a break and remember why you started.',
  'Give yourself permission to rest.',
  'Take care of your mind and body; they take care of you.',
  'Progress is made one step at a time.',
  'It`s okay to ask for help.',
  'You`re more resilient than you realize.',
  'Taking care of yourself is a productive activity.',
  'Rest is not a waste of time; it`s a necessity.',
  'You can`t do everything, but you can do something.',
  'Keep going; you`re closer than you think.',
  'Small steps lead to big changes.',
  'Believe in yourself, even when you`re tired.',
  'Be kind to yourself. You`re doing the best you can.',
  'Take it slow. Success is a marathon, not a sprint.',
  'You can`t do it all today, and that`s okay.',
  'You`re not a robot; don`t act like one.',
  'You got this, even if today `this` is just a nap.',
  'It`s okay to say `no` and give yourself a `yes`.',
  'Taking time to do nothing often brings everything into perspective.',
  'You can`t pour from an empty cup. Take care of yourself first.',
  'Being tired is just your brain`s way of saying it needs a spa day.',
  'When the going gets tough, the tough take a nap.',
  'Your energy levels are like WiFi – sometimes you just need to reset the router.',
  'You`re allowed to be both a masterpiece and a work in progress.',
  'Don`t be a busy bee; be a wise owl.',
  'When in doubt, nap it out.',
  'You`ve survived 100% of your worst days so far.',
  'Resting is not quitting; it`s recharging.',
  'Even superheroes need a day off.',
  'You`re not a mess, you`re a masterpiece in progress.',
  'Success is not the key to happiness. Happiness is the key to success.',
  'Self-care is giving the world the best of you, instead of what`s left of you.',
  'The only way out is through.',
  'Don`t let the muggles get you down.',
  'Be the reason someone smiles today, including yourself.',
  'Every storm runs out of rain.',
  'The struggle you`re in today is developing the strength you need for tomorrow.',
  'Your story isn`t over yet.',
  'You are braver than you believe, stronger than you seem, and smarter than you think.',
  'One small positive thought in the morning can change your whole day.',
  'Take care of your body. It`s the only place you have to live.',
  'Keep your face always toward the sunshine—and shadows will fall behind you.',
  'Success is not final, failure is not fatal: It is the courage to continue that counts.',
  'The only way to do great work is to love what you do.',
  'May your coffee be strong and your Monday be short.',
  'Act as if what you do makes a difference. It does.',
  'A balanced diet means a cupcake in each hand.',
  'Life is a journey. Use a map.',
  'If Plan A doesn’t work, the alphabet has 25 more letters.',
  'If you think you are too small to make a difference, try sleeping with a mosquito in the room.',
  'Life is like a box of chocolates. It’s hard to say no to.',
  'If opportunity doesn’t knock, build a door.',
  'Life is short. Smile while you still have teeth. Or even when you don`t.'
];

const GenerateMessage = () => {
  const [randomMessage, setRandomMessage] = useState('Talk to me! Click me for a surpirse!');

  const handleClick = () => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setRandomMessage(randomMsg);
  };

  return (
    <div className="container">
      <div className="interactive-container hover:animate-none">
        <button onClick={handleClick} style={{ border: 'none', background: 'none', padding: '0' }}>
          <img
            src={star}
            alt="Starfish"
            className="tutorial-star button"
            style={{ cursor: 'pointer' }}
          />
        </button>
      </div>
      <div className="textbox">{randomMessage}</div>
    </div>
  );
};

export default GenerateMessage;
