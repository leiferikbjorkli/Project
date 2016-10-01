import handler from './requestHandler';

import {employeeSvcUrl} from './../config';

const employeeClient = {
  get() {
    return handler.get(`${employeeSvcUrl}/employees`);
  }
};

export default employeeClient;