import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [ ProxyController],
  providers: [],
})
export class AppModule {}
