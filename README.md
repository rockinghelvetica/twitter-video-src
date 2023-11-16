The Twitter web app has an evil handling of videos, taking over the context menu action to show "Copy video Address" which then copies the Tweet URL to one's clipboard. This extension finds & presents the highest quality video asset.

~Due to cross-origin restrictions this opens the asset in a new window opposed to a direct download using the suggested name.~ fixed it with a blog

No dependencies, but fragile until further development:

- Assumes English UI & will break if menu copywriting ("Copy video Address") changes
- The mechanism for installing the script borrows Twitter's internal logic, which is subject to change: `window.__SCRIPTS_LOADED__['main']`
- Untested on tweets with multiple video embeds
- Assumes asset array is MP4 but if they change the video encoding it will misname the file
- Have yet to verify the full extent of video types on Twitter (first step is to inventory what those might be)
- Changes in the Twitter React app could break this, assumptions include: `react-root` element, `data-testid="videoComponent"`, `memoizedProps` on the component's DOM element under a key starting with `__reactProps` and the structure of the `variants` array under that.
- it works on twitter.com and we don't speak of the other idea
- if the video is over 500MB or so the download mechanism using blobs might fail
