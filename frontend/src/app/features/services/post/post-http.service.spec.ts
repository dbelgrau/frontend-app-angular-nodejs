import { TestBed } from '@angular/core/testing';

import { PostHttpService } from './post-http.service';

describe('PostService', () => {
  let service: PostHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
