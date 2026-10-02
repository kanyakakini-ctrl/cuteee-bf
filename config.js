/**
 * =========================================================================
 * BOYFRIEND'S DAY SURPRISE - EASY CONFIGURATION
 * =========================================================================
 * You can easily edit any text, photos, songs, or messages below!
 * Everything here updates the website automatically.
 */

window.BOYFRIEND_CONFIG = {
  // Names
  boyfriendName: "BABY",
  girlfriendName: "Your Girl",

  // Screen 1: Opening Screen
  screen1: {
    line1: "HAPPY",
    line2: "BOYFRIEND'S",
    line3: "DAY",
    continueButtonText: "≈ CONTINUE"
  },

  // Screen 2: Accept the Gift
  screen2: {
    title: "PLEASE ACCEPT THE GIFT",
    yesButtonText: "YES ❤️",
    noButtonText: "NO"
  },

  // Screen 3: Why Did You Click No!
  screen3: {
    title: "WHY DID YOU CLICK NO!",
    tryAgainButtonText: "TRY AGAIN"
  },

  // Screen 4: Choose Your Gifts
  screen4: {
    title: "Choose Your Gifts",
    gifts: [
      {
        id: "envelope",
        name: "Love Letter",
        tag: "For You",
        image: "assets/decorations/envelope.png",
        hint: "A handwritten letter sealed with love ♡"
      },
      {
        id: "bouquet",
        name: "White Roses",
        tag: "Pure Love",
        image: "assets/decorations/bouquet.png",
        hint: "An elegant bouquet tied with navy ribbon ♡"
      },
      {
        id: "present",
        name: "Surprise Present",
        tag: "Special",
        image: "assets/decorations/giftbox.png",
        hint: "Wrapped with all my sweetest thoughts ♡"
      }
    ],
    openButtonText: "OPEN →"
  },

  // Screen 5: The Love Letter & 5 Polaroids
  screen5: {
    photos: [
      {
        url: "assets/photos/photo1.jpg",
        caption: "Heart full of you ♡",
        rotation: -5
      },
      {
        url: "assets/photos/photo2.jpg",
        caption: "My happiest place ♡",
        rotation: 4
      },
      {
        url: "assets/photos/photo3.jpg",
        caption: "Sweet moments ♡",
        rotation: 5
      },
      {
        url: "assets/photos/photo4.jpg",
        caption: "My handsome boy ♡",
        rotation: -4
      },
      {
        url: "assets/photos/photo5.jpg",
        caption: "Forever & always ♡",
        rotation: 2
      }
    ],
    letter: `Heyy Babyyyy! ❤️

Happy Boyfriend’s Day to the best boyfriend in the whole world!! ❤️

I love how you’re the sweetest, hottest, and calmest person I’ve ever known.

You have this magical way of making me happy just by existing and doing all the little things that make me feel so loved and special.

You’re honestly the most caring person I know.

You always put everyone before yourself, and I keep falling for you EVERY SINGLE DAY.

I’m so incredibly proud of you.

I hope you always remember how proud I am of you.

I love you so, so much, babyyyyy. ❤️

Happy Boyfriend’s Day, my favourite person!`,
    continueButtonText: "NEXT PAGE →"
  },

  // Screen 6: Handsome Boyfriend Page
  screen6: {
    handwrittenTitle: "i have the most\nhandsome bf <3",
    flowerTag: "FOR YOU ♡",
    coupleImage: "assets/decorations/couple.png",
    bouquetImage: "assets/decorations/bouquet.png",
    continueButtonText: "NEXT ♡"
  },

  // Screen 7: Love Song & Vinyl Record
  screen7: {
    recordQuote: "AND SUDDENLY\nALL THE LOVE\nSONGS WERE ABOUT\nYOU <3",
    characterMessage: "I LOVE YOU\nSOOOOOOO...\nMUCH ❤️",
    music: {
      songTitle: "Tu Hi Mera",
      artistName: "Pritam Chakraborty",
      albumCover: "assets/decorations/album_couple.jpg",
      audioSrc: "assets/music/tu_hi_mera.mp3"
    },
    continueButtonText: "ONE LAST THING →"
  },

  // Screen 8: Final Love Message
  screen8: {
    finalMessage: `Happy Boyfriend’s Day,\nmy love ❤️\n\nThank you for being you.\nI love you more than words can explain.`,
    replayButtonText: "ONE MORE TIME ❤️"
  }
};
