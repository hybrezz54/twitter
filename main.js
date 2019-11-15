/**
 * Course: COMP 426
 * Assignment: a09
 * Author: Hamzah Chaudhry
 */

/** Number of tweets to load at a time */
const TWEET_LIMIT = 10;

const formatDate = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
};

/**
 * Render HTML to display the body and author of
 * a Tweet object
 * 
 * @param {*} tweet A Tweet object
 */
const renderTweet = (tweet) => {
    // if (tweet.type === "tweet") {
    return `<section class="tweet is-dark" data-tweet="${tweet.id}">
                <div class="columns is-large">
                    <div class="column is-four-fifths">
                        <div class="card has-text-centered">
                            <div class="card-content">
                                <p class="body is-size-4">
                                    ${tweet.body}
                                </p>
                                <p class="subtitle author is-size-6">
                                    ${tweet.author}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="column has-text-centered">
                        <div class="actions">
                            <div class="action ${tweet.isLiked ? 'action-liked' : 'action-like'}" data-count="${tweet.likeCount}">
                                <span class="icon is-large">
                                    <i class="mdi mdi-heart mdi-48px"></i>
                                </span>
                            </div>

                            <div class="action action-retweet" data-count="${tweet.retweetCount}">
                                <span class="icon is-large">
                                    <i class="mdi mdi-twitter-retweet mdi-48px"></i>
                                </span>
                            </div>

                            <div class="action action-reply">
                                <span class="icon is-large">
                                    <i class="mdi mdi-reply mdi-48px"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>`;
    // }
};

/**
 * Render HTML to display a dialog asking
 * the user to login
 */
const renderLoginModal = () => {
    return `<div class="modal is-active" data-tweet="-1">
                <div class="modal-background"></div>

                <div class="modal-content">
                    <a class="button is-info is-medium" href="login">
                        Log in
                    </a>

                    <button id="close" class="delete action" aria-label="close"></button>
                </div>
            </div>`;
};

/**
 * Render HTML to display a dialog for
 * the user to create a Tweet
 */
const renderNewTweetModal = (id = -1, body = '') => {
    return `<div class="modal is-active" data-tweet="${id}">
                <div class="modal-background"></div>

                <div class="modal-card">
                    <button id="close" class="delete" aria-label="close"></button>

                    <section class="modal-card-body">
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <textarea id="tweet-body" class="textarea" placeholder="What's happening?" maxlength="280">${body}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer class="card-footer">
                        <div id="${body ? 'update' : 'tweet'}" class="card-footer-item action action-tweet">
                            <span>
                                ${body ? 'Update' : 'Tweet'} <i class="mdi mdi-twitter"></i>
                            </span>
                        </div>
                    </footer>
                </div>
            </div>`;
}

/**
 * Render HTML to display a dialog for
 * the user to create a Tweet
 */
const renderTweetModal = (tweet) => {
    const createTime = new Date(tweet.createdAt);
    return `<div class="modal is-active" data-tweet="${tweet.id}">
                <div class="modal-background"></div>

                <div class="modal-card">
                    <button id="close" class="delete" aria-label="close"></button>

                    <section class="modal-card-body">
                        <p class="title body">${tweet.body}</p>
                        <h3 class="subtitle author">${tweet.author}</h3>
                        
                        <div class="tags">
                            <span class="tag is-dark">${tweet.likeCount} Likes</span>
                            <span class="tag is-dark">${tweet.retweetCount} Retweets</span>
                        </div>

                        <p class="date">
                            ${formatDate(createTime)}
                        </p>
                    </section>

                    <footer class="card-footer">
                        <div class="card-footer-item action action-edit ${!tweet.isMine ? 'is-hidden' : ''}">
                            <span>
                                Edit &nbsp;<i class="mdi mdi-pencil"></i>
                            </span>
                        </div>

                        <div class="card-footer-item action action-reply" data-count="${tweet.replyCount}">
                            <span>
                                Reply &nbsp;<i class="mdi mdi-reply"></i>
                            </span>
                        </div>

                        <div class="card-footer-item actions">
                            <div class="action ${tweet.isLiked ? 'action-liked' : 'action-like'}" data-count="${tweet.likeCount}">
                                <span class="icon">
                                    <i class="mdi mdi-heart mdi-24px"></i>
                                </span>
                            </div>

                            <div class="action action-retweet" data-count="${tweet.retweetCount}">
                                <span class="icon">
                                    <i class="mdi mdi-twitter-retweet mdi-24px"></i>
                                </span>
                            </div>

                            <div class="action action-delete ${!tweet.isMine ? 'is-hidden' : ''}">
                                <span class="icon">
                                    <i class="mdi mdi-delete mdi-24px"></i>
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>`;
}

/**
 * Add rendered Tweets to a jQuery element with a specified starting
 * index in a list of tweets and a specified number of tweets
 * 
 * @param {*} elmt The root element to append the rendered HTML of the tweets to
 * @param {*} tweets The list of Tweet objects 
 * @param {*} start The index to start in the list tweets
 * @param {*} limit The number of tweets to add
 */
const addTweets = (elmt, tweets) => {
    let numTweets = elmt.attr('data-num');

    // add tweets to page
    for (let i = 0; i < tweets.length; i++) {
        elmt.append(renderTweet(tweets[i]));
        numTweets++;
    }

    // update attribute for number of tweets on page
    elmt.attr('data-num', numTweets);
}

/**
 * 
 * @param {*} elmt A jQuery element to append new elements too
 */
const getTweets = async (elmt, skip = 0, limit = TWEET_LIMIT) => {
    // retreive and display tweets
    const resp = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        params: {
            skip: skip,
            limit: TWEET_LIMIT,
            where: { type: ['tweet', 'retweet'] }
        }
    }).catch((err) => {
        // not logged in
        console.log(err);
        elmt.append(renderLoginModal());
    });

    // process tweets
    if (resp) {
        // add first few tweets to page
        const tweets = resp.data;
        addTweets(elmt, tweets);

        // add more tweets on scroll
        // $(window).off();
        // $(window).scroll(() => {
        //     if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        //         const num = elmt.children().length;
        //         addTweets(elmt, tweets, num);
        //     }
        // });
    }
}

const invalidate = (elmt) => {
    elmt.empty();
    elmt.attr('data-num', 0);
    getTweets(elmt);
}

// set up on page load
$(document).ready(() => {
    // div to display tweets
    const $tweets = $('#tweets');
    let page = 0;

    // new tweet button hadnler
    $('button.action-tweet').on('click', (event) => {
        $tweets.append(renderNewTweetModal());
    });

    // tweet button handler
    $tweets.on('click', '#tweet', async (event) => {
        const body = $('#tweet-body').val();

        // if body contains val
        if (body) {
            const result = await axios({
                method: 'post',
                url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
                withCredentials: true,
                data: {
                    body: body
                }
            }).catch((err) => {
                // not logged in
                console.log(err);
                $tweets.append(renderLoginModal());
            });

            // update tweets
            if (result) {
                invalidate($tweets);
            }
        }
    });

    // update button handler
    $tweets.on('click', '#update', async (event) => {
        const body = $('#tweet-body').val();
        const id = $(event.currentTarget).parent().parent().parent().attr('data-tweet');

        // if body contains val
        if (body) {
            const result = await axios({
                method: 'put',
                url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
                withCredentials: true,
                data: {
                    body: body
                },
            }).catch((err) => {
                // not logged in
                console.log(err);
                $tweets.append(renderLoginModal());
            });

            if (result) {
                $('div.modal').remove();
                $tweets.append(renderTweetModal(result.data));
            }
        }
    });

    // timeline tweet click handler
    $tweets.on('click', 'section.tweet .card', async (event) => {
        const $tgt = $(event.currentTarget);
        const id = $tgt.parent().parent().parent().attr('data-tweet');

        // retreive tweet info
        const result = await axios({
            method: 'get',
            url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
            withCredentials: true,
        }).catch((err) => {
            console.log(err);
            $tweets.append(renderLoginModal());
        });

        // show dialog
        if (result) {
            $tweets.append(renderTweetModal(result.data));
        }
    });

    // like tweet action click handler
    $tweets.on('click', 'div.action-like', async (event) => {
        const $tgt = $(event.currentTarget);
        const id = $tgt.parent().parent().parent().parent().attr('data-tweet');
        const count = parseInt($tgt.attr('data-count'));

        // like tweet
        const result = await axios({
            method: 'put',
            url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/like`,
            withCredentials: true,
        }).catch((err) => {
            // not logged in
            console.log(err);
            $tweets.append(renderLoginModal());
        });

        if (result) {
            $tgt.removeClass('action-like').addClass('action-liked');
            $tgt.attr('data-count', count + 1);
            $('.tag:first-of-type').text((count + 1) + ' Likes');
        }
    });

    // unlike tweet action click handler
    $tweets.on('click', 'div.action-liked', async (event) => {
        const $tgt = $(event.currentTarget);
        const id = $tgt.parent().parent().parent().parent().attr('data-tweet');
        const count = parseInt($tgt.attr('data-count'));

        // unlike tweet
        const result = await axios({
            method: 'put',
            url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/unlike`,
            withCredentials: true,
        }).catch((err) => {
            // not logged in
            console.log(err);
            $tweets.append(renderLoginModal());
        });

        if (result) {
            $tgt.removeClass('action-liked').addClass('action-like');
            $tgt.attr('data-count', count - 1);
            $('.tag:first-of-type').text((count - 1) + ' Likes');
        }
    });

    // delete tweet action click handler
    $tweets.on('click', 'div.action-delete', async (event) => {
        const $tgt = $(event.currentTarget);
        const id = $tgt.parent().parent().parent().parent().attr('data-tweet');

        // delete tweet
        const result = await axios({
            method: 'delete',
            url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
            withCredentials: true,
        }).catch((err) => {
            // not logged in
            console.log(err);
            $tweets.append(renderLoginModal());
        });

        if (result) {
            $('div.modal').remove();
            $(`[data-tweet=${id}]`).remove();
        }
    });

    // edit tweet action click handler
    $tweets.on('click', 'div.action-edit', async (event) => {
        const $tgt = $(event.currentTarget);
        const id = $tgt.parent().parent().parent().attr('data-tweet');
        const body = $(`[data-tweet=${id}] section > p.body`).text();

        // show tweet dialog
        $tweets.append(renderNewTweetModal(id, body));
    });

    // action hover handler
    // $tweets.on('mouseenter', 'div.action-like, div.action-retweet, div.action-reply', (event) => {
    //     console.log("hi");
    // }).on('mouseleave', 'div.action-like, div.action-retweet, div.action-reply', (event) => {
    //     console.log("bye");
    // });

    // modal close handler
    $tweets.on('click', '#close', async (event) => {
        const id = parseInt(event.currentTarget.parentNode.parentNode.getAttribute('data-tweet'));
        $('div.modal').remove();
        // invalidate($tweets);

        // retreive tweet info
        if (id >= 0) {
            const result = await axios({
                method: 'get',
                url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
                withCredentials: true,
            }).catch((err) => {
                console.log(err);
                $tweets.append(renderLoginModal());
            });

            // update tweet in feed
            if (result) {
                $(`[data-tweet=${id}]`).replaceWith(renderTweet(result.data));
            }
        }
    });

    // add more tweets on scroll
    $(window).scroll(() => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            getTweets($tweets, page += TWEET_LIMIT);
        }
    });

    // update with recent tweets
    getTweets($tweets);
});