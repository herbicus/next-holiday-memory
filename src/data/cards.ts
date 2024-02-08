export type Card = {
  playCard: string;
  audio: string;
  animated: string;
  matched: string;
  duration: number;
};

export const cards: Card[] = [
  // 1 row1a - TERMINATOR - UPPER
  {
    playCard: "assets/img/8_Terminator/Terminator_lowerRight_START.jpg",
    audio: "assets/audio/Terminator_AUDIO_01.mp3",
    animated: "assets/img/8_Terminator/terminator.gif",
    matched: "assets/img/8_Terminator/Terminator-end.jpg",
    duration: 25000,
  },
  // 2 row1b - EXORCIST - UPPER
  {
    playCard: "assets/img/3_Exorcist/exorcist-start.jpg",
    audio: "assets/audio/exorcist_01.mp3",
    animated: "assets/img/3_Exorcist/exorcist.gif",
    matched: "assets/img/3_Exorcist/exorcist-upper-end.jpg",
    duration: 18000,
  },
  // 3 row 1c - MISSION IMPOSSIBLE - UPPER
  {
    playCard: "assets/img/5_MissionImpossible/5_MissImp_FINALFRAME1_FIRST.jpg",
    audio: "assets/audio/5_MissImp_AUDIO.mp3",
    animated: "assets/img/5_MissionImpossible/mission-impossible.gif",
    matched: "assets/img/5_MissionImpossible/5_MissImp_FINALFRAME2_LAST.jpg",
    duration: 17000,
  },
  // 4 row1d - KILL BILL - UPPER
  {
    playCard: "assets/img/7_KillBill/KillBill_top_START.jpg",
    audio: "assets/audio/KillBill_AUDIO_01.mp3",
    animated: "assets/img/7_KillBill/kill-bill.gif",
    matched: "assets/img/7_KillBill/KillBill_top_END.jpg",
    duration: 9500,
  },
  // 5 row2a - PINK PANTHER - UPPER
  {
    playCard: "assets/img/4_PinkPanther/pinkpanther_lowerright_start.jpg",
    audio: "assets/audio/pinkpanther_01.mp3",
    animated: "assets/img/4_PinkPanther/pinkpanther.gif",
    matched: "assets/img/4_PinkPanther/left-end.jpg",
    duration: 18000,
  },
  // 6 row2b - EXORCIST - LOWER
  {
    playCard: "assets/img/3_Exorcist/exorcist-start.jpg",
    audio: "assets/audio/exorcist_01.mp3",
    animated: "assets/img/3_Exorcist/exorcist.gif",
    matched: "assets/img/3_Exorcist/exorcist_lower_end.jpg",
    duration: 18000,
  },
  // 7 row 2c - JURRASIC PARK - UPPER
  {
    playCard: "assets/img/1_JurassicPark/Upper_START.jpg",
    audio: "assets/audio/JurrasicPark_AUDIO_FIX2_01.mp3",
    animated: "assets/img/1_JurassicPark/jurassicpark.gif",
    matched: "assets/img/1_JurassicPark/Upper_END.jpg",
    duration: 18000,
  },
  // 8 row2d - DEATH STAR - UPPER
  {
    playCard: "assets/img/6_DeathStar/DeathStar_UpperRight_START.jpg",
    audio: "assets/audio/DeathStar_AUDIO_01.mp3",
    animated: "assets/img/6_DeathStar/deathstar.gif",
    matched: "assets/img/6_DeathStar/DeathStar_UpperRight_END.jpg",
    duration: 14000,
  },
  // 9 row3a - MATRIX - LEFT
  {
    playCard: "assets/img/2_Matrix/Matrix_int_both.jpg",
    audio: "assets/audio/Matrix_SFX_01.mp3",
    animated: "assets/img/2_Matrix/matrix-a-final.gif",
    matched: "assets/img/2_Matrix/Matrix_L_end.jpg",
    duration: 17000,
  },
  // 10 row3b - MISSION IMPOSIBLE - LOWER
  {
    playCard: "assets/img/5_MissionImpossible/5_MissImp_FINALFRAME1_FIRST.jpg",
    audio: "assets/audio/5_MissImp_AUDIO.mp3",
    animated: "assets/img/5_MissionImpossible/mission-impossible.gif",
    matched: "assets/img/5_MissionImpossible/5_MissImp_FINALFRAME1_LAST.jpg",
    duration: 17000,
  },
  // 11 row3c - TERMINATOR - LOWER
  {
    playCard: "assets/img/8_Terminator/Terminator_lowerRight_START.jpg",
    audio: "assets/audio/Terminator_AUDIO_01.mp3",
    animated: "assets/img/8_Terminator/terminator.gif",
    matched: "assets/img/8_Terminator/Terminator_lowerRight_END.jpg",
    duration: 25000,
  },
  // 12 row3d - MATRIX - LOWER
  {
    playCard: "assets/img/2_Matrix/Matrix_int_both.jpg",
    audio: "assets/audio/Matrix_SFX_01.mp3",
    animated: "assets/img/2_Matrix/matrix-a-final.gif",
    matched: "assets/img/2_Matrix/Matrix_R_end.jpg",
    duration: 17000,
  },
  // 13 row4a - DEATH STAR - LOWER
  {
    playCard: "assets/img/6_DeathStar/DeathStar_UpperRight_START.jpg",
    audio: "assets/audio/DeathStar_AUDIO_01.mp3",
    animated: "assets/img/6_DeathStar/deathstar.gif",
    matched: "assets/img/6_DeathStar/DeathStar_LowerLeft_END.jpg",
    duration: 14000,
  },
  // 14 row4b - JURRASIC PARK - LOWER
  {
    playCard: "assets/img/1_JurassicPark/Upper_START.jpg",
    audio: "assets/audio/JurrasicPark_AUDIO_FIX2_01.mp3",
    animated: "assets/img/1_JurassicPark/jurassicpark.gif",
    matched: "assets/img/1_JurassicPark/Lower_END.jpg",
    duration: 18000,
  },
  // 15 row4c - PINK PANTHER - LOWER
  {
    playCard: "assets/img/4_PinkPanther/pinkpanther_lowerright_start.jpg",
    audio: "assets/audio/pinkpanther_01.mp3",
    animated: "assets/img/4_PinkPanther/pinkpanther.gif",
    matched: "assets/img/4_PinkPanther/right-end.jpg",
    duration: 18000,
  },
  // 16 row4d - KILL BILL - LOWER
  {
    playCard: "assets/img/7_KillBill/KillBill_top_START.jpg",
    audio: "assets/audio/KillBill_AUDIO_01.mp3",
    animated: "assets/img/7_KillBill/kill-bill.gif",
    matched: "assets/img/7_KillBill/last-bottom-frame-x.png",
    duration: 9500,
  },
];
