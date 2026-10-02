# 💙 Boyfriend's Day Digital Scrapbook Website 🤍

A mobile-first, interactive **Boyfriend's Day surprise love story** designed like a handmade romantic scrapbook.

---

## ✨ Features & Highlights

1. **Screen 1 — Opening Scrapbook Cover**:
   - Dark denim texture with fabric twill, stitched denim stars, white doodle sparkles, vintage camera sticker with interactive flash, and bold 3D embroidered patch lettering: `"HAPPY BOYFRIEND'S 🤍 DAY 🤍"`.
   - Handmade scrapbook pill label: `"≈ CONTINUE"`.

2. **Screen 2 — Accept The Gift**:
   - Cream graph/grid paper with navy blue gingham borders.
   - Cute puppy-eyed cartoon character with blushing cheeks and wide open paws.
   - Interactive `[ YES ❤️ ]` and `[ NO ]` dark red rounded buttons.

3. **Screen 3 — Why Did You Click No!**:
   - Crying character with giant cartoon tears pouring into an animated water puddle.
   - `[ TRY AGAIN ]` button returning smoothly to Screen 2.

4. **Screen 4 — Gift Selection**:
   - Three gently floating interactive gifts:
     - ✉️ Royal blue love letter envelope sealed with heart wax.
     - 💐 Elegant bouquet of white roses and calla lilies tied with a dark blue ribbon bow.
     - 🎁 Dark blue wrapped present box with luxury silk ribbon.
   - Interactive selection badges (`✓ ❤️`) and `"OPEN →"` button.

5. **Screen 5 — The Love Letter & 4 Polaroids**:
   - Four Polaroid photos physically taped to the corners with translucent washi tape strips, shadows, and realistic tilt angles.
   - Central scalloped kraft paper card pinned with a metallic paperclip.
   - Handwritten love letter that can be scrolled smoothly.
   - **Interactive Polaroid Zoom**: Tapping any Polaroid opens an enlarged photo view with a cute caption!

6. **Screen 6 — Handsome Boyfriend**:
   - Cute handwritten title: `"i have the most handsome bf <3"`.
   - Adorable cartoon couple hugging snugly + daisy flower tag `"FOR YOU :)"`.
   - Large white roses bouquet with tucked gift card `"FOR YOU ♡"`.

7. **Screen 7 — Love Song & Music Player**:
   - Left card: Navy card with spinning vinyl record and quote: `"AND SUDDENLY ALL THE LOVE SONGS WERE ABOUT YOU <3"`.
   - Right card: Hand-drawn character with super long arms: `"I LOVE YOU SOOOOOOO... MUCH ❤️"`.
   - Music player: Song **"Tu Hi Mera"** by **Pritam Chakraborty**, with working Play/Pause, interactive scrubbable progress bar, album cover art, and disco ball!

8. **Screen 8 — Final Love Message & Restart**:
   - Deep navy starry night sky with glowing stars and floating hearts.
   - Central paper card with the heartfelt love message.
   - `"ONE MORE TIME ❤️"` button that smoothly restarts the entire experience from Screen 1!

---

## 🛠️ How to Customize (`config.js`)

All text, photos, songs, and messages can be edited in one obvious file: `config.js`:

```javascript
window.BOYFRIEND_CONFIG = {
  boyfriendName: "BABY",
  girlfriendName: "Your Girl",

  // 4 Polaroid Photos
  screen5: {
    photos: [
      { url: "assets/photos/photo1.jpg", caption: "My handsome boy ♡" },
      { url: "assets/photos/photo2.jpg", caption: "Our waterfall date ♡" },
      { url: "assets/photos/photo3.jpg", caption: "Smiling with you ♡" },
      { url: "assets/photos/photo4.jpg", caption: "Cutest duo ever ♡" }
    ],
    letter: `Heyy Babyyyy! ❤️ ...`
  },

  // Music Player
  screen7: {
    music: {
      songTitle: "Tu Hi Mera",
      artistName: "Pritam Chakraborty",
      albumCover: "assets/decorations/album_tu_hi_mera.jpg",
      audioSrc: "assets/music/tu_hi_mera.mp3"
    }
  },

  // Final Message
  screen8: {
    finalMessage: `Happy Boyfriend’s Day,\nmy love ❤️\n...`
  }
};
```

---

## 🚀 How to Open and View

Double-click `index.html` in this folder to open it directly in any web browser (Chrome, Edge, Safari, Firefox), or on mobile via any local file viewer or web hosting service (Vercel, Netlify, GitHub Pages).
