/*
This script continuously loads posts as the user scrolls the page. It uses the IntersectionObserver API to detect when the last post is in view. When the last post is in view, it fetches the next page and appends the posts to the page. It then checks if there is a next page and if there is, it continues to observe the last post. If there is no next page, it disconnects the observer.

Importantly, for this script to work, it requires that each card have the `post` class and that the card container have the `gh-postfeed` class
*/

import mediumZoom from "medium-zoom";

// Fetch and parse next page
async function getNextPage(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Failed to fetch page')
        }

        const nextPageHtml = await res.text();
        const parser = new DOMParser();
        const parsed = parser.parseFromString(nextPageHtml, 'text/html');
        const posts = parsed.querySelectorAll('.post');
        const nextLink = parsed.querySelector('link[rel="next"]')?.getAttribute('href');

        return {posts, nextLink}

    } catch (error) {
        throw new Error(error)
    }
}

export default function infiniteScroll(onAppend) {

    let link = document.querySelector('link[rel="next"]')?.getAttribute('href');
    const feed = document.querySelector('.gh-postfeed .grid');

    // Bail if there's no pagination or no feed grid to append to
    if (!link || !feed) { return; }

    let loading = false;

    const options = {
        // When the last card is within a 150px of the viewport, fetch the next page. This provides a smoother transition between pages
       rootMargin: '150px',
    }

    const watchLastPost = (observer) => {
        const lastPost = feed.querySelector('.post:last-of-type');
        if (lastPost) {
            observer.observe(lastPost);
        }
    }

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loading && link) {
                loading = true;
                observer.unobserve(entry.target);

                getNextPage(link).then(({posts, nextLink}) => {
                    posts.forEach(post => {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'reveal';
                        wrapper.appendChild(post);
                        feed.appendChild(wrapper);
                    })

                    mediumZoom('.prose img, .cover', {
                        background: '#0A0A0A',
                        margin: 0
                    });

                    if (typeof onAppend === 'function') {
                        onAppend();
                    }

                    if (nextLink) {
                        link = nextLink;
                        watchLastPost(observer)
                    } else {
                        observer.disconnect()
                    }
                }).catch(() => {
                    link = null;
                    observer.disconnect();
                }).finally(() => {
                    loading = false;
                })
            }
        })
    }

    let observer = new IntersectionObserver(callback, options);

    watchLastPost(observer)

}
