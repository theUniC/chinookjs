import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChinookNestjsModule } from './chinook/infrastructure/nestjs/chinook-nestjs-module';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'node:path';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
    }), // The rest of configuration comes from environment variables
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'resources/graphql/schema.gql'),
      sortSchema: true,
    }),
    CqrsModule,
    ChinookNestjsModule,
  ],
})
export class AppModule {}
