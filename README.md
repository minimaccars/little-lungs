# Little Lungs

A browser-based balloon adventure and Diamond Mine game with practice, webcam body-motion, and calibrated spirometer-ball inputs. Video is processed locally and is not recorded or uploaded. Only game scores are saved in the browser.

## Play

Balloon Adventure follows live motion with a moving landscape. Touch the regular diamonds for 2, 5 and 8 points. In spirometer mode, a green-ball rise has a 30% chance per flight to reveal a gold diamond worth 15 points. Landing does not add points. Body-motion mode detects frame changes, not semantic poses.

## Run locally

Serve the `dist` directory with a static HTTP server, for example `npx serve dist`. Camera access requires HTTPS or localhost. No build step or backend is required.

## Deploy

Vercel serves `dist` directly using `vercel.json`. Select the Other framework preset, with no build or install command and output directory `dist`.

## Prototype limits

This is an experimental game, not a medical measurement or diagnostic device. Follow the device instructions and prescribed routine. Lighting, moving backgrounds and device movement affect tracking. Recalibrate after moving the spirometer or camera. Do not chase game targets by breathing harder.

## Sources

See [SOURCE.md](SOURCE.md) for BreatheQuest repository and cave-art attribution.
