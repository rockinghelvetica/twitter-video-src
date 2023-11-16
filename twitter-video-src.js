// document.addEventListener('DOMContentLoaded', (event) => {
    
    // const twitterVideoMenu = () => {
    //     console.log("installed extension really");
    //     // The scripts are loaded, so you can run your code now
    
    // }
//    return (link.match(/status\/(\d+)/) || [, null])[1];

    
(function () {
    function checkScriptsLoaded() {
        if (window.__SCRIPTS_LOADED__ && window.__SCRIPTS_LOADED__['main']) {
            console.log("Copying Twitter video URL will now open a window with the source (extension installed).");

            const getTweetUrlFromVideoMenu = (menu) => {
                // Find the timestamp link for the tweet
                // This can be either below or above the content between tweet and timeline/replies views.
                // The selector ensures the parentElement is not null so skip error handling
                return link = menu.closest('article')
                    ?.querySelector('a[href*="/status/"] > time')
                    .parentElement.getAttribute('href') || null;
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
                // console.log(videoComponent);
                let variants = getVariantsFromMemo(videoComponent);
                // console.log(variants);
                let highestBitrateVariant = variants.reduce((highest, variant) => {
                    if(variant.bitrate && (!highest || variant.bitrate > highest.bitrate)) {
                        return variant;
                    } else {
                        return highest;
                    }
                }, null);
                    

                // document.getElementById('your-element-id').addEventListener('click', function() {
                    // let videoSrc = 'https://example.com/path/to/video.mp4'; // Replace with your video source URL
                
                    let a = document.createElement('a');
                    a.href = highestBitrateVariant.src;
                    a.download = 'video.mp4'; // The name of the downloaded file
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                // });


            }, true);

        } else {
            setTimeout(checkScriptsLoaded, 300);
        }
    }
    
    checkScriptsLoaded();
})();


//     // Content script injection
//     // Callback function to execute when mutations are observed
//     const callback = function(mutationsList, observer) {
//         for(let mutation of mutationsList) {
//             if (mutation.type === 'childList') {
//                 // Check if the React root is now present
//                 if (document.getElementById('react-root')) {
//                     // If so, stop observing
//                     observer.disconnect();

//                     // And run your code
//                     twitterVideoMenu();
//                 }
//             }
//         }
//     };

//     // Create an observer instance linked to the callback function
//     const observer = new MutationObserver(callback);

//     // Options for the observer (which mutations to observe)
//     const config = { attributes: true, childList: true, subtree: true };

//     // Select the node that will be observed for mutations
//     const targetNode = document.body; // observe the whole body to capture the addition of 'react-root'

//     // Start observing the target node for configured mutations
//     observer.observe(targetNode, config);
// // });
