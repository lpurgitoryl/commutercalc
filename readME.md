<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lpurgitoryl/commutercalc/">
    <img src="./vanillaPrototype/CC_Logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CommuterCalc</h3>

  <p align="center">
    Current gas prices in my home state are really expensive. I started wondering how much each starbies run is costing me in terms of gas, so I created the "CommuterCalc".
    <br />
    <a href="https://github.com/lpurgitoryl/commutercalc"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://commutercalc.vercel.app/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://commutercalc.vercel.app/)

CommuterCalc came about becuase I wanted to know how much my commute to school cost everyday. It uses [Mapbox's API](https://www.mapbox.com/) for forward geolocating and route maping. I also used the U.S. Department of Energy's [Fuel Economy API](https://www.fueleconomy.gov/feg/ws/) to grab vehicle data points based on user selection.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![React][React.js]][React-url]

[![Mapbox][Mapbox]][Mapbox-url]

[![Vite][Vite]][Vite-url]

[![Vercel][Vercel]][Vercel-url]

![HTML]

![CSS]

[![Prettier][Prettier]][Prettier-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

There are two versions of this project. I started a vanilla HTML/CSS/JavaScript prototype located in the `vanillaPrototype` folder. All you need to do is use your own Mapbox API token. The live version with react is located in `ccReact` folder. The following instructions pertain to the react version.

### Prerequisites

Make sure you have npm installed with
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://www.mapbox.com/](https://www.mapbox.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/lpurgitoryl/commutercalc.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Move into the `ccReact` directory
   ```sh
   cd ccreact
   ```
5. Enter your Mapbox API Token where it is required by searching for the keyword "token"
6. Run development server with Vite
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Nicole Garcia - ngarc084@ucr.edu

Project Link: [https://commutercalc.vercel.app/](https://commutercalc.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Fuel Economy API](https://www.fueleconomy.gov/feg/ws/)
* [Mapbox](https://www.mapbox.com/)
* [AAA](https://gasprices.aaa.com/aaa-gas-cost-calculator/)
* [GasBuddy](https://www.californiagasprices.com/TripCalculator.aspx)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/nicoleb-garcia/
[product-screenshot]: ./vanillaPrototype/CC_screenshot.PNG
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/home
[Prettier]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
[Prettier-url]: https://prettier.io/
[HTML]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Mapbox]: https://img.shields.io/badge/MapBox-4264fb?style=for-the-badge&logo=mapbox&logoColor=white
[Mapbox-url]: https://www.mapbox.com/