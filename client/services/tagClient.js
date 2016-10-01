import handler from './requestHandler';

import {eventSvcUrl} from './../config';

const eventClient = {
    get() {
        return handler.get(`${eventSvcUrl}/tags`);
    }
};

export default eventClient;