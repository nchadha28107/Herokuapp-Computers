export class CommonFunctions {

    /**
    * Function to get Random integer value
    * @param min Min Value of Random number
    * @param max Max Value of Random number
    */

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}