<div id="top"></div>

# Restaurant Menu Mobile App

<div align="center"> 
  <div align="center">
    <h2>Frontend project</h2>
    <p>Ionic · Angular</p>
  </div>
</div>
</br>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#project-assets">Project assets </a></li>
      </ul>
    </li>
    <li>
     <a href="#structure">Structure</a>
   </li>
     <li><a href="#preview">Preview</a></li>
    <li>
        <a href="#installation-and-setup-instructions">Installation and Setup Instructions</a>
         <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#run-server">Run server</a></li>
        </ul>
    </li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

</br>

## About the project

Frontend asignment project from the Ironhack bootcamp.
The goal is building a website with CRUD operations using the Ionic Framework and Angular.

- <a href="https://trello.com/b/1ch8lhXi/ionic-angular-proyecto-ironhack">Trello</a> : here you can find the link to the trello.
- <a href="https://docs.google.com/presentation/d/1PJTfxC4U6wz26WAE1cwPah96wtoacL5m5oyfGobn0QA/edit?usp=sharing">Presentation</a> : here you can find the link to the presentation.

### Project assets

- <a href="https://www.figma.com/file/u3KtbuAyopb2W4jzRiMEz8/IONIC-PROJECT?t=qrBXWqMIia4zzeDy-0">Figma</a> : here you can find the link to the wireframe ideas to develop the project

<p align="right">(<a href="#top">back to top</a>)

<!-- STRUCTURE -->

## Preview

<img width="1400" alt="Captura de pantalla 2022-12-12 a la(s) 12 52 26" src="
https://user-images.githubusercontent.com/93733677/209319362-db8c27e1-5713-4c4d-8058-a278c7df7cfe.jpg
">

<p align="right">(<a href="#top">back to top</a>)

<!-- STRUCTURE -->

## Structure

<details>

```
├─ app
|  ├─ auth
|  |  ├─ auth-routing.module.ts
|  |  ├─ auth.guard.spe.ts
|  |  ├─ auth.guard.ts
|  |  ├─ auth.module.ts
|  |  ├─ auth.page.html
|  |  ├─ auth.page.scss
|  |  ├─ auth.page.spec.ts
|  |  ├─ auth.page.ts
|  |  ├─ auth.srvice.spec.ts
|  |  ├─ auth.service.ts
|  |  └─ user.model.ts
|  ├─ contact
|  |  ├─ contact-routing.module.ts
|  |  ├─ contact.module.ts
|  |  ├─ contact.page.html
|  |  ├─ contact.page.scss
|  |  ├─ contact.page.spec.ts
|  |  └─ contact.page.ts
|  ├─ home
|  |  ├─ home-routing.module.ts
|  |  ├─ home.module.ts
|  |  ├─ home.page.html
|  |  ├─ home.page.scss
|  |  ├─ home.page.spec.ts
|  |  └─ home.page.ts
|  ├─ products
|  |  ├─ detail-product
|  |  |  ├── detail-product-routing.module.ts
|  |  |  ├── detail-product.module.ts
|  |  |  ├── detail-product.page.html
|  |  |  ├── detail-product.page.scss
|  |  |  ├── detail-product.page.spec.ts
|  |  |  └── detail-product.page.ts
|  |  ├─ edit-product
|  |  |  ├── edit-product-routing.module.ts
|  |  |  ├── edit-product.module.ts
|  |  |  ├── edit-product.page.html
|  |  |  ├── edit-product.page.scss
|  |  |  ├── edit-product.page.spec.ts
|  |  |  └── edit-product.page.ts
|  |  ├─ new-product
|  |  |  ├── new-product-routing.module.ts
|  |  |  ├── new-product.module.ts
|  |  |  ├── new-product.page.html
|  |  |  ├── new-product.page.scss
|  |  |  ├── new-product.page.spec.ts
|  |  |  └── new-product.page.ts
|  |  └─ product-item
|  |     ├── product-item.components.html
|  |     ├── product-item.components.scss
|  |     ├── product-item.components.spec.ts
|  |     └── product-item.components.ts
|  ├─ product.model.ts
|  ├─ product.service.ts
|  ├─ product.module.ts
|  ├─ product-routing.module.ts
|  ├─ product.page.html
|  ├─ product.page.scss
|  ├─ product.page.spec.ts
|  └─ product.page.ts
├── assets
├── environments
├── theme
├── global.scss
├── index.html
├── main.ts
├── polyfills.ts
├── test.ts
└── zone-flags.scss
```

<p align="right">(<a href="#top">back to top</a>)

</details>

<!-- USAGE -->

## Usage

- You can have a basic structure working for a restaurant website

<p align="right">(<a href="#top">back to top</a>)

<!-- INSTALLATION AND SETUP -->

## Installation and Setup Instructions

- Clone the repositoy: `https://github.com/YehosuaEs/resturant-menu-app`
- Creating a fork of this repository.
- download the the repository to your local machine.
  ```
  git clone https://github.com/YehosuaEs/resturant-menu-app
  ```

### Prerequisites

```
npm-install
```

### run server

Open the folder with all the directory an in terminal Run

```
ionic serve
```

and then avigate to your `http://localhost:.../`. The application will automatically reload if you change any of the source files.

<p align="right">(<a href="#top">back to top</a>)

<!-- STACK -->

## Stack

<div>
    <img width="45"  alt="Ionic" src="https://user-images.githubusercontent.com/93733677/209311910-ee8e535b-70e2-4d66-b8d0-dde9c963d502.png">&nbsp; &nbsp;
    <img width="43"  alt="Angular" src="https://material.angular.io/assets/img/homepage/angular-logo.svg">&nbsp; &nbsp;
    <img width="45"  alt="Typescript" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png">&nbsp; &nbsp;
    <img width="43" alt="HTML5" src="https://user-images.githubusercontent.com/93733677/175814924-338e3829-a7d8-4e3b-a9ff-6edf3d293a4f.png">&nbsp; &nbsp;
    <img width="43" alt="CSS3" src="https://user-images.githubusercontent.com/93733677/175814939-9e82779a-c8a2-4fe2-999a-22ff7ffb8282.png">&nbsp; &nbsp;
    <img width="55" alt="CSS3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1200px-Sass_Logo_Color.svg.png">&nbsp; &nbsp;

</div>

<p align="right">(<a href="#top">back to top</a>)

 <!-- CONTRIBUTING -->

## Contributing

Contributions are what make us an amazing community and amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- LICENSE -->

## License

Copyright (c) 2022 Yehosuá Escobedo. Code released under the [MIT]() License.
</br>
See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)
 <!-- CONTACT -->

## Contact

Yehosuá Escobedo [Linkedin](https://www.linkedin.com/in/yehosua-escobedo/)  
Email: yehosuaes@gmail.com
</br>
Project Limk: [https://github.com/YehosuaEs/resturant-menu-app](https://github.com/YehosuaEs/resturant-menu-app)

<p align="right">(<a href="#top">back to top</a>)</p>
