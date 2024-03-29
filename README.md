[![GitHub contributors](https://img.shields.io/github/contributors/Yinonss/AU-Observatory.svg)](https://github.com/Yinonss/AU-Observatory/graphs/contributors)


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a>
    <img src="https://user-images.githubusercontent.com/57867811/130361311-a8e8b83e-55b6-4941-bb6b-aee100b08ddf.png" alt="Logo" width="140" height="140">
  </a>

  <h1 align="center">Ariel University Observatory </h1>

  <p align="center">
     Astronomer Web Planner
    <br />
    <a href="https://github.com/Yinonss/AU-Observatory"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Utilzed">Utilzed</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

In this project we developed a web planner for astronomical research for the new observatory facility in Ariel University.

### What is a planner?
Planner is an interface which allows the researcher to create and edit an astronomical studies. The astronomer
can specify the target, the research date and determine the imaging sessions.
The planner then transform the astronomer request into a set of instruction that the robotic observatory will be
able to perform. But not all requests are legal. When set an illogical request or chose two setting that conflicting
with each other - the planner won't except the plan.

### Motivation
The researchers from the Astrophysics department in our university are using observatory control system which called
ACP. This program has a local desktop planner with old and complicated design . 

### Goal
Our mission was to create an accessible web interface which will be much more intuitive, comely and comfortable
in order to provide a great user experince. This planner will produce an ACP script file which operate the facility.

## Utilized

* [WebStorm](https://www.jetbrains.com/webstorm/)
* [MongoDB](https://www.mongodb.com)
* [Node.js](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [SIMBAD](http://simbad.u-strasbg.fr/simbad/)
* [ACP](http://acp.dc3.com/index2.html)


<!-- GETTING STARTED -->
## Getting Started

Here is how you can start runing the application:
### Installation

1. Download and install ACP from [here](http://acp.dc3.com/index2.html).
2. Clone the repo
   ```sh
   git clone https://github.com/Yinonss/AU-Observatory.git
   ```
3. Install NPM packages
   ```sh
   npm install
   
### Run

   ```sh
   npm start
   ```   
   
 <!-- USAGE EXAMPLES -->
## Usage

 Enter 'Guide' in the navigation bar to learn more about the application:
 
   ![image](https://user-images.githubusercontent.com/57867811/130967823-3b0045b9-d364-482e-81c3-80b8b7d8fe54.png)

Enter 'Plan list' to look at the current plans in the scheduler and also, you will be able to check the current weather forecast and for the next 4 days:

![image](https://user-images.githubusercontent.com/57867811/130968964-82499ced-dd67-4d50-9942-4be9e31a8650.png)

Enter 'New plan' to create a new plan by adding the plan details.

![image](https://user-images.githubusercontent.com/57867811/130969128-96fb4697-08a1-4787-9ac6-078d301f5a87.png)

   
<!-- CONTACT -->
## Contact

   
 ![GitHub Contributors Image](https://contrib.rocks/image?repo=Yinonss/AU-Observatory)

