const imagePaths = ['images/01.webp' , 'images/02.webp', 'images/03.webp', 'images/04.webp', 'images/05.webp'];
const primaryImageContainer = document.getElementById('changing-image') , thumbnailContainers = document.getElementsByClassName('thumbnail');

// Insert images in the page
for (let i = 0 ; i < imagePaths.length ; i++) {
    const imageContainers = [primaryImageContainer , thumbnailContainers[i]];

    for (let j = 0 ; j < 2 ; j++) {
        const image = document.createElement('img');
        image.src = imagePaths[i];
        imageContainers[j].append(image);
        
        // Add active class to the first images of the page
        i === 0 ? j === 0 ? image.classList.add("active") : imageContainers[j].classList.add("active") : null;
    }
}

const primaryImages = document.querySelectorAll('#changing-image > img');

// Function to check images with active class, remove the class and set as active the one behind or after
function activeTheAdjacent(largeImages , smallImageContainers , isOrderFromFirstToLast = true) {
    for(let i = 0 , found = false ; !found ; i++) {
        if(largeImages[i].className.includes('active')) {
            found = true;
            
            largeImages[i].classList.remove('active');
            smallImageContainers[i].classList.remove('active');
            
            let index;

            if (isOrderFromFirstToLast) {
                index = i + 1 < largeImages.length ? i + 1 : 0;
            } else {
                index = i - 1 >= 0 ? i - 1 : largeImages.length - 1;
            }
            
            largeImages[index].classList.add('active');
            smallImageContainers[index].classList.add('active');
        }
    }
}


const btns = document.getElementsByTagName('button');

// Calling the function on click on arrow, for previous arrow passing false as argument to revert the logic of the function and obtaining the previous item instead of the next one
btns[0].addEventListener('click' , function () {
    activeTheAdjacent(primaryImages , thumbnailContainers , false);
});
btns[1].addEventListener('click' , function () {
    activeTheAdjacent(primaryImages , thumbnailContainers);
});