import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerBody } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserService } from 'src/user/user.service';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/user/enums/role.enum';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createCustomerDto: CreateCustomerBody,
  ) {
    const createUserData = { ...createCustomerDto, user: req.user?.id };
    return await this.customerService.create(createUserData);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get('getMyCustomers')
  async getMyCustomers(@Request() req: any) {
    const user = await this.userService.findOne(req.user?.username);
    return await this.customerService.findAllByUserId(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
