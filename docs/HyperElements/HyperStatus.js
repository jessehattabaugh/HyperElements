import { HyperTarget } from './HyperTarget.js';

/**
 * custom element to show status indicators for fetch operations.
 */
export class HyperStatus extends HyperTarget {
	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	/** Toggles slot visibility based on the event type and the id of the fetch operation.
	 * @param {CustomEvent<import('../../../types').FetchDetails>} event - The event triggered on fetch start, success, or error.
	 */
	handleFetchEvent(event) {
		super.handleFetchEvent(event, () => {
			const { id } = event.detail;

			// get the type of event
			const [, , type] = event.type.split('-');
			//console.debug('⌛ HyperStatus handling event', { id, type });

			// hide all status slots
			['loading', 'success', 'error'].forEach((status) => {
				/** @type {HTMLElement | null} */
				const slot = this.querySelector(`[slot="${status}"]`);
				if (slot) {
					slot.style.display = 'none';
					//console.debug('🙈 HyperStatus hid', { id, status });
				}
			});

			// update slots
			/** @type {HTMLElement | null} */
			const slot = this.querySelector(`[slot="${type}"]`);
			if (slot) {
				slot.style.display = 'revert';
				//console.debug('🔊 HyperStatus showed', { id, type });
			} else {
				console.warn('🤷 HyperStatus no slot for type', { id, type });
			}
		});
	}
}
