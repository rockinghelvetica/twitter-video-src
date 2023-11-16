(function () {
    function checkScriptsLoaded() {
        // As of November 2023 this is the mechanism Twitter's web app relies on for the app's status
        if (window.__SCRIPTS_LOADED__ && window.__SCRIPTS_LOADED__['main']) {
            console.log("Copying Twitter video URL will now open a window with the source (extension installed).");

            const getSanitizedTweetUrlFromVideoMenu = (menu) => {
                // Find the timestamp link for the tweet
                // This can be either below or above the content between tweet and timeline/replies views.
                // The selector ensures the parentElement is not null so skip error handling
                return link = menu.closest('article')
                    ?.querySelector('a[href*="/status/"] > time')
                    .parentElement.getAttribute('href').replace(/[^a-z0-9]/gi, '_') || null;
            }

            document.getElementById('react-root').addEventListener('click', async (event) => {
                // This intercepts all clicks so let's make the test lightweight
                if(!event.target.textContent.match(/copy (video|gif) address/i)) return false;
    
                const getVariantsFromMemo = (domElement) => {
                    let variantsArray = [];
                    for (let key in domElement) {
                        if (key.startsWith('__reactProps') && domElement[key].children) {
                            for (let child of domElement[key].children) {
                                if (child && child._owner && child._owner.memoizedProps && child._owner.memoizedProps.variants) {
                                    // Add flat
                                    variantsArray.push(...child._owner.memoizedProps.variants);
                                }
                            }
                        }
                    }
                    return variantsArray.length > 0 ? variantsArray : null;
                }
                let videoComponent = event.target.closest('div[data-testid="videoComponent"]');
                let variants = getVariantsFromMemo(videoComponent);
                
                // Exit here if something is wrong.
                if (variants.length === 0) {
                    console.log("No video assets found.");
                    return;
                }

                let highestBitrateVariant = variants.slice(1).reduce((highest, variant) => {
                    return (variant.bitrate && (!highest || variant.bitrate > highest.bitrate)) ? variant : highest;
                }, variants[0]);
                
                // Create a link to open 
                let downloadname = getSanitizedTweetUrlFromVideoMenu(event.target) || "tweet-video";
                let a = document.createElement('a');
                console.log(downloadname);

                // Should expose this as an option for the extension if preferred vs. direct download
                // a.href = highestBitrateVariant.src;
                // a.download = downloadname + '.mp4';
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);

                // Trying some shit, should work unless videos are over 500MB somehow?
                fetch(highestBitrateVariant.src)
                .then(response => response.blob())
                .then(blob => {
                    let url = URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = downloadname + '.mp4';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
                .catch(error => console.error(error));


            }, true);

        } else {
            setTimeout(checkScriptsLoaded, 300);
        }
    }
    checkScriptsLoaded();
})();