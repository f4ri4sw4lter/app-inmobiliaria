import { Test, TestingModule } from '@nestjs/testing';
import { PropiedadService } from './propiedad.service';

describe('PropiedadService', () => {
  let service: PropiedadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropiedadService],
    }).compile();

    service = module.get<PropiedadService>(PropiedadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
