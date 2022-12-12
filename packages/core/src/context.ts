import type { BaseContext } from '@artus/core/pipeline';
import type { ExecutionContainer } from '@artus/core/injection';
import { MinimalInput, MinimalOutput } from './type';

export class MinimalContext<I extends MinimalInput = MinimalInput, O extends MinimalOutput = MinimalOutput> implements BaseContext {
  public input: I;
  public output: O;
  public container: ExecutionContainer;

  public restore() {
    this.input = {} as any;
    this.output = { data: null } as any;
    this.container = null as any;
  }
}
