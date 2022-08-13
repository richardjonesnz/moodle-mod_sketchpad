import Log from 'core/log';
import Selectors from './local/selectors';
let size = 10;
const sizeLabel = document.getElementById('mod_sketchpad_size');

const registerEventListeners = () => {
    document.addEventListener('click', e => {
        // Increase size.
        if (e.target.closest(Selectors.actions.increaseButton)) {
            size += 5;
            Log.info(size);
            sizeLabel.innerText = size;
        }
        // Descrease size.
        if (e.target.closest(Selectors.actions.decreaseButton)) {
            size -= 5;
            Log.info(size);
            sizeLabel.innerText = size;
        }
    });
};

export const init = () => {
    registerEventListeners();
};