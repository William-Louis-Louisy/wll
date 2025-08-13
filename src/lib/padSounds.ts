export interface IPad {
  id: string;
  key: string;
  label: string;
  sound: string;
}

export const pads: IPad[] = [
  {
    id: "pad-1",
    key: "a",
    label: "Kick",
    sound: "/audio/sounds/Kick.wav",
  },
  {
    id: "pad-2",
    key: "z",
    label: "Clap",
    sound: "/audio/sounds/Clap.wav",
  },
  {
    id: "pad-3",
    key: "e",
    label: "Snare_2",
    sound: "/audio/sounds/Snare_2.wav",
  },
  {
    id: "pad-4",
    key: "r",
    label: "Cymbal",
    sound: "/audio/sounds/Cymbal.wav",
  },
  {
    id: "pad-5",
    key: "q",
    label: "Bongo",
    sound: "/audio/sounds/Bongo.wav",
  },
  {
    id: "pad-6",
    key: "s",
    label: "Bongo_2",
    sound: "/audio/sounds/Bongo_2.wav",
  },
  {
    id: "pad-7",
    key: "d",
    label: "Bongo_3",
    sound: "/audio/sounds/Bongo_3.wav",
  },
  {
    id: "pad-8",
    key: "f",
    label: "Bongo_4",
    sound: "/audio/sounds/Bongo_4.wav",
  },
  {
    id: "pad-9",
    key: "u",
    label: "Perc",
    sound: "/audio/sounds/Perc.wav",
  },
  {
    id: "pad-10",
    key: "i",
    label: "Hit_1",
    sound: "/audio/sounds/Hit_1.wav",
  },
  {
    id: "pad-11",
    key: "o",
    label: "Crash",
    sound: "/audio/sounds/Crash.wav",
  },
  {
    id: "pad-12",
    key: "p",
    label: "Vocals",
    sound: "/audio/sounds/Vocals.wav",
  },
  {
    id: "pad-13",
    key: "j",
    label: "808",
    sound: "/audio/sounds/808.wav",
  },
  {
    id: "pad-14",
    key: "k",
    label: "Hihat",
    sound: "/audio/sounds/Hihat.wav",
  },
  {
    id: "pad-15",
    key: "l",
    label: "Open_hats",
    sound: "/audio/sounds/Open_hats.wav",
  },
  {
    id: "pad-16",
    key: "m",
    label: "FX",
    sound: "/audio/sounds/FX.wav",
  },
];
