/**
 * running tests require at least one passing test
 */
import { factory as healthcheckFactory } from './index';

describe('healthcheck-middleware factory', () => {
  let middleware;

  const res = {
    status(num: number) { return this; },
    send(message: any) { return message; },
  };
  const nxt = () => null;
  const mock = { nxt };

  it('should return a function', () => {
    middleware = healthcheckFactory();
    expect(typeof middleware).toBe('function');
  });

  it('created fn should send response at correct endpoint', () => {
    // mock args
    const req = { url: '/health' };
    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');
    const nextSpy = jest.spyOn(mock, 'nxt');
    
    // create middleware
    middleware = healthcheckFactory();
    
    // run middleware
    middleware(req, res, mock.nxt);
    
    // assert
    expect(statusSpy).toBeCalled();
    expect(sendSpy).toBeCalled();
    expect(nextSpy).not.toBeCalled();

    // reset
    statusSpy.mockRestore();
    sendSpy.mockRestore();
    nextSpy.mockRestore();
  });

  it('created fn should pass onto next at all other endpoints', () => {
    // mock args
    const req = { url: '/asdf' };
    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');
    const nextSpy = jest.spyOn(mock, 'nxt');

    // create middleware
    middleware = healthcheckFactory();
    
    // run middleware
    middleware(req, res, mock.nxt);

    // assert
    expect(nextSpy).toBeCalled();
    expect(statusSpy).not.toBeCalled();
    expect(sendSpy).not.toBeCalled();

    // reset
    statusSpy.mockRestore();
    sendSpy.mockRestore();
    nextSpy.mockRestore();
  });

  it('should accept custom url', () => {
    // mock args
    const url = '/asdf';
    const req = { url };
    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');
    const nextSpy = jest.spyOn(mock, 'nxt');

    // create middleware
    middleware = healthcheckFactory(url);
    
    // run middleware
    middleware(req, res, mock.nxt);

    // assert
    expect(statusSpy).toBeCalled();
    expect(sendSpy).toBeCalled();
    expect(nextSpy).not.toBeCalled();

    // reset
    statusSpy.mockRestore();
    sendSpy.mockRestore();
    nextSpy.mockRestore();
  });

  it('should accept custom message', () => {
    // mock args
    const url = '/asdf';
    const req = { url };
    const sendSpy = jest.spyOn(res, 'send');

    // create middleware
    middleware = healthcheckFactory(url, 'bah');
    
    // run middleware
    middleware(req, res, mock.nxt);

    // assert
    expect(sendSpy).toHaveReturnedWith('bah');

    // reset
    sendSpy.mockRestore();
  });
});
