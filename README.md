# [Wordish.Name](https://wordish.styro.dev)
<a href="https://github.com/Styro457/wordish.name/releases">![GitHub release](https://img.shields.io/github/v/release/Styro457/wordish.name?logo=github&color=%2366e385)</a>
<a href="https://github.com/Styro457/wordish.name?tab=GPL-2.0-1-ov-file">![GitHub License](https://img.shields.io/github/license/Styro457/wordish.name)</a>
<sup>wordish<sup>1</sup> = Of or pertaining to words; verbal; wordy.</sup>

**Generate names for anything using dictionary words.**<br>


![Website Title](https://i.imgur.com/Fzipg0l.png)

## 📝 Description
**Wordish.Name** is an **online name generator** intended to help in coming up with a name for a **project**, **character**, **product**, **object** or anything else. <br>
It uses 

The concept was inspired by the many popular services that use simple words for their branding such as **Discord**, **Twitter**, **Twitch**, etc.

The website takes as input a few words or group of words separated by commas and returns a list of relevant uncommon words. From here it is easy to scroll through the results and analyze each word in order to find a suitable name.

Using actual words from the dictionary not only ensures that the names will be easy to pronounce, but also adds more depth and meaning to the them.

**🌐 Try it out [wordish.styro.dev](https://wordish.styro.dev)**

## Features

## Planned Features
![Website Preview](https://i.imgur.com/HYmGUtg.png)

## How it works
Word searches are made using the [Datamuse API](https://www.datamuse.com/api/), a really powerful word-finding query engine. By combining the keywords in different ways, it is possible to get a large list of relevant words. These are then filtered based on how common they are using data from [Google Books Ngrams](https://books.google.com/ngrams/) (also provided by the API). The final words are sorted based on relevance, length and ease of pronunciation and displayed alongside their definitions, pronunciations and useful tools to check how good of a name it would be.

<p align="center">
  <img src="https://github.com/Styro457/Wordish.Name/assets/69657780/ad97f8e7-9950-4d1b-b9cc-48789da14e52" alt="Words Conection Diagram" />
</p>



----
The sorting algorithm currently uses the following equation to calculate a score for each word:

```js
appearences(A) - 0.2*length(A)
```
In the future this will also include ease of pronunciation and frequency

## License

This project is open source and available under the [GPL-2.0 License](LICENSE).

