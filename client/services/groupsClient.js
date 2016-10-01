import handler from './requestHandler';

import {employeeSvcUrl} from './../config';

const employeeClient = {
    get() {
        return handler.get(`${employeeSvcUrl}/practice-groups`);
    }
};

export default employeeClient;