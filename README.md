# kaustav.portfolio

Static site. No build step. Upload the folder to Cloudflare Pages / Workers assets.

## What you edit (only assets/js/config.js)
- heroVideo        -> your ~10 second video URL (autoplays muted, loops, tap speaker for sound)
- profileImage     -> already set to https://iili.io/njMHxe9.png
- projects         -> copy a block, paste at the top, change the text. Set status to "live" / "upcoming" / "case".
                      When txtskill launches: set status "live" and add its url.
- knowledge        -> About page skill groups
- skills           -> Skills page cards (title, image URL, setup list, errors fixed)

## Local test
    cd kaustav-portfolio && python -m http.server 8080
Open http://localhost:8080
