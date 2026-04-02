import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

/**
 * The idea for this course is to work with a database through an ORM (Object-Relational Mapping) library.
 * So, the first step is to install 3 libraries related to the ORM side:
 *  - typeorm: the main ORM library
 *  - sqlite3: the database driver for SQLite (we will use SQLite as our database)
 *  - @nestjs/typeorm: the NestJS integration for TypeORM
 * After the instalation, we include the TypeOrm integration as an import in the AppModule
 * (which will propagate its config through the entire app hierarchy)
 *
 * The injection needs a configuration object to explain what type of database we are going to use, where it is located
 * and if it should automatically synchronize the database schema with our entities (synchronize: true).
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
      dropSchema: process.env.NODE_ENV === 'test',
      // A last step to use entites and repositories for this comibination is to
      // include the used entities (on the whole app) in the array for the typeorm configuration
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
