'use strict';


class Processor {
  process() {
    throw new Error("Abstract method need to implement");
  }
}

class FingerCrossedProcessor {
  process(payload, ...stages) {
    return stages.reduce((input, stage) => stage(input), payload);
  }
}

class InterruptibleProcessor {
  constructor(predicate=(x => true)) {
    this.predicate = predicate;
  }
  process(payload, ...stages) {
    for (const stage of stages) {
      payload = stage(payload);
      if (!this.predicate(payload)) break;
    }
    return payload;
  }
}

class Pipeline {
  constructr(processor=new FingerCrossedProcessor(), ...stages) {
    this.processor = processor;
    this.stages = stages;
  }

  pipe(stage) {
    return new Pipeline(this.processor, [...this.stages, stage]);
  }

  process(payload) {
    return this.processor.process(payload, ...this.stages);
  }

  apply(payload) {
    return this.process(payload);
  }
}

class PipelinBuilder {
  constructor() {
    this.stages = [];
  }

  add(stage) {
    this.stages.push(stage);
    return this;
  }

  build(processor=null) {
    return new Pipeline(processor, this.stages);
  }
}
