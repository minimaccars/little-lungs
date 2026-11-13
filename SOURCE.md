Diamond Mine is adapted from the game concept, indicator-level interface and READY / INHALING / COMPLETED cycle in modamaan/spirometer (BreatheQuest).

Repository: https://github.com/modamaan/spirometer
Reviewed commit: 9e23485aeec8b51c26c244e699338a4b1c1758ce
Reference files: src/components/DiamondMineGame.tsx, src/app/page.tsx, src/components/SpirometerTracker.tsx.
Reused image: public/bg-cave.jpg -> dist/bg-cave.jpg.

The integration uses Little Lungs' existing calibrated camera tracker, a buildless game renderer, fixed rewards, explicit pause/new-round controls, and a browser-local scoreboard with separate camera/practice histories. No trained AI model or clinical airflow measurements are supplied by this integration.
