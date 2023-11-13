# [wordish.name ![](https://github.com/Styro457/Wordish.Name/assets/69657780/c35bbafa-d4fe-4727-9436-5152671480a6)](https://www.wordish.name/)

**Generate names for anything using uncommon dictionary words.**<br>


<sup>wordish<sup>1</sup> = Of or pertaining to words; verbal; wordy.</sup>

![Website Title](https://i.imgur.com/Fzipg0l.png)

# Description
**wordish.name** is a website intended to help in coming up with a name for a project, product, object or anything else. <br>
The cocept was inspired by the many popular services that use simple words as their name such as Discord, Twitter, Twitch, etc.

The website takes as input a few words or group of words sepparated by commas and returns a list of relevant uncommon words. From here it is easy to scroll through the results and analyze each word in order to find a suitable name.

By using actual words from the dictionery the names will not only be easy to pronounce, but could also cary some meaning about the project it is used for.

# Interface

# Examples
An example of a name generated using this method is this website, which has named itself. Here are a few other projects where I used it:
- [Tinge](https://github.com/Styro457/Tinge) - a trace of a color -> Javascript GameEngine


# Features

# Planned Features
![Website Preview](https://i.imgur.com/HYmGUtg.png)

# How it works
Word searches are made using the [Datamuse API](https://www.datamuse.com/api/), a really powerfull word-finding query engine. By combining the keywords in different ways it is possible to get a large list of relevant words. These are then filtered based on how common they are using data from [Google Books Ngrams](https://books.google.com/ngrams/) (also provided by the api). The final words are sorted based on relavance, length and ease of pronounciation and displayed alongside their definitions, pronounciations and usefull tools to check how good of a name it would be.

<p align="center">
  <img src="https://github.com/Styro457/Wordish.Name/assets/69657780/ad97f8e7-9950-4d1b-b9cc-48789da14e52" alt="Words Conection Diagram" />
</p>



----
The sorting algorithm currenty uses the following equation to calculate a score for each word:

```js
appearences(A) - 0.2*length(A)
```
In the future this will also include ease of pronounciation and frequency (how common it is)

---

