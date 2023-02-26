import { CreateTaskInput } from './dto/crateTask.input';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task as TaskModel } from './models/task.model';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  //() => 戻り値:graphqlの型の形式, { nullable: 'items' } = 値が無い場合になにを返すか 'items' = 空配列
  // QueryやMutationの戻り値はgraphqlのモデルとなる
  @Query(() => [TaskModel], { nullable: 'items' })
  @UseGuards(JwtAuthGuard)
  async getTask(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Task[]> {
    return await this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}
