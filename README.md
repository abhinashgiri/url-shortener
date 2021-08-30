**Shortify**

Shortify, a link shortening web service that takes a long URL from the user and provides them with a short URL.

TechStack Used: Node.js, express.js , MongoDB, tailwind css



**Motivation of Shortify**

I regularly organized mashups of coding problems on codeforces among my friends and had to share long invitation links. Sharing these links looked like spam and are not clean. 

Visitors like to see clean, human-readable URLs since it makes them easy to read, remember, and type. A long, unwieldy URL can be a usability issue. 

So, I thought of developing a shortening service and name it **Shortify.**

**The uniqueness of the project**, over others available in the market.



1. No Signup Required, Completely anonymous

    Sniply.io, bitly.com, short.io, these services require account registration before using their service.

2. No pricing, 

    Unlimited link shortening and is completely free.

3. No daily or monthly Limit on the Number of links shortened

    Bitly.com  provides Up to 1,500 branded links/month with a fee of $29/mn.

4. No restriction on the number of clicks on the shortened link

    Sniply provides 5 clicks/ month.

5. Custom expiry time selection

    Shortify provides a selection of time at which the shortened links expire. Or the user doesn’t want the link to expire, the Never expire option is also available.








    **Challenges Faced during its development**

1. Custom expiry time selection
1. Schedule jobs at a specific time and not at regular intervals.
2.  Scheduled jobs to only fire as long as the script is running, and the schedule should disappear when execution completes.

	Node-schedule package fits this well, providing easy usage.



2. Input validation

    Validation from the Web Browser like URL validation, email validation seemed to be good but failed at smart inputs. Therefore, I had to validate inputs in the backend too.

    Yup and Joy both are excellent validation packages but Yup had an edge over Joy with URL validation.


    So, I used the Yup package to validate








    **The flow of Working of Shortify**

1. The user enters a long URL in the input and also the Alias for the long URL (if any).
2. Clicking on Shortify sends the input to the **/service** endpoint,
    where it is **validated** using **YUP**, a node package.

      After successful validation, a shortened is generated using the nanoid package (if the Alias is not available or not provided). Then an **entry** is created in the **database** with a corresponding long URL and shorten link. After that, a **deletion** **job** is **scheduled** at the **expiry time** using the **node-schedule** package. The shortened URL is returned to the user.

3. The shortened URL is of type:  **https://urlshorify.herokuapp.com/Alias**

	When the user puts the shortened URL in the **URL bar** of the browser, the Alias parameter is extracted and the **lookup** in the **database** is performed and the user is redirected to a long URL corresponding to the shortened link in the lookup.








**Future Scope of Shortify**

1. **Integrate Whatsapp API in Shortify.**
2. **Database storage is not free, so introduce pricing and limit users accordingly.**





**Loopholes in Project**

1. **Easy to Misuse: no user validation, unlimited use**
2. **Not personalized for users**
