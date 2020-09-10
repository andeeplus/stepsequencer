import Tone from "tone";
import BD from "sounds/808/BD_808_01.wav";
import SN from "sounds/808/Snare_808_01.wav";
import HH from "sounds/808/CH_808_01.wav";
import OH from "sounds/808/OH_A_808_03.wav";
import CB from "sounds/808/Cowbell_808_01.wav";
import CNG1 from "sounds/808/Conga_808_01.wav";
import RIM from "sounds/808/Rim_808_01.wav";
import CL from "sounds/808/Clap_808_01.wav";
import TOM1 from "sounds/808/Tom_808_01.wav";

const eightOeight = new Tone.Players({
  bd: BD,
  sn: SN,
  hh: HH,
  oh: OH,
  cb: CB,
  cn: CNG1,
  rm: RIM,
  cl: CL,
  tm: TOM1,
});

export default eightOeight