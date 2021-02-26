let petsSlider = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload = () => {console.log(request.response)};
fetch('./pets.json').then(res => res.json()).then(list => {
    petsSlider = list;

  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
      const newPets = petsSlider;

      for (let j = petsSlider.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createPets(fullPetsList);

  for (let i = 0; i < (fullPetsList.length / 6); i++) {
    const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      stepList.forEach((item, ind) => {
        if ( item.name === stepList[j].name && (ind !== j) ) {
          document.querySelector(".main_pets_wrap_slider").children[(i * 6) + j].style.border = '5px solid red';
        }
      })
    }
  }
  
})
// request.onload = () => {
//   pets = JSON.parse(request.response);

// }

const createPets = (petsList) => {
  const elem = document.querySelector('.main_pets_wrap_slider');
  elem.innerHTML += createElements(petsList);
  createPopup() 
}

createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<div class="pet_card">
    <div class="pet_card_img">
        <img src="${ petsList[i].img }">
    </div>
    <h5>${ petsList[i].name }</h5>
    <button class="pet_card_btn">Learn more</button>
</div>`;
  }
  return str;
}


request.send();

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

const checkItemsPerPage = () => {
  if(document.querySelector('body').offsetWidth > 1279) {
    let petsSliderLength = 15;
    let currentPage = 0;
    document.querySelector('.arrow_left').addEventListener('click', (e) => {
      if(currentPage - 1 === -1) {
          currentPage = petsSliderLength -1
      } else {
          currentPage--;
      }
      document.querySelector('.main_pets_wrap_slider').style.right = `calc(1080px + ${1080 * currentPage}px)`;
  });
  
  document.querySelector('.arrow_right').addEventListener('click', (e) => {
      if(currentPage + 1 === petsSliderLength) {
          currentPage = 0;
      } else {
          currentPage++;
      } 
      document.querySelector('.main_pets_wrap_slider').style.right = `calc(1080px + ${1080 * currentPage}px)`;
  });
  }
  if (document.querySelector('body').offsetWidth > 767 && document.querySelector('body').offsetWidth < 1280) {
    let currentPage = 0;
    let petsSliderLength = 23;
    document.querySelector('.arrow_left').addEventListener('click', (e) => {
        if(currentPage - 1 === -1) {
            currentPage = petsSliderLength -1
        } else {
            currentPage--;
        }
        document.querySelector('.main_pets_wrap_slider').style.right = `calc(620px + ${620 * currentPage}px)`;
    });
    
    document.querySelector('.arrow_right').addEventListener('click', (e) => {
        if(currentPage + 1 === petsSliderLength) {
            currentPage = 0;
        } else {
            currentPage++;
        } 
        document.querySelector('.main_pets_wrap_slider').style.right = `calc(620px + ${620 * currentPage}px)`;
    });
  }
  if (document.querySelector('body').offsetWidth < 768) {
    let currentPage = 0;
    let petsSliderLength = 47;
    document.querySelector('.arrow_left').addEventListener('click', (e) => {
        if(currentPage - 1 === -1) {
            currentPage = petsSliderLength -1
        } else {
            currentPage--;
        }
        document.querySelector('.main_pets_wrap_slider').style.right = `calc(270px + ${270 * currentPage}px)`;
    });
    
    document.querySelector('.arrow_right').addEventListener('click', (e) => {
        if(currentPage + 1 === petsSliderLength) {
            currentPage = 0;
        } else {
            currentPage++;
        } 
        document.querySelector('.main_pets_wrap_slider').style.right = `calc(270px + ${270 * currentPage}px)`;
    });
  }
}
checkItemsPerPage()

function createPopup() {
  const pets = [
    {
      "name": "Jennifer",
      "img": "../../assets/images/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/images/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/images/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/images/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/images/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/images/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/images/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];
  [...document.querySelectorAll('.pet_card')].forEach(card => card.addEventListener('click', function(event) {
    console.log(event.target)
    let pet = findSelectedPet(event.currentTarget);
    document.querySelector('.modal').innerHTML = petTemplate(pet);
}));
function findSelectedPet(card) {
    let name = card.querySelector('h5').innerText;
    console.log(name)
    return pets.find(pet => pet.name == name);
  }

function list(list) {
    return list.map(item => item).join(', ') 
}
  
function petTemplate(pet) {
    return `
        <div class="modal_wrap">
            <div class="modal_img">
                <img src="${pet.img}">
            </div>
            <div class="modal_content">
                <h3>${pet.name}</h3>
                <h4>${pet.type} - ${pet.breed}</h4>
                <h5>${pet.description}</h5>
                <ul class="modal_content_list">
                    <li><span>Age:&nbsp;</span> ${pet.age}</li>
                    <li><span>Inoculations:&nbsp;</span> ${list(pet.inoculations)}</li>
                    <li><span>Diseases:&nbsp;</span> ${list(pet.diseases)}</li>
                    <li><span>Parasites:&nbsp;</span> ${list(pet.parasites)}</li>
                </ul>
            </div>
        </div>
    `;
};
const open = document.querySelectorAll('.pet_card');
const modal = document.getElementById('modal');
const currentModal = document.querySelector('.modal_wrap');

open.forEach(card => card.addEventListener('click', function() {
    modal.classList.add('show-modal');
    document.body.classList.add('noscroll');
}));

document.getElementById('close').addEventListener('click', function(e) {
    console.log(e.target)
    modal.classList.remove('show-modal');
    document.body.classList.remove('noscroll');
});

window.addEventListener('click', (e) => {
  console.log(e.target)
    if(e.target === modal) {
      modal.classList.remove('show-modal');
      document.body.classList.remove('noscroll');
    }
    return false
});
}
