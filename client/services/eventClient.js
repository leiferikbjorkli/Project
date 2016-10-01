import handler from './requestHandler';

import {eventSvcUrl} from './../config';

const eventClient = {
    get() {
        return handler.get(`${eventSvcUrl}/events/upcoming`);
    },
};

export default eventClient;