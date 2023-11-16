The Twitter web app has an evil handling of videos, taking over the context menu action to show "Copy video URL" — which then copies the Tweet URL to one's clipboard. This extension finds & presents the top video asset.

In Arc this opens in a new window, but a short term goal is to work out a direct download setup.

No dependencies, but fragile until further development:

- Assumes English UI & will break if menu copy changes
- Untested on tweets with multiple video embeds
- Have yet to verify the full extent of video types on Twitter (first step is to inventory what those might be)
- Changes in the Twitter React app could break this, assumptions include: react-root element, data-testid="videoComponent", memoizedProps on the component's DOM element under a key starting with "__reactProps" and the structure of the variants array under that.
