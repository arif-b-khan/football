import { ResponseTimeInterceptor } from './response-time.interceptor';

describe('ResponseTimeInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseTimeInterceptor()).toBeDefined();
  });
});
