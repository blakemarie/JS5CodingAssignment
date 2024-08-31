//Character class represents each character in a show
class Character {
    constructor(name, age) {
        this.name = name; // refers to name of character
        this.age = age; // refers to age of character
    }
// method used to describe the character
    describe() {
        return `${this.name} is ${this.age} years old.`; // returns a string describing the character
    }
}

//this class represents the TV show, can also have characters within each show

class Show {
    constructor(name) {
        this.name = name; // name of the show
        this.characters = []; // array to store characters from a show
    }

    // Method to ass a character to the show
    addCharacter(character) {
        // make sure passed argument is an option
        if (character instanceof Character) {
            this.characters.push(character);
        } else {
            throw new Error('You can only add an instance of Character. Argument is not a Character.');
        }
    }

    describe() {
        return `${this.name} has ${this.characters.length} characters.`;
    }
}

class Menu {
    constructor() {
        this.shows = [];
        this.selectedShow = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        //creates a loop until the user chooses to exit

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createShow();
                    break;
                case '2':
                    this.viewShow();
                    break;
                case '3':
                    this.deleteShow();
                    break;
                case '4':
                    this.displayShows();
                    break;
                default:
                    selection = 0; // exits if the selection isn't an option listed above
            }
            selection = this.showMainMenuOptions(); // redisplays the menu
        }
        alert('Goodbye!');
    }

    //methods to prompt user input

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New Show
            2) View Show
            3) Delete Show
            4) Display All Shows
        `);
    }

    showShowMenuOptions(showInfo) {
        return prompt(`
            0) Back
            1) Create Character
            2) Delete Character

            -------------------
            ${showInfo}
        `);
    }
//method to display all shows currently in the array
    displayShows() {
        let showString = '';
        for (let i = 0; i < this.shows.length; i++) {
            showString += i + ') ' + this.shows[i].name + '\n';
        }
        alert(showString);
    }

    createShow() {
        let name = prompt('Enter name for new show');
        this.shows.push(new Show(name));
    }


    viewShow() {
        let index = prompt('Enter the index of the show you wish to view:');
        index = parseInt(index);
        if (index > -1 && index < this.shows.length) {
            this.selectedShow = this.shows[index];
            let description = 'Show Name: ' + this.selectedShow.name + '\n';

            // loop through the characters and adds thems to the decription
            for (let i = 0; i < this.selectedShow.characters.length; i++) {
                description += i + ') ' + this.selectedShow.characters[i].name + ' - ' + this.selectedShow.characters[i].age + '\n';
            }

            let selection = this.showShowMenuOptions(description); //gives optons for what to do with characters within a specific show
            switch (selection) {
                case '1':
                    this.createCharacter();
                    break;
                case '2':
                    this.deleteCharacter();
                    break;
            }
        }
    }

    createCharacter() {
        let name = prompt('Enter name for new character:');
        let age = prompt('Enter age for new character:');
        this.selectedShow.addCharacter(new Character(name, age));
    }

    deleteCharacter() {
        let index = prompt('Enter the index of the character you wish to delete:');
        index = parseInt(index);
        if (index > -1 && index < this.selectedShow.characters.length) {
            this.selectedShow.characters.splice(index, 1); //removes the character from the array
        }
    }

    deleteShow() {
        let index = prompt('Enter the index of the show you wish to delete:');
        index = parseInt(index);
        if (index > -1 && index < this.shows.length) {
            this.shows.splice(index, 1); //reomves the show from the array
        }
    }
}

//runs the code

let menu = new Menu();
menu.start();
