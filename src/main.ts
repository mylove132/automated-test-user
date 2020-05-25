import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientOptions, Transport, GrpcOptions} from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'automated-test-user', // ['hero', 'hero2']
      protoPath: join(__dirname, './protobufs/automated-test-user.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
    },
  };

async function bootstrap() {

    const app = await NestFactory.createMicroservice(AppModule.forRoot({ i18n: 'zh-CN' }), {
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0' + ':50051',
            package: 'nt_module_user',
            protoPath: join(__dirname, 'protobufs/nt-module-user.proto'),
            loader: {
                arrays: true
            }
        }
    });


    await app.listenAsync();
}
bootstrap();
