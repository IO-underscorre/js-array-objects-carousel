const games = [
    {
        image: 'images/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    } , {
        image: 'images/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    } , {
        image: 'images/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    } , {
        image: 'images/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    } , {
        image: 'images/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    } 
];

const primaryImageContainer = document.getElementById('changing-image');
const thumbnailContainers = Array.from(document.getElementsByClassName('thumbnail'));
const btns = document.getElementsByTagName('button');

// Insert images in the page
games.forEach((game , i) => {
    const image = document.createElement('img');
    image.src = game.image;
    image.alt = game.title;

    const titleAndDescription = document.createElement('div');
    titleAndDescription.innerHTML = `<h2>${game.title}</h2><p>${game.text}</p>`;
    titleAndDescription.classList.add('title-and-description');

    primaryImageContainer.append(image);
    primaryImageContainer.append(titleAndDescription);
    thumbnailContainers[i].append(image.cloneNode(true));
});

const primaryImages = Array.from(document.querySelectorAll('#changing-image > img'));
const gameDescriptions = Array.from(document.querySelectorAll('.title-and-description'));

primaryImages[0].classList.add('active');
thumbnailContainers[0].classList.add('active');
gameDescriptions[0].classList.add('active');

// Auto-scroll call
let timer = autoScroll(primaryImages , thumbnailContainers , gameDescriptions);

// Restart auto-scrolling
btns[1].addEventListener('click' , function () {
    clearInterval(timer);
    timer = autoScroll(primaryImages , thumbnailContainers , gameDescriptions);
});

// Stop auto-scrolling
btns[2].addEventListener('click' , function () {
    clearInterval(timer);
});

// Calling the function on click on arrow, for previous arrow passing false as argument to revert the logic of the function and obtaining the previous item instead of the next one
btns[0].addEventListener('click' , function () {
    activeTheAdjacent(primaryImages , thumbnailContainers , gameDescriptions , false);
});
btns[3].addEventListener('click' , function () {
    activeTheAdjacent(primaryImages , thumbnailContainers , gameDescriptions);
});


// Function to check images with active class, remove the class and set as active the one behind or after
function activeTheAdjacent(largeImages , smallImageContainers , gameDescriptionsContainers , isOrderFromFirstToLast = true) {
    let index = largeImages.findIndex(largeImage => (largeImage.className.includes('active')));
    
    largeImages[index].classList.remove('active');
    smallImageContainers[index].classList.remove('active');
    gameDescriptionsContainers[index].classList.remove('active');

    if (isOrderFromFirstToLast) {
        index = index + 1 < largeImages.length ? ++index : 0;
    } else {
        index = index - 1 >= 0 ? --index : largeImages.length - 1;
    }
    
    largeImages[index].classList.add('active');
    smallImageContainers[index].classList.add('active');
    gameDescriptionsContainers[index].classList.add('active');
}

// Auto-scrolling the previews
function autoScroll(primaryImages , thumbnailContainers , gameDescriptions) {
    return setInterval(() => activeTheAdjacent(primaryImages , thumbnailContainers , gameDescriptions) , "3000");
}