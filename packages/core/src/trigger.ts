import { ArtusInjectEnum, ExecutionContainer, Inject, Injectable, ScopeEnum, TriggerType } from "@artus/core";
import { Middleware, Pipeline } from "@artus/core/pipeline";
import { MinimalApplication } from "./application";
import { MinimalContext } from "./context";
import { ParameterDecorator } from "./enum";
import { MinimalInput, MinimalOutput } from "./type";

@Injectable({ scope: ScopeEnum.SINGLETON })
export default class MinimalTrigger implements TriggerType {
  @Inject(ArtusInjectEnum.Application)
  public app: MinimalApplication;

  protected readonly pipeline: Pipeline;

  constructor() {
    this.pipeline = new Pipeline();
  }

  public use(m: Middleware) {
    this.pipeline.use(m);
  }

  public initContext(input: MinimalInput, output: MinimalOutput) {
    const context = new MinimalContext<MinimalInput, MinimalOutput>();

    context.input = input;
    context.output = output;
    context.container = new ExecutionContainer(context, this.app.container);
    context.container.set({ type: ExecutionContainer, value: context.container });
    context.container.set({ id: ParameterDecorator.REQUEST, value: context.input.request });
    context.container.set({ id: ParameterDecorator.RESPONSE, value: context.input.response });
    context.container.set({ id: ParameterDecorator.HEADER, value: context.input.request.header });
    context.container.set({ id: ParameterDecorator.BODY, value: context.input.request.body });

    return context;
  }

  public async startPipeline(context: MinimalContext) {
    try {
      await this.pipeline.run(context);
    } catch (err) {
      throw err;
    }
  }
}
