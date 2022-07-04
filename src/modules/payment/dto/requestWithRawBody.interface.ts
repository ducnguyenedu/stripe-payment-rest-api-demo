/* eslint-disable linebreak-style */
/* eslint-disable import/no-default-export */
import { Request } from 'express';

interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

export default RequestWithRawBody;
