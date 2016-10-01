export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function toggleFilter(filter) {
    return {
        type: TOGGLE_FILTER,
        filter: filter
    }
}
