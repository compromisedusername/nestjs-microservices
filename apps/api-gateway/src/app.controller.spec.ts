import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';

describe('AppController', () => {
  let appController: ProxyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [ProxyController],
    }).compile();

    appController = app.get<ProxyController>(ProxyController);
  });

});
