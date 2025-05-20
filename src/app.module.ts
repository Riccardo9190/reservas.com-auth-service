import { Module } from '@nestjs/common';
import { AuthModule } from './nest-modules/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
