/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-default-export */
import { json } from 'body-parser';
import { Response } from 'express';

import RequestWithRawBody from './requestWithRawBody.interface';

function rawBodyMiddleware() {
  return json({
    verify: (request: RequestWithRawBody, _response: Response, buffer: Buffer) => {
      if (request.url === '/api/v1/webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
