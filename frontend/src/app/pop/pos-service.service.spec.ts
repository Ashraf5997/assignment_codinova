import { TestBed } from '@angular/core/testing';

import { POSSERVICEService } from './pos-service.service';

describe('POSSERVICEService', () => {
  let service: POSSERVICEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POSSERVICEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
