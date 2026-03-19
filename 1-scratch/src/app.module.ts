import { Module } from '@nestjs/common'
import AppController from './app.controller'

// A wrapper for a list of controllers (classes)
@Module({ controllers: [AppController] })
export default class AppModule {}
